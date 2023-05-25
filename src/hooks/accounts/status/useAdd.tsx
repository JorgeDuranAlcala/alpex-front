import { useLocalStorage } from '@/hooks/useLocalStorage'
import { UpdateStatusArrayDto } from '@/services/accounts/dtos/account.dto'
import AccountService from 'src/services/accounts/account.service'

export const useUpdateAccountsStatus = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const updateAccountsStatus = async (data: UpdateStatusArrayDto) => {
    const security = await AccountService.updateAccountsStatus(data, jwtToken)

    return security
  }

  return {
    updateAccountsStatus
  }
}
