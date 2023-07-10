import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useAppDispatch } from '@/store'
import { useEffect } from 'react'
import { updateAvailableReinsurers, updateCountries, updateRetroCedants } from '../store/securitySlice'


export const useGetDatas = () => {

  const dispatch = useAppDispatch();
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { retroCedants } = useGetAllRetroCedants()
  const { countries } = useGetAllCountries()


  useEffect(() => {
    const companies = reinsuranceCompany?.map(company => {
      return {
        id: company.id,
        name: company.name,
        special: company.idSubscriptionType === 1,
        active: true
      }
    })
    dispatch(updateAvailableReinsurers({ availableReinsurens: companies || [] }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reinsuranceCompany])

  useEffect(() => {
    if (retroCedants) {
      if (retroCedants.length > 0) {
        dispatch(updateRetroCedants({ retroCedants }))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retroCedants]);


  useEffect(() => {
    if (countries) {
      if (countries.length > 0) {
        dispatch(updateCountries({ countries }))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])


}