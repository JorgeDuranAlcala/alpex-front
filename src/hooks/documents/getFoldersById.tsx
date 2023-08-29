import { responseFoldersByAccount } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useGetFolders = () => {
  const [foldersAccount, setfoldersAccount] = useState<responseFoldersByAccount[]>([])
  const [idUser, setIdUser] = useState<null | number>(null)
  const findById = async (idUser: number) => {
    await DocumentsServices.getDocumentsById(idUser).then(setfoldersAccount)
  }
  useEffect(() => {
    idUser && findById(idUser)
  }, [idUser])

  return {
    foldersAccount,
    setIdUser,
    findById
  }
}
export default useGetFolders
