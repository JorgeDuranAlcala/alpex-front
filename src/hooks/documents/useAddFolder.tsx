import { CreateFolder, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useAddFolder = () => {
  // const [error, setError] = useState<IError>()

  // const [user, setUser] = useState<IResponse>()
  const [folders, setFolders] = useState<responseFolder>()
  const [successAddFolder, setSuccessAddFolder] = useState<boolean>(false)

  const createFolder = async (folder: CreateFolder) => {
    // console.log('CreateFolder', folder?.accountId)
    // console.log('🚀 ~ file: addFolder.tsx:14 ~ createFolder ~ dctoUser:', folder)
    const data = await DocumentsServices.createFolder(folder)
    console.log(data)
    setFolders(data)
    setSuccessAddFolder(true)
  }

  return {
    folders,
    createFolder,
    successAddFolder,
    setSuccessAddFolder
  }
}
