import { MoveFile, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useMoveFile = () => {
  const [moveFile, setMoveFile] = useState<responseFolder>()
  const [moveToFolder, setmoveToFolder] = useState<MoveFile | null>()
  const [successMoveFile, setSuccessMoveFile] = useState<boolean>(false)

  useEffect(() => {
    if (!moveToFolder) return
    DocumentsServices.moveFile(moveToFolder)
      .then(file => {
        setMoveFile(file)
        setSuccessMoveFile(true)
      })
      .catch(error => {
        throw error
        setSuccessMoveFile(false)
      })
  }, [moveToFolder])

  return {
    moveFile,
    setmoveToFolder,
    successMoveFile,
    setSuccessMoveFile
  }
}
