// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import colors from 'src/views/accounts/colors'
import Status from 'src/views/accounts/Status'

// ** Fake data
import data from 'src/views/accounts/data'

interface IAccount {
  id: string; 
  status: string; 
  insured: string; 
  lob: string; 
  effectiveDate: string; 
  expirationDate: string;
}

const TableHeader = () => {
  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Select
        size='small'
        displayEmpty
        defaultValue=''
        sx={{ mr: 4, mb: 2 }}
        renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
      >
        <MenuItem disabled>Actions</MenuItem>
        <MenuItem value='DeleteAll'>Delete All</MenuItem>
        <MenuItem value='ChangeStatus'>Change status</MenuItem>
      </Select>

      <Button sx={{ mb: 2 }} variant='contained'>
          ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
      </Button>
    </Box>
  )
}

const Accounts = () => {
  const column: GridColumns<IAccount> = [
    {
      //flex: 0.1,
      field: 'id',
      headerName: 'ACCOUNT ID',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (<Typography sx={{ color: colors.primary.main }}>{`#${row.id}`}</Typography>)
    },
    {
      flex: 0.1,
      field: 'status',
      headerName: 'STATUS',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Status status={row.status}/>
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'insured',
      headerName: 'INSURED',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (
      <Typography sx={{ color: colors.text.primary, fontWeight:500 }}>
        {row.insured}
      </Typography>
    )
    },
    {
      flex: 0.1,
      field: 'lob',
      headerName: 'LOB',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (
        <Typography sx={{ color: colors.text.secondary }}>
          {row.lob}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'effectiveDate',
      headerName: 'EFFECTIVE DATE',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (
        <Typography sx={{ color: colors.text.secondary }}>
          {row.effectiveDate}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'expirationDate',
      headerName: 'EXPIRATION DATE',
      minWidth: 130,
      type: 'string',
      renderCell: ({row}) => (
        <Typography sx={{ color: colors.text.secondary }}>
          {row.expirationDate}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'ACTIONS',
      minWidth: 130,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' sx={{ mr: 0.5 }}>
              <Icon icon='mdi:format-horizontal-align-right' />
            </IconButton>
            <IconButton size='small' sx={{ mr: 0.5 }}>
              <Icon icon='mdi:content-copy' />
            </IconButton>
            <IconButton size='small' sx={{ mr: 0.5 }}>
              <Icon icon='mdi:download' />
            </IconButton>
        </Box>
      )
    },
  ];

  return (
    <Grid item xs={12}>
      <Card>
        <TableHeader/>
        <DataGrid
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          rows={data}
          columns={column}         
        />
      </Card>
    </Grid>
  )
}

export default Accounts
