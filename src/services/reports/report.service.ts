import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { BOURDEROU_ROUTES, DEBIT_NOTE_ROUTES, PRINT_ACCOUNT_ROUTES, REPORTS_ROUTES } from '@/configs/api'
import { BourderauBodyDto, DebitNoteParamsDto, PrintReportParamsDto, ReportBodyDto } from './dtos/report.dto'

/**
 *  service responsible of the reports methods
 */
class ReportServices {
  /**
   * brings the report according the id account and language
   * @param idAccount
   * @param idLanguage
   * @returns
   */
  async printAccountReport(printReportParams: PrintReportParamsDto): Promise<Buffer> {
    try {
      const { data } = await AppAlpexApiGateWay.post(
        PRINT_ACCOUNT_ROUTES.GET_BY_ID_ACCOUNT_LANGUAGE,
        printReportParams,
        {
          responseType: 'arraybuffer'
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * brings the bourderou excel by idCReinsuranceCompany and idCReinsuranceCompanyBinder
   * @param idCReinsuranceCompany
   * @param idCReinsuranceCompanyBinder
   * @returns
   */
  async downloadBourderou(bourderauBody: BourderauBodyDto): Promise<ArrayBuffer> {
    try {
      const { data } = await AppAlpexApiGateWay.post(BOURDEROU_ROUTES.DOWNLOAD, bourderauBody, {
        responseType: 'arraybuffer'
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * brings the debit note excel by idAccount
   * @param idAccount
   * @returns
   */
  async downloadDebitNote(debitNoteBody: DebitNoteParamsDto): Promise<ArrayBuffer> {
    try {
      const { data } = await AppAlpexApiGateWay.get(`${DEBIT_NOTE_ROUTES.DOWNLOAD}/${debitNoteBody.idAccount}`, {
        responseType: 'arraybuffer'
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * brings the excel report for accounts group by status
   * @param idStatus
   * @returns
   */
  async downloadAllAccountsReport(reportBody: ReportBodyDto) {
    try {
      const { data } = await AppAlpexApiGateWay.post(REPORTS_ROUTES.DOWNLOAD, reportBody, {
        responseType: 'arraybuffer'
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new ReportServices()
