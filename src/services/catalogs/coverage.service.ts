import { COVERAGE_ROUTES } from 'src/configs/api'
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway'
import { CoverageDto, CoverageInputDto } from 'src/services/catalogs/dtos/coverage.dto'

class CedantService {
  async getAll(): Promise<CoverageDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CoverageDto[]>>(COVERAGE_ROUTES.GET_ALL)

      return data
    } catch (error) {
      throw error
    }
  }

  async create(coverage: CoverageInputDto): Promise<CoverageInputDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<CoverageInputDto>>(COVERAGE_ROUTES.CREATE, {
        ...coverage
      })

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CedantService()
