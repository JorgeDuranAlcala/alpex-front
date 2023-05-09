import { useEffect, useState } from 'react'
import { ReinsuranceCompanyDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'
import ReinsuranceCompanyService from 'src/services/catalogs/reinsuranceCompany.service'

export const useGetAllReinsuranceCompanies = () => {
  const [reinsuranceCompany, setReinsuranceCompany] = useState<ReinsuranceCompanyDto[]>()

  useEffect(() => {
    ReinsuranceCompanyService.getAll()
      .then(reinsuranceCompany => {
        setReinsuranceCompany(reinsuranceCompany)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { reinsuranceCompany }
}
