import { useEffect, useState } from 'react'
import { InstallmentDto } from 'src/services/accounts/dtos/installments.dto'
import InstallmentsService from 'src/services/accounts/installments.service'

export const useFindInstallmentsByIdAccount = async (idAccount: number) => {
  const [installments, setInstallments] = useState<InstallmentDto[]>([])

  useEffect(() => {
    InstallmentsService.getByAllIdAccount(idAccount)
      .then(installments => {
        setInstallments(installments)
      })
      .catch(error => {
        throw error
      })
  }, [idAccount])

  return {
    installments
  }
}
