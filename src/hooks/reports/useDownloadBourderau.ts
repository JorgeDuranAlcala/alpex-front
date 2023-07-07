import { BourderauBodyDto } from '@/services/reports/dtos/report.dto'
import reportService from '@/services/reports/report.service'
import { useEffect, useState } from 'react'

const useDownloadBourderau = () => {
  const [downloadBourderauParams, setDownloadBourderauParams] = useState<BourderauBodyDto>()
  const [buffer, setBuffer] = useState<ArrayBuffer>()

  const getReport = async (reportParams: BourderauBodyDto) => {
    const data = await reportService.downloadBourderou({ ...reportParams })
    setBuffer(data)
  }

  useEffect(() => {
    downloadBourderauParams && getReport(downloadBourderauParams)
  }, [downloadBourderauParams])

  return {
    setDownloadBourderauParams,
    buffer,
    getReport
  }
}
export default useDownloadBourderau
