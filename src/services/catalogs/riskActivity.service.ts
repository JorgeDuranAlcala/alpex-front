import { RISK_ACTIVITY_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { RiskActivityDto } from './dtos/riskActivity.dto'

class CurrencyService {
  async getAll(): Promise<RiskActivityDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RiskActivityDto[]>>(RISK_ACTIVITY_ROUTES.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async findById(id: number): Promise<RiskActivityDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<RiskActivityDto>>(`${RISK_ACTIVITY_ROUTES.GET_BY_ID}/${id}`)

      return data
    } catch (error) {
      throw error
    }
  }

  async add(riskActivity: Partial<RiskActivityDto>): Promise<RiskActivityDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<RiskActivityDto>>(RISK_ACTIVITY_ROUTES.ADD, {
        ...riskActivity
      })

      return data
    } catch (error) {
      throw error
    }
  }

  async updateById(id: number, update: Partial<RiskActivityDto>): Promise<RiskActivityDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<RiskActivityDto>>(
        `${RISK_ACTIVITY_ROUTES.GET_BY_ID}/${id}`,
        {
          ...update
        }
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CurrencyService()
