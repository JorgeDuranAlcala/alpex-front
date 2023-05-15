import { useEffect, useState } from 'react'
import { RiskActivityDto } from 'src/services/catalogs/dtos/riskActivity.dto'
import RiskActivityService from 'src/services/catalogs/riskActivity.service'

export const useGetAllRiskActivities = () => {
  const [riskActivities, setRiskActivities] = useState<RiskActivityDto[]>([])

  useEffect(() => {
    RiskActivityService.getAll()
      .then(riskActivities => {
        setRiskActivities(riskActivities)
      })
      .catch(error => {
        throw error
      })
  }, [])

  return {
    riskActivities
  }
}
