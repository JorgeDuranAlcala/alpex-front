import { GetFolders, responseFoldersByAccount } from '@/services/documents/dtos/documents.dto'
import { useEffect, useState } from 'react'
import DocumentsServices from 'src/services/documents/documents.service'

export const useGetFolders = () => {
  const [foldersAccount, setfoldersAccount] = useState<responseFoldersByAccount[]>([])
  const [inputGetFolder, setInputGetFolder] = useState<GetFolders>()
  const findById = async (input: GetFolders) => {
    await DocumentsServices.getDocumentsById(input.section, input.id).then(setfoldersAccount)
  }
  useEffect(() => {
    inputGetFolder && findById(inputGetFolder)
  }, [inputGetFolder])

  return {
    foldersAccount,
    setInputGetFolder,
    findById
  }
}
export default useGetFolders
