import { MoveFile, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useMoveFile = () => {
  const [moveFile, setMoveFile] = useState<responseFolder>()
  const [moveToFolder, setmoveToFolder] = useState<MoveFile | null>()

  useEffect(() => {
    if (!moveToFolder) return
    DocumentsServices.moveFile(moveToFolder)
      .then(file => {
        setMoveFile(file)
      })
      .catch(error => {
        throw error
      })
  }, [moveToFolder])

  return {
    moveFile,
    setmoveToFolder
  }
}
