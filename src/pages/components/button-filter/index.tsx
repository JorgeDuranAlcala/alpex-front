// import IconButton from '@mui/material/IconButton'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'

// import { SelectChangeEvent } from '@mui/material';

const ITEM_HEIGHT = 48
interface IDataFilter {
  dataFilter: string[]
}
const ButtonFilter = ({ dataFilter }: IDataFilter) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // const [menu, setMenu] = React.useState('');

  // console.log(menu);

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
        style={{
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          right: '5px'
        }}
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            borderRadius: '10px',
            padding: '8px 0px'
          }
        }}
      >
        {dataFilter?.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose()

              // setMenu(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ButtonFilter
