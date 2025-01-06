import axios from 'axios'
import { setCookie } from 'cookies-next'

export const baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DEV
export const Axios = axios.create({ baseURL, withCredentials: true })

Axios.interceptors.request.use(
  async (config) => {
    config.headers["ngrok-skip-browser-warning"] = "thankYou"
    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const res = error.response
    const isServer = typeof window === 'undefined'
    let isAdminPage
    if (!isServer) window.location.pathname.split('/')[1] === 'admin'

    if (res.status === 403) {
      if (isAdminPage) {
        setCookie("ji-login-prev-path", window.location.pathname)
        alert('로그인이 필요합니다.')
        window.location.href = '/login'
      }
    }
    if (res.status === 401) {
      if (isAdminPage) {
        setCookie("ji-login-prev-path", window.location.pathname)
        alert('로그인이 필요합니다.')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
