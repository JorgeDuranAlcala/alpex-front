import { COMPANY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { ReinsuranceCompanyDto } from './dtos/ReinsuranceCompanyDto'
import { RolesCreateUser } from './dtos/RolesCreateUser'

class CompanyService {
  async getAll(): Promise<ReinsuranceCompanyDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyDto[]>>(COMPANY_ROUTES.GET_ALL)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getAllRoles(): Promise<RolesCreateUser[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RolesCreateUser[]>>(`${COMPANY_ROUTES.ROLES}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
  async findById(id: number): Promise<ReinsuranceCompanyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ReinsuranceCompanyDto>>(`${COMPANY_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async addReinsuranceCompany(reinsuranceCompany: Partial<ReinsuranceCompanyDto>): Promise<ReinsuranceCompanyDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<ReinsuranceCompanyDto>>(COMPANY_ROUTES.ADD, {
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
        `${COMPANY_ROUTES.GET_BY_ID}/${id}`,
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
}

export default new CompanyService()
