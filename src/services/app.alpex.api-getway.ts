import { AppInterceptors } from '@/services/interceptors'
import axios from 'axios'

export const AppAlpexApiGateWay = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_ALPEX_API_TOKEN
  },
  timeout: 25000
})

AppAlpexApiGateWay.interceptors.request.use(AppInterceptors.req, AppInterceptors.reqErr)

AppAlpexApiGateWay.interceptors.response.use(AppInterceptors.res, AppInterceptors.resErr)
