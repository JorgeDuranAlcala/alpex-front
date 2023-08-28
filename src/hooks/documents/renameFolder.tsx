import { RenameFolder, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useRenameFolder = () => {
  const [renameFolder, setRenameFolder] = useState<responseFolder>()
  const [rename, setRename] = useState<RenameFolder | null>()

  useEffect(() => {
    if (!rename) return
    DocumentsServices.renameFolder(rename)
      .then(response => {
        setRenameFolder(response)
      })
      .catch(error => {
        throw error
      })
  }, [rename])

  return {
    renameFolder,
    setRename
  }
}
