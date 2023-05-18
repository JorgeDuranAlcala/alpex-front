import { useEffect, useState } from 'react'
import CedantContactService from 'src/services/catalogs/cedant-contact.service'
import { CedantContactDto } from 'src/services/catalogs/dtos/cedant-contact.dto'

const useGetAllByIdCedant = () => {
  const [contacts, setContacts] = useState<CedantContactDto[]>([])
  const [idCedant, setIdCedant] = useState<number>()
  const findByIdCedant = async (idCedant: number) => {
    const contacts = await CedantContactService.findByIdCedant(idCedant)
    setContacts(contacts)
  }
  useEffect(() => {
    idCedant && findByIdCedant(idCedant)
  }, [idCedant])

  return {
    contacts,
    setIdCedant,
    findByIdCedant
  }
}

export default useGetAllByIdCedant
