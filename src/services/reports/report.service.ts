import { AppAlpexApiGateWay } from '../app.alpex.api-getway'

//Routes
import { BOURDEROU_ROUTES, PRINT_ACCOUNT_ROUTES } from '@/configs/api'
import { BourderauBodyDto, PrintReportParamsDto } from './dtos/report.dto'

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
}

export default new ReportServices()
