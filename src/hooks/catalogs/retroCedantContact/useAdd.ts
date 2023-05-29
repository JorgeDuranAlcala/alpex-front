import { RetroCedantContactDto } from 'src/services/catalogs/dtos/retroCedantContact.dto'
import RetroCedantContactService from 'src/services/catalogs/retroCedantContact.service'

export const useAddRetroCedantContact = () => {
  const saveRetroCedantContact = async (data: Omit<RetroCedantContactDto, 'id'>) => {
    const contact = await RetroCedantContactService.add(data)

    return contact
  }

  return {
    saveRetroCedantContact
  }
}
