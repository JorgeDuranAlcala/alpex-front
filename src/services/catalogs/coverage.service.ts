import { COVERAGE_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { CoverageDto } from 'src/services/catalogs/dtos/coverage.dto'

class CedantService {
  async getAll(): Promise<CoverageDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CoverageDto[]>>(COVERAGE_ROUTES.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CedantService()
