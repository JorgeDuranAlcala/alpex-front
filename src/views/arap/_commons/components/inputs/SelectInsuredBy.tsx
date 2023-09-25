import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { useContext, useEffect } from 'react'
import { InsuredSelectorContext } from '../../context/InsuredSelector/InsuredSelectorContext'
import { InsuredBy } from '../../interfaces/InsuredBy.type'

interface SelectInsuredByProps {
  by: InsuredBy
  onSelectInsuredId: (id: number) => void
}

export const SelectInsuredBy = ({ by, onSelectInsuredId }: SelectInsuredByProps) => {
  const { isLoading, insuredOptions, selectedInsuredId, loadInsureds, handleOnChangeInsured } =
    useContext(InsuredSelectorContext)

  const handleOnChange = (e: SelectChangeEvent<number | null>) => {
    handleOnChangeInsured(Number(e.target.value))
    onSelectInsuredId(Number(e.target.value))
  }

  useEffect(() => {
    if (insuredOptions.length === 0 && !isLoading) {
      loadInsureds(by)
    }
  }, [by, insuredOptions, isLoading, loadInsureds])

  useEffect(() => {
    if (insuredOptions.length > 1 && !isLoading && !selectedInsuredId) {
      handleOnChangeInsured(insuredOptions[0].id)
      onSelectInsuredId(insuredOptions[0].id)
    }
  }, [handleOnChangeInsured, insuredOptions, isLoading, selectedInsuredId, onSelectInsuredId])

  return (
    <FormControl fullWidth>
      <InputLabel>Insured</InputLabel>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Select
          name='insured_by'
          label='Select Insured'
          value={selectedInsuredId || ''}
          onChange={handleOnChange}
          labelId='insured'
        >
          {insuredOptions.length > 0 ? (
            insuredOptions.map(insured => {
              return (
                <MenuItem key={insured.id} value={insured.id}>
                  {insured.name}
                </MenuItem>
              )
            })
          ) : (
            <MenuItem key={null} value={''}>
              No options available
            </MenuItem>
          )}
        </Select>
      )}
    </FormControl>
  )
}
