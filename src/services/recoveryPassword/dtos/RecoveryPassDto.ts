export interface RecoveryPassPostDto {
  email: string
}

export interface PasswordPutDto {
  password: string
  passwordConfirm: string
}

export interface IRespondePassword {
  statusCode: number
  message: string
}
