export interface UsersGetDto {
  id: number
  page?: number
  take?: number
  name?: string
  role?: string
  company?: string
  surname?: string
  secondSurname?: string
}

export interface IResponse {
  statusCode: number
  data: UserResponse[]
  message: string
  error: string
}

export interface UserResponse {
  name?: string
  areaCode?: string
  phone?: string
  surname?: string
  email?: string
  password?: string
  roles: Roles[]
  idCompany?: number
  username?: string
  id?: number
  createdAt?: string
  updatedAt?: string
  status?: boolean
  isDeleted?: boolean
  passwordDesencriptado?: string
}

interface Roles {
  id: number
}

export interface UsersPostDto {
  name: string
  phone: string
  areaCode: string
  surname: string
  email: string
  roles: Roles[]
  idCompany: number
}

export interface UsersPutDto {
  id: number
  name: string
  phone: string
  areaCode: string
  surname: string
  email: string
  roles: Roles[]
  idCompany: number
}

export interface UsersDeleteDto {
  idUsersList: number[] | undefined
}

export interface IError {
  statusCode: number
  message: string
}

export interface ISuccess {
  statusCode?: number
}
