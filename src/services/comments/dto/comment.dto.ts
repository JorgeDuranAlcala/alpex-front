export interface CreateCommentDto {
  readonly idAccount?: number
  readonly idInstallment?: number
  readonly idSecurity?: number
  readonly comment: string
}

export interface ResCommentDto {
  readonly id: number
  readonly comment: string
  readonly hour: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly userId: number
  readonly name: string
  readonly role: string
}
