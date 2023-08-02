import { useEffect, useState } from 'react'
import { RetroCedantContactDto } from 'src/services/catalogs/dtos/retroCedantContact.dto'
import RetroCendatContactService from 'src/services/catalogs/retroCedantContact.service'

export const useGetAllByIdRetroCedant = () => {
  const [retroCedantContacts, setRetroCedantContacts] = useState<RetroCedantContactDto[]>([])
  const [idRetroCedant, setIdRetroCedant] = useState<null | number>(null)
  const findByIdBroker = (idRetroCedant: number) => {
    RetroCendatContactService.findByIdRetroCedant(idRetroCedant).then(setRetroCedantContacts)
  }
  useEffect(() => {
    if (idRetroCedant) {

      findByIdBroker(idRetroCedant)
    } else {
      setRetroCedantContacts([])
    }
  }, [idRetroCedant])

  return {
    retroCedantContacts,
    setIdRetroCedant,
    findByIdBroker
  }
}
