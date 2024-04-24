import { Axios } from "./config/api.config"

/**
 * @param apiURL
 * @param params
 * @returns
 */
export const getAPI = async (apiURL: string, params?: any) => {
  console.log("\x1B[1m[getAPI] ", apiURL, params)

  try {
    const response = await Axios.get(apiURL, {params})
    return response
  } catch (error: any) {
    return error.response
  }
}

export const postAPI = async ({ apiURL, body, config }: { apiURL: string, body?: any, config?: any }) => {
  console.log("\x1B[1m[postAPI] ", {apiURL, body, config})
  try {
    const response = await Axios.post(apiURL, body, config)
    return response
  } catch (error: any) {
    return error.response
  }
}
export const putAPI = async (data: any) => {
  console.log("\x1B[1m[putAPI] ", data)
  try {
    const response = await Axios.put(data.apiURL, data.body)
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
