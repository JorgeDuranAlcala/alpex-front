import { UploadFile, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useUploadFile = () => {
  const [uploadFile, setUploadFile] = useState<responseFolder>()
  const [upload, setUpload] = useState<UploadFile | null>()

  useEffect(() => {
    if (!upload) return
    DocumentsServices.uploadFile(upload)
      .then(response => {
        setUploadFile(response)
      })
      .catch(error => {
        throw error
      })
  }, [upload])

  return {
    uploadFile,
    setUpload
  }
}
