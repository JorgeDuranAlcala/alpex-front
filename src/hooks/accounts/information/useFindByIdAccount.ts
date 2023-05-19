import { useEffect, useState } from 'react'
import { InformationDto } from 'src/services/accounts/dtos/information.dto'
import InformationService from 'src/services/accounts/information.service'

export const useFindInformationByIdAccount = () => {
  const [information, setInformation] = useState<InformationDto>()
  const [idAccount, setIdAccount] = useState<number>()

  const getInformaByIdAccount = async (idAccount: number): Promise<InformationDto> => {
    try {
      const information = (await InformationService.getInformaById(idAccount)) as InformationDto
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
      InformationService.getInformaById(idAccount)
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
