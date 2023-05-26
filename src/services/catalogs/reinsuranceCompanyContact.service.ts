import { REINSURANCE_COMPANY_CONTACT_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import {
  ReinsuranceCompanyContactDto,
  ReinsuranceCompanyContactsDeleteDto,
  ReinsuranceCompanyContactsPaginationDto
} from 'src/services/catalogs/dtos/ReinsuranceCompanyContact.dto'
import { queryBuilder } from '../helper/queryBuilder'

class ReinsuranceCompanyContactService {
  async getAll(): Promise<ReinsuranceCompanyContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyContactDto[]>>(
        REINSURANCE_COMPANY_CONTACT_ROUTES.GET_ALL
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async findById(id: number): Promise<ReinsuranceCompanyContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyContactDto>>(
        `${REINSURANCE_COMPANY_CONTACT_ROUTES.GET_BY_ID}${id}`
      )

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async add(contact: Partial<ReinsuranceCompanyContactDto>): Promise<ReinsuranceCompanyContactDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<ReinsuranceCompanyContactDto>>(
        `${REINSURANCE_COMPANY_CONTACT_ROUTES.ADD}`,
        {
          ...contact
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<ReinsuranceCompanyContactDto>) {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<ReinsuranceCompanyContactDto>>(
        `${REINSURANCE_COMPANY_CONTACT_ROUTES.UPDATE}${id}`,
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

  async findByIdReinsuranceCompany(idReinsuranceCompany: number): Promise<ReinsuranceCompanyContactDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyContactDto[]>>(
        `${REINSURANCE_COMPANY_CONTACT_ROUTES.GET_BY_ID_REINSURANCE_COMPANY}/${idReinsuranceCompany}`
      )

      return data
    } catch (error) {
      throw error
    }
  }

  async getReinsuranceCompanyContactsByIdReinsuranceCompany(
    idCReinsuranceCompany: number,
    reinsuranceCompanyContactsData: ReinsuranceCompanyContactsPaginationDto,
    urlQ?: string
  ) {
    try {
      const url = urlQ
        ? urlQ
        : queryBuilder(
            reinsuranceCompanyContactsData.filters,
            `${REINSURANCE_COMPANY_CONTACT_ROUTES.GET}/${idCReinsuranceCompany}`
          )
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${reinsuranceCompanyContactsData.info.take}&page=${reinsuranceCompanyContactsData.info.page}`
      )

      return data
    } catch (error) {
      const errMessage = String(error)
      throw new Error(errMessage)
    }
  }

  async deleteReinsuranceCompanyContacts(
    reinsuranceCompanyContactsDelete: Partial<ReinsuranceCompanyContactsDeleteDto>
  ) {
    try {
      const { data } = await AppAlpexApiGateWay.post(REINSURANCE_COMPANY_CONTACT_ROUTES.DELETE, {
        ...reinsuranceCompanyContactsDelete
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new ReinsuranceCompanyContactService()
