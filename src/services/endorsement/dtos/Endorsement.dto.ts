import { InformationDto } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { DeepPartial } from 'react-hook-form'

export interface EndorsementDto {
  id?: number
  reason: string
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
  information: DeepPartial<InformationDto>
  installments: InstallmentDto[]
  sublimits: SublimitDto[]
  securities: SecurityDto[]
  securitiesTotal: SecurityTotalDto[]
  idAccount: number
  idEndorsementType: number
  type?: string
}

export interface EndorsementHistoryDto {
  id: number
  reason: string
  createdAt: Date
  updatedAt: Date
  idAccount: number
  idEndorsementType: number
}
