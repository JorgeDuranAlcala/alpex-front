import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import ReinsuranceCompanyBinderService from '@/services/catalogs/reinsuranceCompanyBinder.service'
import { useContext, useEffect, useState } from 'react'
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface BinderProps extends Omit<ISecurityInputProps, 'index' | 'errorMessage' | 'validateForm'> {
  index: number
  companyId: number | string
}

const LoaderMenuItem = () => (
  <MenuItem disabled>
    <div className="binder-loader">Loading...</div>
  </MenuItem>
)

export const Binder = ({ value, index, view, companyId }: BinderProps) => {
  const { securities, calculateSecurities } = useContext(SecurityContext)
  const [selectedBinder, setSelectedBinder] = useState<ReinsuranceCompanyBinderDto | null>(null)
  const [binders, setBinders] = useState<ReinsuranceCompanyBinderDto[]>([])
  const [loading, setLoading] = useState(false)

  const handleOnChangeBinder = (event: SelectChangeEvent) => {
    const value = event.target.value
    const binderSelect = binders.find(b => String(b.id) === String(value))
    const tempSecurities = [...securities]

    if (binderSelect) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompanyBinder: binderSelect
      }

      setSelectedBinder(binderSelect)
      calculateSecurities(tempSecurities)
    }
  }
  useEffect(() => {
    if (companyId) {
      setLoading(true)
      ReinsuranceCompanyBinderService.findByIdReinsuranceCompany(Number(companyId))
        .then(binders => {
          setBinders(binders)
          setLoading(false)
        })
        .catch(error => {
          console.error('Binder data error:', error)
          setLoading(false) // Hide loader on error
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  useEffect(() => {
    if (binders && binders.length > 0 && value) {
      const binderSelect = binders.find(b => String(b.id) === String(value))

      binderSelect && setSelectedBinder(binderSelect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binders, value])

  return (
    <FormControl fullWidth sx={{ mb: 6.5 }}>
      <InputLabel id='Binder'>Binder</InputLabel>

      <Select
        label='Binder'
        value={selectedBinder && binders.length > 0 ? String(selectedBinder.id) : String(value)}
        labelId='binder'
        onChange={handleOnChangeBinder}
        disabled={view === 2}
      >
        {loading ? (
          <LoaderMenuItem /> // Show loader
        ) : (
          binders?.map(binder => (
            <MenuItem key={binder.id} value={binder.id}>
              {binder.referenceNumber}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}
