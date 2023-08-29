import { DeleteFolder, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useRemoveFolder = () => {
  const [removeFolder, setRemoveFolder] = useState<responseFolder>()
  const [remove, setRemoveF] = useState<DeleteFolder | null>()
  const [successDeleteFolder, setSuccessDeletefolder] = useState<boolean>(false)

  useEffect(() => {
    if (!remove) return
    DocumentsServices.deleteFolder(remove)
      .then(response => {
        setRemoveFolder(response)
        setSuccessDeletefolder(true)
      })
      .catch(error => {
        throw error
      })
  }, [remove])

  return {
    removeFolder,
    setRemoveF,
    successDeleteFolder,
    setSuccessDeletefolder
  }
}
