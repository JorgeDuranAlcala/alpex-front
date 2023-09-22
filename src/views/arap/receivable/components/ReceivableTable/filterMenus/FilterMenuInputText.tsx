// ** React Imports
import { useContext, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ReceivableContext } from '../../../context/ReceivableContext'



interface FilterMenuInputTextProps {
  titleType: string;
  columnType: string;
  placeholder?: string;
  inputType?: string;
  handleClose?: () => void
}



const FilterMenuInputText = ({
  titleType,
  columnType,
  inputType = 'text',
  placeholder = 'Search',
  handleClose
}: FilterMenuInputTextProps) => {

  const { handleChangeFilters, handleDeleteFilters } = useContext(ReceivableContext);
  const searchTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



  const handleOnChangeSearch = (value: string) => {
    if (searchTimeOutRef.current) {

      clearTimeout(searchTimeOutRef.current);
    }
    searchTimeOutRef.current = setTimeout(() => {
      if (value === '') handleDeleteFilters(columnType)
      else
        handleChangeFilters({
          type: columnType,
          value: `${value}`,
          text: `${titleType}: ${value}`
        })

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
        type={inputType}
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
