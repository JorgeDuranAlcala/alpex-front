// ** React Imports
import { useContext, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext'
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType'

interface FilterMenuInputTextProps {
  auxFilterText: string;
  detailsType: DetailsType;
  columnType: string;
  placeholder?: string;
  handleClose?: () => void
}



const FilterMenuInputText = ({ auxFilterText, detailsType, columnType, placeholder = 'Search...', handleClose }: FilterMenuInputTextProps) => {

  const { handleChangeFilters, handleDeleteFilters } = useContext(OverviewDetailsContext);
  const searchTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



  const handleOnChangeSearch = (value: string) => {
    if (searchTimeOutRef.current) {

      clearTimeout(searchTimeOutRef.current);
    }
    searchTimeOutRef.current = setTimeout(() => {
      if (value === '') handleDeleteFilters(columnType, detailsType)
      else
        handleChangeFilters({
          type: columnType,
          value: `${value}`,
          text: `${auxFilterText}: ${value}`
        }, detailsType)

    }, 500);
  }

  const handleCloseOnEnter = (key: string) => {
    if (handleClose && key === 'Enter') {

      handleClose();
    }
  }

  return (
    <Box component={'li'} sx={{ padding: '3px 30px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <Input
        placeholder={placeholder}
        onChange={e => handleOnChangeSearch(e.target.value)}
        onKeyDown={e => handleCloseOnEnter(e.key)}
        sx={{
          fontFamily: 'Inter',
          fontSize: '16px',
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

export default FilterMenuInputText
