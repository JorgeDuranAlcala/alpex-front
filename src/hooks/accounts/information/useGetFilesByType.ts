import { useEffect, useState } from 'react'
import informationService from 'src/services/accounts/information.service'

export const useGetDoctosByIdAccountAndIdDocumentType = () => {
  const [doctos, setDoctos] = useState<any[]>()
  const [idAccount, setIdAccount] = useState<number>()
  const [idDocumentType, setIdDocumentType] = useState<number>()

  const getDoctosByIdAccountAndIdDocumentType = async (idAccount: number, idDocumentType: number): Promise<any[]> => {
    try {
      const res = await informationService.getDocumentsByIdAccountAndIdDocumentType(idAccount, idDocumentType)

      setDoctos(res)

      return res
    } catch (error) {
      console.log('[getDoctosByIdAccountAndIdDocumentType] Error', error)

      throw new Error('error')
    }
  }

  useEffect(() => {
    if (idAccount && idDocumentType) {
      getDoctosByIdAccountAndIdDocumentType(idAccount, idDocumentType)
        .then(doctos => {
          setDoctos(doctos)
        })
        .catch(error => {
          throw error
        })
    }
  }, [idAccount, idDocumentType])

  return {
    getDoctosByIdAccountAndIdDocumentType,
    setIdAccount,
    setIdDocumentType,
    doctos
  }
}
