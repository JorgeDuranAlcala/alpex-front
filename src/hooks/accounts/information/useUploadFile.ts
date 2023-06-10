import { UploadDoctoDto } from 'src/services/accounts/dtos/information.dto'
import informationService from 'src/services/accounts/information.service'

export const useUploadInformationDocument = () => {
  const uploadInformationDocument = async (uploadDocto: UploadDoctoDto): Promise<any> => {
    try {
      const res = await informationService.uploadDocument(uploadDocto)

      return res
    } catch (error) {
      console.log('[uploadInformationDocument] Error', error)
    }
  }

  return {
    uploadInformationDocument
  }
}
