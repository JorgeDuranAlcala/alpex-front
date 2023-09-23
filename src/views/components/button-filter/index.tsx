// import IconButton from '@mui/material/IconButton'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import DatePickerFilter from './DatePicker'
import SearchInput from './SearchInput'

// import { SelectChangeEvent } from '@mui/material';

interface IDataFilter {
  dataFilter: string[]
  date?: boolean
  insured?: boolean
  endorsement?: boolean
  filterName?: string | undefined
}
const ButtonFilter = ({ dataFilter, date, insured, endorsement, filterName }: IDataFilter) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // const [menu, setMenu] = React.useState('');

  // console.log(menu);
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const colorText = userThemeConfig.palette?.text.tite
  const sizeText = userThemeConfig.typography?.size.px14
  const weight = userThemeConfig.typography?.fontWeight.weight400

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleChange = (e: SelectChangeEvent) => {
  //   setMenu(e.target.value);
  // };

  return (
    <>
      <IconButton
        style={
          endorsement
            ? {
                width: '40px',
                height: '40px',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                float: 'right',
                right: '5px'
              }
            : {
                width: '40px',
                height: '40px',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                right: '5px'
              }
        }
        onClick={handleClick}
      >
        <Icon icon='mdi:filter-variant' fontSize={20} color={anchorEl ? '#26C6F9' : undefined} />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            display: 'flex',
            maxHeight: 'auto',
            width: 'auto',
            borderRadius: '10px',
            padding: date ? '16px' : insured ? '4px 4px 4px 16px' : '0px'
          }
        }}
      >
        {date ? (
          <DatePickerFilter />
        ) : insured ? (
          <SearchInput filterName={filterName} />
        ) : (
          dataFilter?.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose()

                // setMenu(option);
              }}
              sx={{
                fontFamily: inter,
                color: colorText,
                fontSize: sizeText,
                fontWeight: weight,
                letterSpacing: '0.15px'
              }}
            >
              {option}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  )
}

export default ButtonFilter
