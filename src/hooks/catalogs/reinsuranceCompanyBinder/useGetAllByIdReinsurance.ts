import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import reinsuranceCompanyBinderService from '@/services/catalogs/reinsuranceCompanyBinder.service'
import { useEffect, useState } from 'react'

const useGetReinsCompBindByIdReinsComp = () => {
  const [idReinsuranceCompany, setIdReinsuranceCompany] = useState<number>()
  const [reinsuranceCompanyBinders, setReinsuranceCompanyBinders] = useState<ReinsuranceCompanyBinderDto[]>([])

  const getReinsuranceCompanyBindersByIdReinsuranceCompany = async (idReinsuranceCompany: number) => {
    const data = await reinsuranceCompanyBinderService.findByIdReinsuranceCompany(idReinsuranceCompany)
    setReinsuranceCompanyBinders(data)
  }

  useEffect(() => {
    idReinsuranceCompany && getReinsuranceCompanyBindersByIdReinsuranceCompany(idReinsuranceCompany)
  }, [idReinsuranceCompany])

  return {
    setIdReinsuranceCompany,
    reinsuranceCompanyBinders
  }
}
export default useGetReinsCompBindByIdReinsComp
