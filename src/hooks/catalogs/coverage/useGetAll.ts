import { useEffect, useState } from 'react'
import CoverageService from 'src/services/catalogs/coverage.service'
import { CoverageDto } from 'src/services/catalogs/dtos/coverage.dto'

export const useGetAllCoverage = () => {
  const [coverages, setCoverages] = useState<CoverageDto[]>([])

  const getAllCoverages = async () => {
    const data = await CoverageService.getAll()
    setCoverages(data)
  }

  useEffect(() => {
    getAllCoverages()
  }, [])

  return { coverages, getAllCoverages }
}
