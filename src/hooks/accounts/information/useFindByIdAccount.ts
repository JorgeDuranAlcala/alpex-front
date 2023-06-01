import { useEffect, useState } from 'react'
import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import InformationService from 'src/services/accounts/information.service'

export const useFindInformationByIdAccount = () => {
  const [information, setInformation] = useState<InformationDto>()
  const [idAccount, setIdAccount] = useState<number>()

  const getInformaByIdAccount = async (idAccount: number): Promise<InformationDto> => {
    try {
      const information = (await InformationService.getInformaById(idAccount)) as InformationDto

      if (information.effectiveDate && information.expirationDate && information.receptionDate) {
        const effectiveDate = new Date(information.effectiveDate).toLocaleString('en-US', { timeZone: 'UTC' })
        const expirationDate = new Date(information.expirationDate).toLocaleString('en-US', { timeZone: 'UTC' })
        const receptionDate = new Date(information.receptionDate).toLocaleString('en-US', { timeZone: 'UTC' })

        information.effectiveDate = new Date(effectiveDate)
        information.expirationDate = new Date(expirationDate)
        information.receptionDate = new Date(receptionDate)
        if (information.createdAt)
          information.createdAt = new Date(new Date(information.createdAt).toLocaleString('en-US', { timeZone: 'UTC' }))
      }

      setInformation({
        ...information
      })

      return information
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (idAccount) {
      getInformaByIdAccount(idAccount)
        .then(information => {
          setInformation(information)
        })
        .catch(error => {
          throw error
        })
    }
  }, [idAccount])

  return {
    information,
    setIdAccount,
    getInformaByIdAccount
  }
}
