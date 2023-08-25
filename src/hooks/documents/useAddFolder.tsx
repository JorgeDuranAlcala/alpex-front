import { CreateFolder, responseFolder } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useAddFolder = () => {
  // const [error, setError] = useState<IError>()

  // const [user, setUser] = useState<IResponse>()
  const [folders, setFolders] = useState<responseFolder>()
  const [dctoUser, setdctoUser] = useState<CreateFolder>()

  const createFolder = async (folder: CreateFolder) => {
    console.log('CreateFolder', folder?.accountId)
    debugger
    console.log('🚀 ~ file: addFolder.tsx:14 ~ createFolder ~ dctoUser:', folder)
    const data = await DocumentsServices.createFolder(folder)
    console.log(data)
    setFolders(data)
  }
  useEffect(() => {
    dctoUser && createFolder(dctoUser)
    console.log('Hook')
  }, [dctoUser])

  // useEffect(() => {
  //   if (!dctoUser) return
  //   DocumentsServices.createFolder(dctoUser)
  //     .then(folder => {
  //       setFolders(folder)
  //     })
  //     .catch(error => {
  //       throw error
  //     })
  // }, [dctoUser])

  return {
    folders,
    setdctoUser
  }
}
