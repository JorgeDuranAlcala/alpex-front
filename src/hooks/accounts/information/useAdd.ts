import { AccountProps } from '@/services/accounts/dtos/account.dto'
import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useAddInformation = () => {
  const addInformation = async (
    data: Omit<InformationDto, 'id' | 'idAccount'>
  ): Promise<{
    account: AccountProps
    information: InformationDto
  }> => {
    try {
      const informationTem = { ...data }
      informationTem.idCedantContact = informationTem.idCedantContact === 0 ? null : informationTem.idCedantContact
      informationTem.idBrokerContact = informationTem.idBrokerContact === 0 ? null : informationTem.idBrokerContact
      informationTem.idTypeOfLimit = informationTem.idTypeOfLimit === 0 ? null : informationTem.idTypeOfLimit

      const information = await informationService.addInformation(informationTem)

      return information
    } catch (error) {
      console.log('[addInformation] Error', error)

      throw new Error('error')
    }
  }

  return {
    addInformation
  }
}
