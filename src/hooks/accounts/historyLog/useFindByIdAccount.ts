import { AccountHistoryLogDto } from '@/services/accounts/dtos/accountHistoryLog.dto'
import { useEffect, useState } from 'react'
import AccountHistoryLogService from 'src/services/accounts/accountHistoryLog.service'

const useGetAccountHistoryLogByIdAccount = () => {
  const [accountHistoryLog, setAccountHistoryLog] = useState<AccountHistoryLogDto[]>([])
  const [idAccount, setIdAccount] = useState<null | number>(null)

  const findByIdAccount = (idAccount: number) => {
    AccountHistoryLogService.getAllByIdAccount(idAccount).then(setAccountHistoryLog)
  }
  useEffect(() => {
    idAccount && findByIdAccount(idAccount)
  }, [idAccount])

  return {
    accountHistoryLog,
    setIdAccount,
    findByIdAccount
  }
}
export default useGetAccountHistoryLogByIdAccount
