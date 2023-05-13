import { useState } from 'react'
import { SecurityTotalDto } from 'src/services/accounts/dtos/securityTotal.dto'
import SecurityTotalService from 'src/services/accounts/securityTotal.service'

export const useUpdateSecurityTotalById = () => {
  const [securityTotal, setSecurityTotal] = useState<SecurityTotalDto>()

  const updateSecurityTotal = (id: number, securityTotal: Partial<SecurityTotalDto>) => {
    SecurityTotalService.updateById(id, securityTotal)
      .then(securityTotal => {
        setSecurityTotal(securityTotal)
      })
      .catch(error => {
        throw error
      })
  }

  return {
    updateSecurityTotal,
    securityTotal
  }
}
