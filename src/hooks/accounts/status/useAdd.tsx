import { UpdateStatusArrayDto } from '@/services/accounts/dtos/account.dto'
import AccountService from 'src/services/accounts/account.service'

export const useUpdateAccountsStatus = () => {
  const updateAccountsStatus = async (data: UpdateStatusArrayDto) => {
    const security = await AccountService.updateAccountsStatus(data)

    return security
  }

  return {
    updateAccountsStatus
  }
}
