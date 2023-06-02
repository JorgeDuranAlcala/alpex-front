import { useEffect, useState } from 'react'
import informationService from 'src/services/accounts/information.service'

export const useGetInfoDoctosByIdAccount = () => {
  const [doctos, setDoctos] = useState<any[]>()
  const [idAccount, setIdAccount] = useState<number>()

  const getInfoDoctosByIdAccount = async (idAccount: number): Promise<any[]> => {
    try {
      const res = await informationService.getDocumentsByIdAccount(idAccount)

      setDoctos(res)

      return res
    } catch (error) {
      console.log('[getInfoDoctosByIdAccount] Error', error)

      throw new Error('error')
    }
  }

  useEffect(() => {
    if (idAccount) {
      getInfoDoctosByIdAccount(idAccount)
        .then(doctos => {
          setDoctos(doctos)
        })
        .catch(error => {
          throw error
        })
    }
  }, [idAccount])

  return {
    getInfoDoctosByIdAccount,
    setIdAccount,
    doctos
  }
}
