export interface CreateFolder {
  folderName: string
  accountId: number
}

export interface GetByAccount {
  accountId: number
}

export interface MoveFile {
  destinationFolderId: number
  fileId: number
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
