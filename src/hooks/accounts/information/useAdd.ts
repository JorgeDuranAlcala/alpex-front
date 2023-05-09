import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useAddInformation = () => {
  const addInformation = async (riskActivity: Omit<InformationDto, 'id' | 'idAccount'>) => {
    try {
      const information = await informationService.addInformation(riskActivity)

      return information
    } catch (error) {
      throw error
    }
  }

  return {
    addInformation
  }
}
