import { REINSURANCE_COMPANY_BINDER_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import {
  ReinsuranceCompanyBinderDto,
  ReinsuranceCompanyBindersDeleteDto,
  ReinsuranceCompanyBindersPaginationDto
} from 'src/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { queryBuilder } from '../helper/queryBuilder'

class ReinsuranceCompanyBinderService {
  async getAll(): Promise<ReinsuranceCompanyBinderDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyBinderDto[]>>(
        REINSURANCE_COMPANY_BINDER_ROUTES.GET_ALL
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<ReinsuranceCompanyBinderDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyBinderDto>>(
        `${REINSURANCE_COMPANY_BINDER_ROUTES.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(binder: Partial<ReinsuranceCompanyBinderDto>): Promise<ReinsuranceCompanyBinderDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<ReinsuranceCompanyBinderDto>>(
        `${REINSURANCE_COMPANY_BINDER_ROUTES.ADD}`,
        {
          ...binder
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<ReinsuranceCompanyBinderDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<ReinsuranceCompanyBinderDto>>(
        `${REINSURANCE_COMPANY_BINDER_ROUTES.UPDATE}/${id}`,
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

  async findByIdReinsuranceCompany(idReinsuranceCompany: number): Promise<ReinsuranceCompanyBinderDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyBinderDto[]>>(
        `${REINSURANCE_COMPANY_BINDER_ROUTES.GET_BY_ID_REINSURANCE_COMPANY}/${idReinsuranceCompany}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async getReinsuranceCompanyBindersByIdReinsuranceCompany(
    idCReinsuranceCompany: number,
    reinsuranceCompanyBindersData: ReinsuranceCompanyBindersPaginationDto,
    urlQ?: string
  ) {
    try {
      const url = urlQ
        ? urlQ
        : queryBuilder(
            reinsuranceCompanyBindersData.filters,
            `${REINSURANCE_COMPANY_BINDER_ROUTES.GET}/${idCReinsuranceCompany}`
          )
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${reinsuranceCompanyBindersData.info.take}&page=${reinsuranceCompanyBindersData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async deleteReinsuranceCompanyBinders(reinsuranceCompanyBindersDelete: Partial<ReinsuranceCompanyBindersDeleteDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.post(REINSURANCE_COMPANY_BINDER_ROUTES.DELETE, {
        ...reinsuranceCompanyBindersDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new ReinsuranceCompanyBinderService()
