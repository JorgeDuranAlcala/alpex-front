import { INSTALLMENT_ROUTERS } from 'src/configs/api'
import { IBrokerTrackerState, IInstallmentState } from 'src/types/apps/installmentsTypes'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'
import {
  CountInstallmentByBrokerDto,
  CountInstallmentsDto,
  InstallmentDto,
  installmentsHeaderDto
} from './dtos/installments.dto'

class InstallmentService {
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
  async filterInstallment(installmentData: IInstallmentState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(installmentData.filters, INSTALLMENT_ROUTERS.FILTER_INSTALMENTS)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${installmentData.info.take}&page=${installmentData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async installmentHeader(idAccount: number, idInstallment: number): Promise<installmentsHeaderDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<installmentsHeaderDto>>(
        `${INSTALLMENT_ROUTERS.INSTALLMENT_HEADER}/?&idAccount=${idAccount}&idInstallment=${idInstallment}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async filterBrokerTracker(installmentData: IBrokerTrackerState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(installmentData.filters, INSTALLMENT_ROUTERS.FILTER_BROKER_TRAKER)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${installmentData.info.take}&page=${installmentData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async countInstallmentByBroker(idBroker: string): Promise<CountInstallmentByBrokerDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CountInstallmentByBrokerDto>>(
        `${INSTALLMENT_ROUTERS.COUNT_INSTALLMENTS_BY_BROKER}/?${idBroker}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new InstallmentService()
