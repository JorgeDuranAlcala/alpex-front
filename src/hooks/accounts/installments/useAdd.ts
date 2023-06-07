import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useAddInstallments = () => {
  const addInstallments = async (data: InstallmentDto[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tempData = data.map(({ id, ...rest }) => rest)
    const installments = await InstallmentsService.addInstallments(tempData)

    return installments
  }

  return {
    addInstallments
  }
}
