import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useUpdateInstallments = () => {
  const updateInstallments = async (data: InstallmentDto[]) => {
    const installments = await InstallmentsService.update(data)

    return installments
  }

  return {
    updateInstallments
  }
}
