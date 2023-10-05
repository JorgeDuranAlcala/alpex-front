export interface PrintReportProps {
  buffer: Buffer
}

export interface PrintReportParamsDto {
  idAccount: number
  idLanguage: number
}

export interface BourderauBodyDto {
  idCReinsuranceCompany: number
  idCReinsuranceCompanyBinder: number
}

export interface ReportBodyDto {
  idStatus: number
}
export interface DebitNoteParamsDto {
  idAccount: number
}

export interface IInputCreditNote {
  idAccount: number
  idSecurity: number
  idLanguage: number
}
