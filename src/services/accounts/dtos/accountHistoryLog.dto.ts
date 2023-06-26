export interface AccountHistoryLogDto {
  id: number
  effectiveDate: Date
  createdAt: Date
  updatedAt?: Date | null
  accountId: number
  accountStatus: IAccountStatus
}

interface IAccountStatus {
  id: number
  status: string
  createdAt: Date
  updatedAt?: Date | null
}
