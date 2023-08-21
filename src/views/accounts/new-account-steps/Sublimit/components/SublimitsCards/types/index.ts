// import { ReactNode } from 'react'

import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'

export interface RenderFormGeneric {
  type?: number
  components?: any
  state?: any
  setState?: (data: any) => {}
  handleOnDeleteForm: (index: number) => void

  index?: number
  limit: number
  formErrors: boolean[]
  subLimit: SublimitDto
  subLimits: SublimitDto[]
  setSubLimits: React.Dispatch<React.SetStateAction<SublimitDto[]>>
  setErrors: React.Dispatch<React.SetStateAction<boolean[]>>
  showErrors: boolean
  selectedCoverages: CoverageDto[];
}
