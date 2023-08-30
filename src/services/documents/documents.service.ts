import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { DOCUMENTS_ROUTES } from '@/configs/api'
import {
  CreateFolder,
  DeleteFile,
  DeleteFolder,
  MoveFile,
  RenameFolder,
  UploadFile,
  responseFolder,
  responseFoldersByAccount
} from './dtos/documents.dto'

/**
 *  service responsible of the reports methods
 */
class DocumentsServices {
  async getDocumentsById(accountId: number | undefined): Promise<responseFoldersByAccount[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<responseFoldersByAccount[]>>(
        `${DOCUMENTS_ROUTES.GETBYACCOUNTID}/${accountId}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async createFolder(folder: Partial<CreateFolder>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.CREATEFOLDER}`, {
        ...folder
      })

      return data
    } catch (error) {
      console.log('🚀 ~ file: documents.service.ts:41 ~ DocumentsServices ~ createFolder ~ error:', error)
      const message = String(error)
      throw new Error(message)
    }
  }

  async moveFile(file: Partial<MoveFile>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.MOVEFILE}`, {
        ...file
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async renameFolder(response: Partial<RenameFolder>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.RENAMEFOLDER}`, {
        ...response
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async deleteFile(response: Partial<DeleteFile>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.DELETEFILE}`, {
        ...response
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async deleteFolder(response: Partial<DeleteFolder>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.DELETEFOLDER}`, {
        ...response
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async uploadFile(response: Partial<UploadFile>): Promise<responseFolder> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<responseFolder>>(`${DOCUMENTS_ROUTES.UPLOADFILE}`, {
        ...response
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new DocumentsServices()
