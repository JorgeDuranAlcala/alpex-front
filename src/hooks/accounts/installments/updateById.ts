import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useUpdateInstallments = () => {
  const addInstallments = async (data: InstallmentDto[]) => {
    const installments = await InstallmentsService.update(data)

    return installments
  }

  return {
    addInstallments
  }
}
