import axios from 'axios'

let accessToken = ''
if (typeof window !== 'undefined') {
  accessToken = `Bearer ${localStorage.getItem('accessToken')}` || ''
}

export const AppAlpexApiGateWay = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_ALPEX_API_TOKEN,
    Authorization: accessToken
  },
  timeout: 10000

  // TODO revisar funcionamiento
  // withCredentials: true
})
