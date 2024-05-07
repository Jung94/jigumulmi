import axios from "axios"
import { postAPI } from "@/lib/api"
import { getCookie, setCookie, deleteCookie } from "cookies-next"

export const baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DEV
export const Axios = axios.create({ baseURL, withCredentials: true })

const handleTokens = (accessToken: string | undefined, refreshToken: string | undefined) => {
  if (accessToken && refreshToken) {
    setCookie("_LB_AT", accessToken)
    setCookie("_LB_RT", refreshToken)
  }
}

Axios.interceptors.request.use(
  async (config) => {
    config.headers["ngrok-skip-browser-warning"] = "thankYou"
    // config.withCredentials = true
    // const accessToken = getCookie("_LB_AT")
    // const refreshToken = getCookie("_LB_RT")
    
    // if (accessToken && refreshToken) {
    //   config.headers['access-token'] = `Bearer ${accessToken}`
    //   config.headers['refresh-token'] = `Bearer ${refreshToken}`
    // }
    return config
  },
  async (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  async (response) => {
    // const headers = response.headers
    // handleTokens(headers['access-token'], headers['refresh-token'])
    return response
  },
  async (error) => {
    const res = error.response
    console.log(res)
    if (res.status === 403) {
      console.log('403')
      // await postAPI({apiURL: '/member/logout', body: {}})
      // alert('로그인이 필요합니다.')
    }
    // if (res.status === 401) {
    //   alert(res.data.detail)
    //   deleteCookie("_LB_AT")
    //   deleteCookie("_LB_RT")
    //   deleteCookie("_LB_group")
    //   window.location.href = '/'
    //   return
    // } else if (res.status === 499) {
    //   const resToken = await postAPI({apiURL: '/account/reissued/token', body: {}})
    //   if (resToken.status === 201) {
    //     const headers = resToken.headers
    //     handleTokens(headers['access-token'], headers['refresh-token'])

    //     const originalRequest = error.config;
    //     return Axios(originalRequest)
    //   }
    // } else if (res.status === 422) {
    // }
    return Promise.reject(error)
  }
)
