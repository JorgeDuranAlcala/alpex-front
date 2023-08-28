import { DeleteFile, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useRemoveFile = () => {
  const [removeFile, setRemoveFile] = useState<responseFolder>()
  const [remove, setRemove] = useState<DeleteFile | null>()

  useEffect(() => {
    if (!remove) return
    DocumentsServices.deleteFile(remove)
      .then(response => {
        setRemoveFile(response)
      })
      .catch(error => {
        throw error
      })
  }, [remove])

  return {
    removeFile,
    setRemove
  }
}
