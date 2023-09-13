import { INSTALLMENT_ROUTERS } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CountInstallmentsDto, InstallmentDto } from './dtos/installments.dto'

class SecurityService {
  async addInstallments(securitiesIn: Partial<InstallmentDto>[]): Promise<InstallmentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<InstallmentDto[]>>(INSTALLMENT_ROUTERS.ADD, securitiesIn)

      return data
    } catch (error) {
      throw error
    }
  }

  async getByAllIdAccount(idAccount: number): Promise<InstallmentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<InstallmentDto[]>>(
        `${INSTALLMENT_ROUTERS.GET_ALL}/${idAccount}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async update(update: Partial<InstallmentDto>[]): Promise<InstallmentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<InstallmentDto[]>>(INSTALLMENT_ROUTERS.UPDATE, update)

      return data
    } catch (error) {
      throw error
    }
  }

  async delete(update: Omit<InstallmentDto, 'id'>[]): Promise<InstallmentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<InstallmentDto[]>>(INSTALLMENT_ROUTERS.DELETE, update)

      return data
    } catch (error) {
      throw error
    }
  }

  async countInstallment(): Promise<CountInstallmentsDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CountInstallmentsDto>>(
        INSTALLMENT_ROUTERS.COUNT_INSTALLMENTS
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new SecurityService()
