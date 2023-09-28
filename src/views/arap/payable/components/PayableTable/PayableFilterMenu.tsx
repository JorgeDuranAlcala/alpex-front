// ** React Imports
import { useContext, useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
// import FilterMenu from 'src/views/accounts/Table/FilterMenu'

import { PayableContext } from '../../context/PayableContext'
import { PayableSwitcherFilterMenus } from './filterMenus/PayableSwitcherFilterMenus'

interface PayableFilterMenuProps {
  type: string
}

const PayableFilterMenu: React.FC<PayableFilterMenuProps> = ({ type }) => {

  const { payableGrid } = useContext(PayableContext);
  const filtersActive = payableGrid?.filters || [];


  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [widthMenu, setWidthMenu] = useState(0)
  const columnHeaderRef = useRef(null)

  const activeButtons = filtersActive.map(f => f?.type);
  const isActiveButton = activeButtons?.find(active => active === type);

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnClick = () => {

    const columnHeader: any = columnHeaderRef.current

    const accountColumnHeader = columnHeader.parentElement;

    const { width } = accountColumnHeader.getBoundingClientRect()

    setWidthMenu(width)
    setAnchorEl(accountColumnHeader)
  }

  return (
    <Box
      ref={columnHeaderRef}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
    >

      <IconButton size='small' onClick={handleOnClick}>
        <Icon
          icon='mdi:filter-variant'
          fontSize={20}
          color={isActiveButton ? '#2535A8' : undefined}
        />
      </IconButton>
      <Menu
        id='account-menu-filter'
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{ style: { minWidth: widthMenu, borderRadius: '10px' } }}
      >
        <PayableSwitcherFilterMenus field={type} handleClose={handleClose} />
      </Menu>
    </Box>
  )
}

export default PayableFilterMenu

// rgba(87, 90, 111, 0.54)
