export interface CreateFolder {
  folderName: string
  accountId: number
}

export interface responseFolder {
  success: boolean
  message: string
}

export interface GetByAccount {
  accountId: number
}

export interface responseFoldersByAccount {
  files: responseFile[]
  folderName: string
  folderId: number
  folderPath: string
  content: responseFolders[]
}
export interface responseFolders {
  folderId: number
  folderName: string
  folderPath: string
  files: responseFile[]
}

export interface responseFile {
  fileId: number
  name: string
  filePath: string
}
export interface MoveFile {
  filesId: any
}

export interface responseMoveFile {
  file: any
}

export interface RenameFolder {
  folderId: number
  newFolderName: string
}

export interface DeleteFile {
  fileId: number
}

export interface DeleteFolder {
  folderId: number
}

export interface UploadFile {
  accountId: number
  folderId: number
  documentType: string
  document: string | any
}
