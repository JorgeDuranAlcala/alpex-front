import { useLocalStorage } from '@/hooks/useLocalStorage'
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useAddInstallments = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const addInstallments = async (data: Omit<InstallmentDto[], 'id'>) => {
    const installments = await InstallmentsService.addInstallments(data, jwtToken)

    return installments
  }

  return {
    addInstallments
  }
}
