import { useEffect, useState } from 'react'
import CompanyService from 'src/services/catalogs/company.service'
import { ReinsuranceCompanyDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'

export const useGetAllCompanies = () => {
  const [company, setCompany] = useState<ReinsuranceCompanyDto[]>()

  useEffect(() => {
    CompanyService.getAll()
      .then(companyData => {
        setCompany(companyData)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { company }
}
