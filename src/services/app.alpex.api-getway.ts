import axios from 'axios'

export const AppAlpexApiGateWay = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})
