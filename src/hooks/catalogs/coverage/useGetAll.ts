import { useEffect, useState } from 'react'
import CoverageService from 'src/services/catalogs/coverage.service'
import { CoverageDto } from 'src/services/catalogs/dtos/coverage.dto'

export const useGetAllCoverage = () => {
  const [coverages, setCoverages] = useState<CoverageDto[]>([])

  const getAllCurrencies = async () => {
    const data = await CoverageService.getAll()
    setCoverages(data)
  }

  useEffect(() => {
    getAllCurrencies()
  }, [])

  return { coverages }
}
