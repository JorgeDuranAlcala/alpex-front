import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

import { ACCOUNT_INFORMATION_ROUTES } from '../../configs/api'

//Dtos
import { IAccount } from 'src/views/accounts/Table'
import { DeleteDoctoDto, InformationDto, UploadDoctoDto } from './dtos/information.dto'

/**
 * clase encargada del apartado de information de un account
 */

class AccountServices {
  async getAccounts() {
    return data
  }

  /**
   * create a new account and your information
   * @param information
   * @returns
   */
  async addInformation(information: Partial<InformationDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(`${ACCOUNT_INFORMATION_ROUTES.ADD}`, {
        ...information
      })

      return data
    } catch (error) {
      const message = String(error)
      console.log(message)
    }
  }

  /**
   * brings the account information using the id account
   * @param idAccount
   * @returns
   */
  async getInformaById(idAccount: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_INFORMATION_ROUTES.GET}/${idAccount}`)

      return data
    } catch (error) {
      const message = String(error)
      console.log(message)
    }
  }

  /**
   * update the account information using the id account
   * @param idAccount
   * @param information
   * @returns
   */

  parsedDate = (date: Date) => new Date(date.toString().replace(/GMT.*$/, 'GMT+0000')).toISOString()
  async updatedInformaById(idAccount: number, information: Partial<InformationDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put(`${ACCOUNT_INFORMATION_ROUTES.UPDATE}/${idAccount}`, {
        ...information,
        receptionDate: this.parsedDate(information.receptionDate || new Date()),
        effectiveDate: this.parsedDate(information.effectiveDate || new Date()),
        expirationDate: this.parsedDate(information.expirationDate || new Date())
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  // ** Doctos
  /**
   * upload a file associated to an account
   * @param uploadDocto: UploadDoctoDto
   * @returns
   */
  async uploadDocument(uploadDocto: UploadDoctoDto) {
    try {
      const { data } = await AppAlpexApiGateWay.post(`${ACCOUNT_INFORMATION_ROUTES.UPLOAD_FILE}`, uploadDocto)

      return data
    } catch (error) {
      const message = String(error)
      console.log(message)
    }
  }

  /**
   * delete a file associated to an account
   * @param deleteDocto: DeleteDoctoDto
   * @returns
   */
  async deleteDocument(deleteDocto: DeleteDoctoDto) {
    try {
      const { data } = await AppAlpexApiGateWay.post(`${ACCOUNT_INFORMATION_ROUTES.DELETE_FILE}`, deleteDocto)

      return data
    } catch (error) {
      const message = String(error)
      console.log(message)
    }
  }

  /**
   * brings all files associated to an idAccount
   * @param idAccount
   * @returns
   */
  async getDocumentsByIdAccount(idAccount: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${ACCOUNT_INFORMATION_ROUTES.GET_FILES}/${idAccount}`)

      return data
    } catch (error) {
      const message = String(error)
      console.log(message)
    }
  }

  /**
   * brings all files associated for a especifico idAccount and idDocumentType
   * @param idAccount
   * @param idDocumentType
   * @returns
   */
  async getDocumentsByIdAccountAndIdDocumentType(idAccount: number, idDocumentType: number) {
    try {
      const { data } = await AppAlpexApiGateWay.get(
        `${ACCOUNT_INFORMATION_ROUTES.GET_FILES_BY_TYPE}/${idAccount}/${idDocumentType}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new AccountServices()

// ** Utils
const possibleStatuses = ['pending', 'declined', 'bound', 'notMaterialized', 'notTakenUp']

const getRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * possibleStatuses.length)

  return possibleStatuses[randomIndex]
}

const possibleLob = ['Property', 'Financial Lines', 'Other option']

const getRandomLob = () => {
  const randomIndex = Math.floor(Math.random() * possibleLob.length)

  return possibleLob[randomIndex]
}

const getRandomDateInRange = (startDate: any, endDate: any) => {
  const startMillis = startDate.getTime()
  const endMillis = endDate.getTime()
  const randomMillis = startMillis + Math.random() * (endMillis - startMillis)

  return new Date(randomMillis)
}

const getFormattedDate = (date: any) => {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return date.toLocaleDateString('en-EU', options)
}

const addYearsToDate = (date: any, years: any) => {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)

  return newDate
}

const data: IAccount[] = []

for (let index = 1; index <= 200; index++) {
  const id = index.toString().padStart(4, '0')
  const startDate = new Date('2022-01-01')
  const endDate = new Date('2023-12-31')
  const effectiveDate = getRandomDateInRange(startDate, endDate)
  const expirationDate = addYearsToDate(effectiveDate, 1)

  data.push({
    id,
    status: getRandomStatus(),
    insured: 'Jordan Stevenson',
    lob: getRandomLob(),
    effectiveDate: getFormattedDate(effectiveDate),
    expirationDate: getFormattedDate(expirationDate)
  })
}
