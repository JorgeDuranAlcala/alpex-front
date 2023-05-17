import { useLocalStorage } from '@/hooks/useLocalStorage'
import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useAddInformation = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const addInformation = async (riskActivity: Omit<InformationDto, 'id' | 'idAccount'>) => {
    try {
      const information = await informationService.addInformation(riskActivity, jwtToken)

      return information
    } catch (error) {
      throw error
    }
  }

  return {
    addInformation
  }
}
