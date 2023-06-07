import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const AppInterceptors = {
  req: (config: AxiosRequestConfig) => {
    const jwt = localStorage.getItem('accessToken')

    if (jwt) config.headers = { ...config.headers, Authorization: `Bearer ${jwt}` }

    return config
  },
  reqErr: (err: AxiosError) => {
    return Promise.reject(err)
  },
  res: (res: AxiosResponse) => {
    return res
  },
  resErr: (err: AxiosError) => {
    if (err.response?.status === 401) {
      console.log('Response error: ', err)
    }

    return Promise.reject(err)
  }
}
