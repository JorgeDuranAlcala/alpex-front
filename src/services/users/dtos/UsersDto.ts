export interface UsersGetDto {
  id: number
  page?: number
  take?: number
  name?: string
  role?: string
  company?: string
  statusCode?: number
}

export interface UserResponse {
  name?: string
  areaCode?: string
  phone?: string
  surname?: string
  email?: string
  roles: Roles[]
  idCompany?: number
  username?: string
  id?: number
  status: boolean
  isDeleted: boolean
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
