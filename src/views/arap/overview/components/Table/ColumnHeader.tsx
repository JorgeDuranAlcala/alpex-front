// ** React Imports
import { useContext, useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { GridStateColDef } from '@mui/x-data-grid/models/colDef'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
// import FilterMenu from 'src/views/accounts/Table/FilterMenu'

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { PaymentsContext } from '../../context/payments/PaymentsContext'
import { EFieldColumn } from './efieldColumn'

interface IColunmHeader {
  colDef: GridStateColDef
  action?: (field: string) => void
  showIcon?: boolean
  type?: string
}

const ColumnHeader: React.FC<IColunmHeader> = ({ colDef, action, showIcon = true, type }) => {
  // ** Props
  const { headerName, field } = colDef
  const { paymentsGrid } = useContext(PaymentsContext);
  const filtersActive = paymentsGrid?.filters || [];


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
    if (!action) {
      return
    }

    const columnHeader: any = columnHeaderRef.current

    const accountColumnHeader = columnHeader.parentElement.parentElement.parentElement.parentElement

    const { width } = accountColumnHeader.getBoundingClientRect()

    if (field === EFieldColumn.TRANSACTION_ID) {
      setWidthMenu(450)
    } else {
      setWidthMenu(width)
    }

    setAnchorEl(accountColumnHeader)
  }

  return (
    <Box
      ref={columnHeaderRef}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
    >
      <Typography
        component={'span'}
        sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
      >
        {headerName}
      </Typography>
      {showIcon && (
        <IconButton size='small' onClick={handleOnClick}>
          <Icon
            icon='mdi:filter-variant'
            fontSize={20}
            color={isActiveButton ? '#2535A8' : undefined}
          />
        </IconButton>
      )}
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
        {/* <FilterMenu field={field} /> */}
      </Menu>
    </Box>
  )
}

export default ColumnHeader

// rgba(87, 90, 111, 0.54)
