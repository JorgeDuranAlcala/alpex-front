import { DeleteDoctoDto } from '@/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useDeleteInformationDocument = () => {
  const deleteInformationDocument = async (deleteDocto: DeleteDoctoDto): Promise<object> => {
    try {
      const res = await informationService.deleteDocument(deleteDocto)

      return res
    } catch (error) {
      console.log('[deleteInformationDocument] Error', error)

      throw new Error('error')
    }
  }

  return {
    deleteInformationDocument
  }
}
