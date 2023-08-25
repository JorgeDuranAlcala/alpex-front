import { useEffect, useState } from 'react'
import CoverageService from 'src/services/catalogs/coverage.service'
import { CoverageDto } from 'src/services/catalogs/dtos/coverage.dto'

export const useGetAllCoverage = () => {
  const [coverages, setCoverages] = useState<CoverageDto[]>([])
  const [accountId, setAccountIdCoverage] = useState<number | string>(0)

  const getAllCoverages = async (accountId: string | number) => {
    const data = await CoverageService.getAll("/" + accountId)


    setCoverages(data)
  }

  useEffect(() => {
    getAllCoverages(accountId)
  }, [accountId])

  return { coverages, getAllCoverages, setAccountIdCoverage }
}
