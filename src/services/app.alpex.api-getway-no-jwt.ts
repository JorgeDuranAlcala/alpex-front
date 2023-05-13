import axios from 'axios'

export const AppAlpexApiGateWayNoToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_ALPEX_API_TOKEN
  },
  timeout: 10000
})
