import { IInputCreditNote } from '@/services/reports/dtos/report.dto'
import reportService from '@/services/reports/report.service'

export const useDownloadCreditNote = () => {
  const downloadCreditNote = async (creditNote: IInputCreditNote) => {
    const data = await reportService.getBufferCreditNote(creditNote)    
    let downloaded = true
    if (data) {
      const fileToDownload = new File([data], `credit_note_${creditNote.idAccount}_${creditNote.idSecurity}.xlsx`)
      const downloadUrl = URL.createObjectURL(fileToDownload)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileToDownload.name
      link.click()
      URL.revokeObjectURL(downloadUrl)

      return downloaded
    }
    downloaded = false

    return downloaded
  }

  return { downloadCreditNote }
}
