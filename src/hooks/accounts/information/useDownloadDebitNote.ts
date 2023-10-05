import reportService from '@/services/reports/report.service'

export const useDownloadDebitNote = () => {
  const downloadDebitNote = async (idAccount: number, idLanguage: number) => {
    const data = await reportService.getBufferDebitNote(idAccount, idLanguage)
    let downloaded = true
    if (data) {
      const fileToDownload = new File([data], `debit_note_${idAccount}.xlsx`)
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

  return { downloadDebitNote }
}
