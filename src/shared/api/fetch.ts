import { setCookie } from 'cookies-next'

const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DEV

type FetchOptions = {
  baseURL?: string
  headers?: Record<string, string>
  interceptors?: {
    request?: (url: string, config: RequestInit) => { url: string; config: RequestInit }
    response?: (response: Response) => Response | Promise<Response>
  }
}

class Fetch {
  private baseURL: string
  private headers: Record<string, string>
  private interceptors?: FetchOptions['interceptors']

  constructor({ baseURL = '', headers = {}, interceptors }: FetchOptions = {}) {
    this.baseURL = baseURL
    this.headers = headers
    this.interceptors = interceptors
  }

  private async request(url: string, config: RequestInit = {}) {
    const fullURL = this.baseURL ? `${this.baseURL}${url}` : url
    const headers: HeadersInit = { ...this.headers, ...(config.headers || {}) }

    let intercepted = { url: fullURL, config: { ...config, headers, credentials: 'include' } as RequestInit & { credentials: 'include' } }
    
    if (this.interceptors?.request) {
      const interceptedResult = this.interceptors.request(fullURL, intercepted.config)
      intercepted = {
        url: interceptedResult.url,
        config: {
          ...interceptedResult.config,
          headers: interceptedResult.config.headers || {},
          credentials: 'include'
        } as RequestInit & { credentials: 'include' },
      }
    }

    const response = await fetch(intercepted.url, intercepted.config)

    if (this.interceptors?.response) {
      return this.interceptors.response(response)
    }

    return response
  }

  async get<T = any>({
    endpoint, 
    queryParams,
    config = {}
  }: {
    endpoint: string
    queryParams?: Record<string, string | number | boolean | undefined | null>
    config?: RequestInit
  }): Promise<T> {
    console.log("\x1B[1m[getAPI] ", { endpoint, queryParams })

    const queryString = queryParams
      ? `?${new URLSearchParams(
          Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value)
            }
            return acc
          }, {} as Record<string, string>)
        ).toString()}`
      : ''

    const response = await this.request(`${endpoint}${queryString}`, {
      ...config,
      method: 'GET',
    })
  
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    return response.json()
    // const data = await response.json()

    // return { 
    //   data,
    //   status: response.status, 
    //   statusText: response.statusText,
    // }
  }

  async post<T = any>({
    endpoint,
    body,
    config = {}
  } : {
    endpoint: string
    body?: any
    config?: RequestInit
  }): Promise<{ status: number; data: T | null }> {
    const isFormData = body instanceof FormData

    const response = await this.request(endpoint, {
      ...config,
      method: 'POST',
      headers: isFormData ? config.headers : { 'Content-Type': 'application/json', ...config.headers },
      body: isFormData ? body : JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Error post data: ${response.statusText}`)
    }

    if (response.status === 204) {
      return { status: response.status, data: null }
    }

    let data: T | null = null
    try {
      data = await response.json()
    } catch (error) {
      console.warn("Empty response or non-JSON response:", error)
    }
    return { status: response.status, data }
  }

  async put<T = any>({
    endpoint,
    body,
    config = {}
  }: {
    endpoint: string
    body?: any
    config?: RequestInit
  }): Promise<{ status: number; data: T | null }> {
    const response = await this.request(endpoint, {
      ...config,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Error post data: ${response.statusText}`)
    }

    if (response.status === 204) {
      return { status: response.status, data: null }
    }

    let data: T | null = null
    try {
      data = await response.json()
    } catch (error) {
      console.warn("Empty response or non-JSON response:", error)
    }
    return { status: response.status, data }
  }

  async patch<T = any>(url: string, body?: any, config: RequestInit = {}): Promise<T> {
    const response = await this.request(url, {
      ...config,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(body),
    })
    return response.json()
  }

  async delete<T = any>({
    endpoint,
    body,
    config = {}
  } : {
    endpoint: string
    body?: any
    config?: RequestInit
  }): Promise<{ status: number; data: T | null }> {
    const response = await this.request(endpoint, {
      ...config,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Error delete data: ${response.statusText}`)
    }

    if (response.status === 204) {
      return { status: response.status, data: null }
    }

    let data: T | null = null
    try {
      data = await response.json()
    } catch (error) {
      console.warn("Empty response or non-JSON response:", error)
    }
    return { status: response.status, data }
  }
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const apiClient = new Fetch({
  baseURL,
  interceptors: {
    request: (url, config) => {
      return { url, config }
    },
    response: async (response) => {
      if (!response.ok) {
        const isAdminPage = window.location.pathname.split('/')[1] === 'admin'
        // console.log(response.status)

        if (isAdminPage && (response.status === 401 || response.status === 403)) {
          setCookie("ji-login-prev-path", window.location.pathname)
          alert('로그인이 필요합니다.')
          window.location.href = '/login'
        } else if (response.status === 401) {
          throw new ApiError("Login required", 401)
        } else {
          const errorData = await response.json()
          throw new ApiError(`${response.status} - ${errorData.message || "Unknown error"}`, response.status)
        }
      }
      return response;
    },
  },
})