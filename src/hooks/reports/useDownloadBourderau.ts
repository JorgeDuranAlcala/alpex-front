import { BourderauBodyDto } from '@/services/reports/dtos/report.dto'
import reportService from '@/services/reports/report.service'

const useDownloadBourderau = () => {
  const getBourderau = async (bourderauParams: BourderauBodyDto) => {
    return await reportService.downloadBourderou({ ...bourderauParams })
  }

  return {
    getBourderau
  }
}
export default useDownloadBourderau
