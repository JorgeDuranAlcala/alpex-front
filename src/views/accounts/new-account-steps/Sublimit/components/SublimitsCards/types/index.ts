// import { ReactNode } from 'react'

import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'

interface FormErrors {
  sublimit: string
  at100: string
  deductible: string
  amount: string
  min: string
  coinsurance: string
  yes: string
  luc: string
  typeBi: string
  typeDeductible: string
  daysBi: string
  idCCoverage: string
  amountBi: string
  idCDeductiblePer: string
}

export interface RenderFormGeneric {
  type?: number
  components?: any
  state?: any
  setState?: (data: any) => {}
  handleOnDeleteForm: (index: number) => void

  index?: number
  limit: number
  formErrors: FormErrors
  subLimit: SublimitDto
  subLimits: SublimitDto[]
  setSubLimits: React.Dispatch<React.SetStateAction<SublimitDto[]>>
}
