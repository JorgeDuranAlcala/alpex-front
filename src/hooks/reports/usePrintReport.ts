import { PrintReportParamsDto } from '@/services/reports/dtos/report.dto'
import reportService from '@/services/reports/report.service'
import { useEffect, useState } from 'react'

const usePrintReport = () => {
  const [printReportParams, setPrintReportParams] = useState<PrintReportParamsDto>()
  const [buffer, setBuffer] = useState<Buffer | undefined>()

  const getReport = async (reportParams: PrintReportParamsDto) => {
    const data = await reportService.printAccountReport({ ...reportParams })
    setBuffer(data)
  }

  useEffect(() => {
    printReportParams && getReport(printReportParams)
  }, [printReportParams])

  return {
    printReportParams,
    setPrintReportParams,
    buffer,
    getReport
  }
}
export default usePrintReport
