import { DebitNoteParamsDto } from '@/services/reports/dtos/report.dto'
import reportService from '@/services/reports/report.service'

const useDownloadDebitNote = () => {
  const getDebitNote = async (debitNoteParams: DebitNoteParamsDto) => {
    return await reportService.downloadDebitNote({ ...debitNoteParams })
  }

  return {
    getDebitNote
  }
}
export default useDownloadDebitNote
