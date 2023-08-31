// ** React Imports
import { useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { GridStateColDef } from '@mui/x-data-grid/models/colDef'

// import { useAppSelector } from 'src/store'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
import FilterMenu from '@/views/dynamic-data/property-listing/filter-menu'
import { EFieldColumn } from '.'
import colors from './colors'
import fonts from './font'

interface IColunmHeader {
  colDef: GridStateColDef
  action?: (field: string) => void
  showIcon?: boolean
  type?: string | undefined
}

const ColumnHeader: React.FC<IColunmHeader> = ({ colDef, action, showIcon = true, type }) => {
  // ** Props
  const { headerName, field } = colDef

  // const accountsReducer = useAppSelector(state => state.accounts)
  // const filterActive = accountsReducer?.filters

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [widthMenu, setWidthMenu] = useState(0)
  const columnHeaderRef = useRef(null)

  // const activeButton = filterActive.map(f => f?.type)

  // const buttonIdProperty = activeButton?.find(active => active === 'idProperty')
  // const buttonValfis = activeButton?.find(active => active === 'valfis')
  // const buttonNomEnt = activeButton?.find(active => active === 'nomEnt')
  // const buttonNomMun = activeButton?.find(active => active === 'nomMun')
  // const buttonTypology = activeButton?.find(active => active === 'typology')
  // const buttonZonacresta = activeButton?.find(active => active === 'zonacresta')

  const buttonIdProperty =  'idProperty'
  const buttonValfis =  'valfis'
  const buttonNomEnt =  'nomEnt'
  const buttonNomMun =  'nomMun'
  const buttonTypology =  'typology'
  const buttonZonacresta =  'zonacresta'

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

    if (field === EFieldColumn.PROPERTY_ID || field === EFieldColumn.VALFIS || field === EFieldColumn.TYPOLOGY ) {
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
          {type === 'idProperty' ? (
            <Icon
              icon='mdi:filter-variant'
              fontSize={20}
              color={buttonIdProperty === 'idProperty' ? '#2535A8' : undefined}
            />
          ) : type === 'valfis' ? (
            <Icon icon='mdi:filter-variant' fontSize={20} color={buttonValfis === 'valfis' ? '#2535A8' : undefined} />
          ) : type === 'nomEnt' ? (
            <Icon icon='mdi:filter-variant' fontSize={20} color={buttonNomEnt === 'nomEnt' ? '#2535A8' : undefined} />
          ) : type === 'nomMun' ? (
            <Icon
              icon='mdi:filter-variant'
              fontSize={20}
              color={buttonNomMun === 'nomMun' ? '#2535A8' : undefined}
            />
          ) : type === 'typology' ? (
            <Icon
              icon='mdi:filter-variant'
              fontSize={20}
              color={buttonTypology === 'typology' ? '#2535A8' : undefined}
            />
          ) : type === 'zonacresta' ? (
            <Icon
              icon='mdi:filter-variant'
              fontSize={20}
              color={buttonZonacresta === 'zonacresta' ? '#2535A8' : undefined}
            />
          ) : null}
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
        <FilterMenu field={field} />
      </Menu>
    </Box>
  )
}

export default ColumnHeader

// rgba(87, 90, 111, 0.54)
