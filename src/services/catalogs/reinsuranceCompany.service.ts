import { REINSURANCE_COMPANY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'
import {
  ReinsuranceCompanyDto,
  ReinsuranceCompanysDeleteDto,
  ReinsuranceCompanysPaginationDto
} from './dtos/ReinsuranceCompanyDto'

class ReinsuranceCompanyService {
  async getAll(): Promise<ReinsuranceCompanyDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyDto[]>>(
        REINSURANCE_COMPANY_ROUTES.GET_ALL
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<ReinsuranceCompanyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyDto>>(
        `${REINSURANCE_COMPANY_ROUTES.GET_BY_ID}/${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addReinsuranceCompany(reinsuranceCompany: Partial<ReinsuranceCompanyDto>): Promise<ReinsuranceCompanyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<ReinsuranceCompanyDto>>(REINSURANCE_COMPANY_ROUTES.ADD, {
        ...reinsuranceCompany
      })

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async updateById(id: number, update: Partial<ReinsuranceCompanyDto>): Promise<ReinsuranceCompanyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<ReinsuranceCompanyDto>>(
        `${REINSURANCE_COMPANY_ROUTES.GET_BY_ID}/${id}`,
        {
          ...update
        }
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async deleteReinsuranceCompany(reinsuranceCompanyDelete: Partial<ReinsuranceCompanysDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(REINSURANCE_COMPANY_ROUTES.DELETE, {
        ...reinsuranceCompanyDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async getReinsuranceCompanyPagination(reinsuranceCompanyData: ReinsuranceCompanysPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(reinsuranceCompanyData.filters, `${REINSURANCE_COMPANY_ROUTES.GET}`)
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${reinsuranceCompanyData.info.take}&page=${reinsuranceCompanyData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }
}

export default new ReinsuranceCompanyService()
