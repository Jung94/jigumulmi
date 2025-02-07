import { Axios } from './api.config'

/**
 * @param apiURL
 * @param params
 * @returns
 */

export const getAPI = async ({ url, params }: { url: string, params?: any }) => {
  console.log("\x1B[1m[getAPI] ", { url, params })
  try {
    const response = await Axios.get(url, { params })
    return response
  } catch (error: any) {
    return error.response
  }
}

export const postAPI = async ({ url, body, config }: { url: string, body?: any, config?: any }) => {
  console.log("\x1B[1m[postAPI] ", { url, body, config })
  try {
    const response = await Axios.post(url, body, config)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const putAPI = async ({ url, body, config }: { url: string, body?: any, config?: any }) => {
  console.log("\x1B[1m[putAPI] ", { url, body, config })
  try {
    const response = await Axios.put(url, body, config)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const patchAPI = async (data: any) => {
  console.log("\x1B[1m[patchAPI] ", data)
  try {
    const response = await Axios.patch(data.apiURL, data.body)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const deleteAPI = async ({ apiURL, data }: { apiURL: string; data?: any }) => {
  console.log("\x1B[1m[deleteAPI] ", {apiURL, data})
  try {
    const response = await Axios.delete(apiURL, { data })
    return response
  } catch (error: any) {
    return error.response
  }
}
