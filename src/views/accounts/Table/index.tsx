// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColumns
} from '@mui/x-data-grid';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader';
import CustomPagination from './CustomPagination';

//import FilterMenu from './FilterMenu';
import Status from './Status';
import TableHeader from './TableHeader';

// ** Custom utilities
import colors from 'src/views/accounts/colors';
import fonts from 'src/views/accounts/font';

// ** Fake data
import data from 'src/views/accounts/data';

interface IAccount {
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
        renderHeader:({ colDef }) => <ColumnHeader colDef={colDef} />,
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
        renderCell: () => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' sx={{ mr: 1 }}>
                <Icon icon='ic:baseline-login' />
              </IconButton>
              <IconButton size='small' sx={{ mr: 1 }}>
                <Icon icon='mdi:content-copy' />
              </IconButton>
              <IconButton size='small' sx={{ mr: 1 }}>
                <Icon icon='mdi:download' />
              </IconButton>
          </Box>
        )
      },
  ]
  
  return (
      <>
        <TableHeader/>
        <DataGrid
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          rows={data}
          columns={column}         
          pagination
          pageSize={10}
          components={{
            Pagination: CustomPagination,
          }}
          className={'account-datagrid'}
        />
      </>
    )
}

export default Table