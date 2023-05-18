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
