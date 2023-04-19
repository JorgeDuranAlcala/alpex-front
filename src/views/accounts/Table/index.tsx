// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import useAccountTable from 'src/hooks/accounts/Table/useAccountTable'

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import Status from './Status'
import TableHeader from './TableHeader'
import ModalAction from './modal'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'



export interface IAccount {
  id: string; 
  status: string; 
  insured: string; 
  lob: string; 
  effectiveDate: string; 
  expirationDate: string;
}


export enum EFieldColumn {
  ACCOUNT_ID = 'id',
  STATUS = 'status',
  INSURED = 'insured',
  LOB = 'lob',
  EFFECTIVE_DATE = 'effectiveDate',
  EXPIRATION_DATE = 'expirationDate',
}

const Table = () => {
  // ** State 
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  // ** Custom Hooks
  const { accounts, getAccounts } = useAccountTable()

  // ** Hooks
  useEffect(()=>{
    getAccounts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleClickColumnHeader = (field: string) => {
    console.log(field);
  }

  const column: GridColumns<IAccount> = [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        headerClassName:'account-column-header-checkbox'
      },
      {
        flex: 0.1,
        field: EFieldColumn.ACCOUNT_ID,
        headerName: 'ACCOUNT ID',
        minWidth:150,
        maxWidth:150,
        type: 'string',
        align:'left',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
        <Typography sx={{ color: colors.primary.main, fontSize:fonts.size.px14, fontFamily:fonts.inter }}>
          {`#${row.id}`}
        </Typography>)
      },
      {
        flex: 0.1,
        field: EFieldColumn.STATUS,
        headerName: 'STATUS',
        minWidth: 150,
        maxWidth: 150,
        type: 'string',
        align:'left',
        cellClassName:'account-column-cell-pl-0',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Status status={row.status}/>
          </Box>
        ),
      },
      {
        flex: 0.1,
        field: EFieldColumn.INSURED,
        headerName: 'INSURED',
        minWidth: 185,
        type: 'string',
        align:'left',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
        <Typography sx={{ color: colors.text.primary, fontWeight:500, fontSize:fonts.size.px14,fontFamily:fonts.inter }}>
          {row.insured}
        </Typography>
      )
      },
      {
        flex: 0.1,
        field: EFieldColumn.LOB,
        headerName: 'LOB',
        minWidth: 170,
        type: 'string',
        align:'left',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
          <Typography sx={{ color: colors.text.secondary, fontSize:fonts.size.px14,fontFamily:fonts.inter }}>
            {row.lob}
          </Typography>
        )
      },
      {
        flex: 0.1,
        field: EFieldColumn.EFFECTIVE_DATE,
        headerName: 'EFFECTIVE DATE',
        minWidth: 165,
        type: 'string',
        align:'left',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
          <Typography sx={{ color: colors.text.secondary, fontSize:fonts.size.px14, fontFamily:fonts.inter }}>
            {row.effectiveDate}
          </Typography>
        )
      },
      {
        flex: 0.1,
        field: EFieldColumn.EXPIRATION_DATE,
        headerName: 'EXPIRATION DATE',
        minWidth: 170,
        type: 'string',
        align:'left',
        disableColumnMenu:true,
        sortable:false,
        headerClassName:'account-column-header',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader}/>,
        renderCell: ({row}) => (
          <Typography sx={{ color: colors.text.secondary, fontSize:fonts.size.px14, fontFamily:fonts.inter }}>
            {row.expirationDate}
          </Typography>
        )
      },
      {
        flex: 0.1,
        field: 'actions',
        headerName: 'ACTIONS',
        minWidth: 150,
        sortable: false,
        disableColumnMenu:true,
        cellClassName:'account-column-cell-pl-0',
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false}/>,
        renderCell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' sx={{ mr: 1 }}>
                      <Icon icon='ic:baseline-login' />
                    </IconButton>
              <ModalAction
                renderButton={
                  (handleOpen: ()=>void) => (
                    <IconButton onClick={handleOpen} size='small' sx={{ mr: 1 }}>
                      <Icon icon='mdi:content-copy' />
                    </IconButton>
                  )
                }
                headingText={`You are about to duplicate: #${row.id} ${row.insured} ${row.effectiveDate}`}
                text='With this action you’ll have two accounts with the same information as it is right now. Do you want to proceed?'
                handleClickContinue={()=>{console.log('Continue')}}
                handleClickCancel={()=>{console.log('Cancel')}}
              />
              
              <IconButton size='small' sx={{ mr: 1 }}>
                <Icon icon='mdi:download' />
              </IconButton>
          </Box>
        )
      },
  ]
  
  return (
      <>
        <TableHeader  selectedRows={selectedRows}/>
        <DataGrid
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          rows={accounts}
          columns={column}         
          pagination
          pageSize={10}
          components={{
            Pagination: CustomPagination,
          }}
          className={'account-datagrid'}
          onSelectionModelChange={rows => setSelectedRows(rows)}
        />
      </>
    )
}

export default Table