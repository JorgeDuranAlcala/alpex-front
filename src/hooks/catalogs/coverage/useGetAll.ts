import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CoverageService from 'src/services/catalogs/coverage.service'
import { CoverageDto } from 'src/services/catalogs/dtos/coverage.dto'

export const useGetAllCoverage = () => {
  const router = useRouter()
  const [coverages, setCoverages] = useState<CoverageDto[]>([])
  const [accountId, setAccountIdCoverage] = useState<number | string>(0)

  const getAllCoverages = async (accountId: string | number) => {
    const data = await CoverageService.getAll('/' + accountId)

    setCoverages(data)
  }

  useEffect(() => {
    const id = router.query?.idAccount || accountId || localStorage.getItem('idAccount')
    if (id) {
      getAllCoverages(Number(id))
    }
  }, [router.query?.idAccount, accountId])

  return { coverages, getAllCoverages, setAccountIdCoverage }
}
