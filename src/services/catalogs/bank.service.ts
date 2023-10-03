import { BANK_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { BankDto, BankPaginationDto } from 'src/services/catalogs/dtos/bank.dto'
import { queryBuilder } from '../helper/queryBuilder'

class BankService {
  async getAll(): Promise<BankDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<BankDto[]>>(`${BANK_ROUTES.GET}?itemsPerPage=100000&page=1`)

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
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-type': "application/json",
        'Accept': "application/json",
        'x-api-key': process.env.NEXT_PUBLIC_ALPEX_API_TOKEN
      }
      const fetch_res = await fetch(`${process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY}/catalogs/bank-accounts/add`, { headers, method: 'POST', body: JSON.stringify(bank) })
      const data = await fetch_res.json()

      return data
    } catch (error) {
      console.log("error while posting: ", error.message)
      throw error
    }
  }

  async update(updateData: Partial<BankDto>) {
    try {
      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-type': "application/json",
        'Accept': "application/json",
        'x-api-key': process.env.NEXT_PUBLIC_ALPEX_API_TOKEN
      }
      const fetch_res = await fetch(`${process.env.NEXT_PUBLIC_APP_ALPEX_API_GATEWAY}/catalogs/bank-accounts/update`, { headers, method: 'POST', body: JSON.stringify(updateData) })
      const data = await fetch_res.json()

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
      const url = urlQ ? urlQ : queryBuilder(bankData.filters, `/catalogs/bank-accounts/all`)
      const { data } = await AppAlpexApiGateWay.get(`${url}&itemsPerPage=${bankData.info.take}&page=${bankData.info.page}`)

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

}

export default new BankService()
