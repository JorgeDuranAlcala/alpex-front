// ** React Imports
import { useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/store'
import { deleteAccountFilter, handleAccountFilter } from 'src/store/apps/accounts'
import fonts from '../font'

const FilterMenuValfis = () => {
  const dispatch = useAppDispatch();
  const searchTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



  const handleOnChangeSearch = (value: string) => {
    if (searchTimeOutRef.current) {

      clearTimeout(searchTimeOutRef.current);
    }
    searchTimeOutRef.current = setTimeout(() => {
      if (value === '') dispatch(deleteAccountFilter('idAccount'))
      else
        dispatch(
          handleAccountFilter({
            type: 'idAccount',
            value: `${value}`,
            text: `${value}`
          })
        )
    }, 500);
  }

  return (
    <Box component={'li'} sx={{ padding: '3px 30px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <Input
        placeholder='Search by ID'
        onChange={e => handleOnChangeSearch(e.target.value)}
        sx={{
          fontFamily: fonts.inter,
          fontSize: fonts.size.px16,
          width: '100%',
          '&:before, &:after': { display: 'none' }
        }}
        startAdornment={
          <InputAdornment position='start' sx={{ color: 'text.disabled' }}>
            <Icon icon='mdi:magnify' fontSize='1.375rem' />
          </InputAdornment>
        }
      />
    </Box>
  )
}

export default FilterMenuValfis
