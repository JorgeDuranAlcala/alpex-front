import { RenameFolder, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useRenameFolder = () => {
  const [renameFolder, setRenameFolder] = useState<responseFolder>()
  const [rename, setRename] = useState<RenameFolder | null>()
  const [successRenameFolder, setSuccessRenameFolder] = useState<boolean>(false)

  useEffect(() => {
    if (!rename) return
    DocumentsServices.renameFolder(rename)
      .then(response => {
        setRenameFolder(response)
        setSuccessRenameFolder(true)
      })
      .catch(error => {
        throw error
      })
  }, [rename])

  return {
    renameFolder,
    setRename,
    successRenameFolder,
    setSuccessRenameFolder
  }
}
