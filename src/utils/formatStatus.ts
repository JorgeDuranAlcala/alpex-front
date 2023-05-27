import { EStatus, EStatusString } from '@/views/accounts/Table/Status'

export const formatStatus = (rawStatus: string) => {
  if (rawStatus) {
    switch (rawStatus) {
      case EStatusString.PENDING:
        return EStatus.PENDING

      case EStatusString.NOT_MATERIALIZED:
        return EStatus.NOT_MATERIALIZED

      case EStatusString.NOT_TAKEN_UP:
        return EStatus.NOT_TAKEN_UP

      case EStatusString.DECLINED:
        return EStatus.DECLINED

      case EStatusString.BOUND:
        return EStatus.BOUND

      default:
        return rawStatus
    }
  } else {
    return rawStatus
  }
}

export const formatStatusToNumber = (rawStatus: string) => {
  if (rawStatus) {
    switch (rawStatus) {
      case EStatus.PENDING:
        return 1

      case EStatus.NOT_MATERIALIZED:
        return 3

      case EStatus.NOT_TAKEN_UP:
        return 2

      case EStatus.DECLINED:
        return 4

      case EStatus.BOUND:
        return 5

      default:
        return 0
    }
  } else {
    return 0
  }
}
