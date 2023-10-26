import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

interface IApi {
  url?: string
  method?: string
  body?: object | null
  headers?: AxiosRequestHeaders | object
  payload?: object | null
}

const POST = 'post'
const GET = 'get'
const PUT = 'put'
const DELETE = 'delete'
const PATCH = 'patch'

export const api = ({ url, method, body, headers }: IApi) => {
  const config: AxiosRequestConfig = {
    url: url,
    method: method,
    data: body,
    headers: headers,
  }

  return axios(config)
}

const apiRequest = async ({ method, url, payload }: IApi) => {
  let body: object | null | undefined = null

  if (method !== GET) {
    body = payload
  }

  // interceptor(isDownload)

  try {
    const response = await api({ url, method, body })

    return response?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error?.data || error?.response?.data
  }
}

// function to execute the http get request
const get = ({ url }: IApi) => apiRequest({ url, method: GET })

// function to execute the http delete request
const deleteRequest = ({ url, payload }: IApi) => apiRequest({ method: DELETE, url, payload })

// function to execute the http post request
const post = ({ url, payload }: IApi) => apiRequest({ method: POST, url, payload })

// function to execute the http put request
const put = ({ url, payload }: IApi) => apiRequest({ method: PUT, url, payload })

// function to execute the http path request
const patch = ({ url, payload }: IApi) => apiRequest({ method: PATCH, url, payload })

export default {
  get,
  deleteRequest,
  post,
  put,
  patch,
}
