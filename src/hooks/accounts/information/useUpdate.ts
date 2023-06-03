import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import InformationService from 'src/services/accounts/information.service'

export const useUpdateInformationByIdAccount = () => {
  const updateInformationByIdAccount = async (
    idAccount: number,
    update: Omit<Partial<InformationDto>, 'id' | 'idAccount'>
  ): Promise<InformationDto> => {
    try {
      const informationTem = { ...update }
      informationTem.idCedantContact = informationTem.idCedantContact === 0 ? null : informationTem.idCedantContact
      informationTem.idBrokerContact = informationTem.idBrokerContact === 0 ? null : informationTem.idBrokerContact
      informationTem.idTypeOfLimit = informationTem.idTypeOfLimit === 0 ? null : informationTem.idTypeOfLimit

      const information = await InformationService.updatedInformaById(idAccount, informationTem)

      return information
    } catch (error) {
      throw error
    }
  }

  return {
    updateInformationByIdAccount
  }
}
