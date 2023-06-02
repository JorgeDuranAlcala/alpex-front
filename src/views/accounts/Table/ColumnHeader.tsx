// ** React Imports
import { useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { GridStateColDef } from '@mui/x-data-grid/models/colDef'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
import FilterMenu from 'src/views/accounts/Table/FilterMenu'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { EFieldColumn } from '.'

interface IColunmHeader {
  colDef: GridStateColDef
  action?: (field: string) => void
  showIcon?: boolean
}

const ColumnHeader: React.FC<IColunmHeader> = ({ colDef, action, showIcon = true }) => {
  // ** Props
  const { headerName, field } = colDef

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [widthMenu, setWidthMenu] = useState(0)

  const columnHeaderRef = useRef(null)

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

    if (field === EFieldColumn.ACCOUNT_ID || field === EFieldColumn.INSURED) {
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
          <Icon icon='mdi:filter-variant' fontSize={20} color={!open ? 'grey' : anchorEl ? '#2535A8' : undefined} />
        </IconButton>
      )}
      <Menu
        id='account-menu-filter'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{ style: { minWidth: widthMenu, borderRadius: '10px' } }}
      >
        <FilterMenu field={field} />
      </Menu>
    </Box>
  )
}

export default ColumnHeader
