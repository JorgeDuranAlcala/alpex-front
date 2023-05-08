// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import useCataloguesTable from 'src/hooks/catalogue/table/useCatalogueTable'

// ** Custom Components Imports
import CustomPagination from './CustomPagination'
import TableHeader from './TableHeader'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { IAlert } from 'src/views/custom/alerts'

export interface IBroker {
  id:string
  name: string
}


const Table = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [accounts, setAccounts] = useState<any>([])
  const [badgeData] = useState<IAlert>({
    message: '',
    status: undefined,
    icon: undefined
  })

  // const [loading, setLoading] = useState<any>([])

  // **Reducers
  // const accountsReducer = useAppSelector(state => state.accounts)

  // ** Custom Hooks
  const { getAccounts } = useCataloguesTable()

  // ** Hooks


  useEffect(() => {
    setAccounts(getAccounts)
    //eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   setAccounts(accountsReducer.accounts || [])

  //   console.log(loading)
  //   setLoading(accountsReducer.loading)
  //   //eslint-disable-next-line
  // }, [accountsReducer])

  const column: GridColumns<IBroker> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: 'brokerName',
      headerName: 'Broker Name',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'catalogue-column-header',
      renderHeader: ({}) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography
          component={'span'}
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
        >
          Broker Name
        </Typography>

      </Box>),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'ACTIONS',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'catalogue-column-cell-pl-0',
      renderHeader: ({}) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
      <Typography
        component={'span'}
        sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
      >
        Broker Name
      </Typography>

    </Box>),

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' sx={{ mr: 1 }}>
            <Icon icon='ic:baseline-login' />
          </IconButton>
          <IconButton
            onClick={() => {
              onDelete(+row.id)
            }}
            size='small'
            sx={{ mr: 1 }}
          >
            <Icon icon='mdi:delete' />
          </IconButton>
        </Box>
      )
    }
  ]

  const onDelete = (id: number) => {
      console.log("Delete broker",id)
  }

  return (
    <>
      <TableHeader selectedRows={selectedRows} badgeData={badgeData} />
      <DataGrid
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        rows={accounts}
        columns={column}
        pagination
        pageSize={10}
        components={{
          Pagination: CustomPagination
        }}
        className={'catalogue-datagrid'}
        onSelectionModelChange={rows => setSelectedRows(rows)}
      />
    </>
  )
}

export default Table
