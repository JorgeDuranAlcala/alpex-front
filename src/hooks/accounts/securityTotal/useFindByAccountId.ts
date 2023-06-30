import { useEffect, useState } from 'react'
import { SecurityTotalDto } from 'src/services/accounts/dtos/securityTotal.dto'
import SecurityTotalService from 'src/services/accounts/securityTotal.service'

export const useFindSecurityTotalByAccountId = (id: number) => {
  const [securityTotal, setSecurityTotal] = useState<SecurityTotalDto[]>()

  useEffect(() => {
    SecurityTotalService.getByIdAccount(id)
      .then(securityTotal => {
        setSecurityTotal(securityTotal)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [id])

  return {
    securityTotal
  }
}
