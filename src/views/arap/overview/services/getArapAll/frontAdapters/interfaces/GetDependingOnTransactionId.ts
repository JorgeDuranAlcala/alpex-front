import { GetArapAllResponseDto } from '../../getArapAllResponse.dto'

export interface GetDependingOnTransactionId {
  transactionId: string
  result: GetArapAllResponseDto['results'][0]
}
