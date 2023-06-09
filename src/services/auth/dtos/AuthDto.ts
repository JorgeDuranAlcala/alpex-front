export interface AuthDto {
  email: string
  password: string
}

export interface RefreshJWTResult {
  success?: boolean
  message?: string
  token?: string
  userData?: object
}
