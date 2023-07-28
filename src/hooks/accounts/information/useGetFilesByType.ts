import { AccountDocumentFilters, DocumentDto } from '@/services/accounts/dtos/information.dto'
import { useEffect, useState } from 'react'
import informationService from 'src/services/accounts/information.service'

export const useGetDoctosByIdAccountAndIdDocumentType = () => {
  const [doctos, setDoctos] = useState<DocumentDto[]>([])
  const [accountDocumentFilters, setAccountDocumentFilters] = useState<AccountDocumentFilters>()

  const getDoctosByIdAccountAndIdDocumentType = async (
    accountDocumentFilters: AccountDocumentFilters
  ): Promise<DocumentDto[]> => {
    try {
      const res = await informationService.getDocumentsByIdAccountAndIdDocumentType(
        accountDocumentFilters.idAccount,
        accountDocumentFilters.idCDocto
      )

      setDoctos(res)

      return res
    } catch (error) {
      console.log('[getDoctosByIdAccountAndIdDocumentType] Error', error)

      throw new Error('error')
    }
  }

  useEffect(() => {
    if (accountDocumentFilters) {
      getDoctosByIdAccountAndIdDocumentType(accountDocumentFilters)
        .then(doctos => {
          setDoctos(doctos)
        })
        .catch(error => {
          throw error
        })
    }
  }, [accountDocumentFilters])

  return {
    getDoctosByIdAccountAndIdDocumentType,
    setAccountDocumentFilters,
    doctos
  }
}
