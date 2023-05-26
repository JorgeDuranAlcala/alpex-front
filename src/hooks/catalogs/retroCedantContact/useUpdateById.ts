import { RetroCedantContactDto } from 'src/services/catalogs/dtos/retroCedantContact.dto'
import RetroCedantContactService from 'src/services/catalogs/retroCedantContact.service'

export const useUpdateById = () => {
  const update = async (id: number, retroCedantContact: Omit<RetroCedantContactDto, 'id'>) => {
    const updateRetroCedantContact = await RetroCedantContactService.updateById(id, retroCedantContact)

    return updateRetroCedantContact
  }

  return {
    update
  }
}
