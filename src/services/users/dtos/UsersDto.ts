export interface UsersGetDto {
  id: number
  page?: number
  take?: number
  name?: string
  role?: string
  company?: string
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
  idUsersList: number[]
}
