import { InformationDto } from '@/services/accounts/dtos/information.dto'
import { InstallmentDto } from '@/services/accounts/dtos/installments.dto'
import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { SecurityTotalDto } from '@/services/accounts/dtos/securityTotal.dto'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'

export interface EndorsementDto {
  id: number
  createdAt: Date
  updatedAt: Date
  active: boolean
  informations: InformationDto[]
  installments: InstallmentDto[]
  sublimits: SublimitDto[]
  boundSecurities: SecurityDto[]
  boundSecurityTotal: SecurityTotalDto[]
  idAccount: number
  idEndorsementType: number
}

export interface EndorsementHistoryDto {
  id: number
  createdAt: Date
  updatedAt: Date
  idAccount: number
  idEndorsementType: number
}