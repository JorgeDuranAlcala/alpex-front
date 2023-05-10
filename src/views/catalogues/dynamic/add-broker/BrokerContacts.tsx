// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports

// ** Custom Hooks imports

// ** Custom Components Imports
import CustomPagination from '../CustomPagination'
import TableHeader from '../TableHeader'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IContact {
  id: string
  name: string
  phone: string
  email: string
  country: string
}


const BrokerContacts = () => {
  // ** State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [contactList, setContactList] = useState<IContact[]>([])

  const column: GridColumns<IContact> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: 'contact-name ',
      headerName: 'CONTACT NAME',
      minWidth: 300,
      maxWidth: 300,
      type: 'string',
      align: 'left',
      sortable: false,
      headerClassName: ' broker-contacts-header',
      renderHeader: () =>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            CONTACT NAME
          </Typography>

        </Box> ,
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: "phone-number",
      headerName: 'PHONE NUMBER',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            PHONE NUMBER
          </Typography>

        </Box> ),
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {row.phone}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: 'email',
      headerName: 'EMAIL',
      minWidth: 100,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () =>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            EMAIL
          </Typography>

        </Box> ,
        renderCell: ({ row }) => (
        <Typography
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px14, fontFamily: fonts.inter }}
        >
            {row.email}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'country',
      headerName: 'COUNTRY',
      minWidth: 100,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'broker-contacts-header',
      renderHeader: () => <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
      <Typography
          component={'span'}
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
        >
          COUNTRY
        </Typography>

      </Box> ,
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.country}
        </Typography>
      )
    },


  ]

  const getContactList = () => { //must be replaced with the respective broker service
    const data: IContact[] = []

    for (let index = 1; index <= 100; index++) {
      const id = index.toString()
      const name = `Contact ${index}`

      data.push({
        id,
        name,
        phone: '2221334455',
        email: 'user@mail.com',
        country: 'México'
      })
    }

    return data
  }

  const searchContacts = (value: string)=>{ //must be replaced with the respective broker service
    console.log("Call search service", value)
  }

  useEffect(() => {
    setContactList(getContactList)
    //eslint-disable-next-line
  }, [])


  return (
    <>
     <div className='contacts-wrapper'>
      <div className='title'>Contacts</div>
      <div className='description'>
        Here you will find the contacts linked
        to this specific Broker, you can add one
        or more contacts.
      </div>
      <div className='contact-list'>
        <TableHeader onSearch={searchContacts}/>
        <DataGrid
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          rows={contactList}
          columns={column}
          pagination
          pageSize={10}
          components={{
            Pagination: CustomPagination
          }}
          className={'catalogue-datagrid'}
          onSelectionModelChange={rows => setSelectedRows(rows)}
        />
      </div>

      </div>


    </>
  )
}

export default BrokerContacts
