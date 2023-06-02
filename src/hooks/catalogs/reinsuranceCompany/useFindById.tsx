import { useEffect, useState } from 'react'
import { ReinsuranceCompanyDto } from 'src/services/catalogs/dtos/ReinsuranceCompanyDto'
import ReinsuranceCompanyService from 'src/services/catalogs/reinsuranceCompany.service'

export const useGetReinsuranceCompanyById = () => {
  const [reinsuranceCompany, setReinsuranceCompany] = useState<ReinsuranceCompanyDto>()
  const [id, setId] = useState(0)

  useEffect(() => {
    ReinsuranceCompanyService.findById(id)
      .then(reinsuranceCompany => {
        setReinsuranceCompany(reinsuranceCompany)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [id])

  return { reinsuranceCompany, setId }
}
