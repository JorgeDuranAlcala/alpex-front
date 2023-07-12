export interface AccountProps {
  id: number
  ref: string
  idAccountStatus: number
  idAccountType: number
}

export interface AccountStatus {
  id: number
  status: string
}

export interface UpdateStatusDto {
  idAccount: number
  status: number
}

export interface UpdateStatusArrayDto {
  updateStatus: Partial<UpdateStatusDto>[]
}
