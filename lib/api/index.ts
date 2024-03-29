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

export const postAPI = async (data: {apiURL: string; body?: any}) => {
  console.log("\x1B[1m[postAPI] ", data)
  try {
    const response = await Axios.post(data.apiURL, data.body)
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

export const deleteAPI = async (data: any) => {
  console.log("\x1B[1m[deleteAPI] ", data)
  try {
    const response = await Axios.delete(data.apiURL)
    return response
  } catch (error: any) {
    return error.response
  }
}
