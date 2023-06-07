import { RolesCreateUser } from '@/services/catalogs/dtos/RolesCreateUser'
import { useEffect, useState } from 'react'
import CompanyService from 'src/services/catalogs/company.service'

export const useGetAllRoles = () => {
  const [roles, setRoles] = useState<RolesCreateUser[]>()

  useEffect(() => {
    CompanyService.getAllRoles()
      .then(dataRoles => {
        setRoles(dataRoles)
      })
      .catch(error => {
        throw new Error(error)
      })
  }, [])

  return { roles }
}
