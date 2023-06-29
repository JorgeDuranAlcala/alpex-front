import EconomicSectorService from '@/services/catalogs/economicSector.service'
import { useEffect, useState } from 'react'
import { EconomicSectorDto } from 'src/services/catalogs/dtos/economicSector.dto'

export const useGetAllEconomicSectors = () => {
  const [economicSectors, setEconomicSectors] = useState<EconomicSectorDto[]>([])

  const getAllEconomicSector = async () => {
    const data = await EconomicSectorService.getAll()
    setEconomicSectors(data)
  }

  useEffect(() => {
    EconomicSectorService.getAll()
      .then(sectors => {
        setEconomicSectors(sectors)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { economicSectors, getAllEconomicSector }
}
