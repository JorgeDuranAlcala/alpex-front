import { useLocalStorage } from '@/hooks/useLocalStorage'
import { UploadDoctoDto } from 'src/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useUploadInformationDocument = () => {
  const [jwtToken] = useLocalStorage('accessToken', false)

  const uploadInformationDocument = async (uploadDocto: UploadDoctoDto): Promise<object> => {
    try {
      const res = await informationService.uploadDocument(uploadDocto, jwtToken)

      return res
    } catch (error) {
      console.log('[uploadInformationDocument] Error', error)

      throw new Error('error')
    }
  }

  return {
    uploadInformationDocument
  }
}
