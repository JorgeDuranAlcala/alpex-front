import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useDeleteInstallments = () => {
  const deleteInstallments = async (data: InstallmentDto[]) => {
    const installments = await InstallmentsService.delete(data)

    return installments
  }

  return {
    deleteInstallments
  }
}
