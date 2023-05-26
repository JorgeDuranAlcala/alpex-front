import CedantContactService from 'src/services/catalogs/cedant-contact.service'
import { CedantContactDto } from 'src/services/catalogs/dtos/cedant-contact.dto'

export const useUpdateById = () => {
  const update = async (id: number, cedantContact: Omit<CedantContactDto, 'id'>) => {
    const updateCedantContact = await CedantContactService.updateById(id, cedantContact)

    return updateCedantContact
  }

  return {
    update
  }
}
