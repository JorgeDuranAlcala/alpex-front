import { useState } from 'react'
import { SecurityTotalDto } from 'src/services/accounts/dtos/securityTotal.dto'
import SecurityTotalService from 'src/services/accounts/securityTotal.service'

export const useUpdateSecurityTotalById = () => {
  const [securityTotal, setSecurityTotal] = useState<SecurityTotalDto>()

  const updateSecurityTotal = async (id: number, securityTotal: Partial<SecurityTotalDto>) => {
    const response = await SecurityTotalService.updateById(id, securityTotal)
    setSecurityTotal(response)

    return response
  }

  return {
    updateSecurityTotal,
    securityTotal
  }
}
