import { BANK_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { BankDto, BankPaginationDto } from 'src/services/catalogs/dtos/bank.dto'
import { queryBuilder } from '../helper/queryBuilder'

class BankService {
  async getAll(): Promise<BankDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BankDto[]>>("/catalogs/bank-accounts/all?page=1&itemsPerPage=10")
      return data
    } catch (error) {
      throw error
    }
  }


  async findById(id: number): Promise<BankDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BankDto>>(`${BANK_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(bank: Partial<BankDto>): Promise<BankDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<BankDto>>(`${BANK_ROUTES.ADD}`, {
        ...bank
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<BankDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<BankDto>>(`${BANK_ROUTES.UPDATE}/${id}`, {
        ...update
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: number) {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<BankDto>>(`${BANK_ROUTES.DELETE_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async getBanksPagination(bankData: BankPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(bankData.filters, `${BANK_ROUTES.GET}`)
      const { data } = await AppAlpexApiGateWay.get(`${url}&take=${bankData.info.take}&page=${bankData.info.page}`)

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

}

export default new BankService()
