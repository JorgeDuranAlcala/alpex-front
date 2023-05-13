interface IUserCompany {
  id: number
  name: string
  alias: string
  createdAt: string
  updatedAt: string
  active: boolean
}

interface IRoles {
  id: number
  role: string
  level: string
  description: string
  active: boolean
}

interface IUser {
  id: number
  name: string
  phone: string
  surname: string
  username: string
  secondSurname: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  status: boolean
  idCompany: IUserCompany
  roles: IRoles[]
}

interface IUsersInfo {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

export type IUserFilters = {
  type: string
  value: string
  subtype?: string
  text?: string
  unDeleteable?: boolean
}

export interface IUsersState {
  current: IUser | null
  users: IUser[]
  loading: boolean
  filters: IUserFilters[]
  info: IUsersInfo
  temporalFilters: IUser[]
}
