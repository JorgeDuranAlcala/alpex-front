import axios from 'axios'

export const AppDynamicReApiGateWay = axios.create({
  baseURL: process.env.APP_ALPEX_API_GATEWAY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true
})
