// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns, GridRowId } from '@mui/x-data-grid'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

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
  const [brokerList, setBrokerList] = useState<IBroker[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [brokerToDelete, setBrokerToDelete] = useState(0)
  const [badgeData] = useState<IAlert>({
    message: '',
    status: undefined,
    icon: undefined
  })


  const column: GridColumns<IBroker> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.5,
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
          BROKER NAME
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
      align: 'right',
      disableColumnMenu: true,
      cellClassName: 'catalogue-column-cell-pl-0',
      renderHeader: ({}) => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
      <Typography
        component={'span'}
        sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
      >
        ACTIONS
      </Typography>

    </Box>),

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
          <IconButton size='small' sx={{ mr: 1 }}>
            <Icon icon='ic:baseline-login' />
          </IconButton>
          <IconButton
            onClick={() => {
              openDeleteModal(+row.id)
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

  const getBrokerList = () => {    // En este metodo se llama al servicio broker list.
    const data: IBroker[] = []

    for (let index = 1; index <= 100; index++) {
      const id = index.toString()
      const name = `Broker ${index}`

      data.push({
        id,
        name
      })
    }

    return data
  }

  const openDeleteModal = (id: number)=>{
    setBrokerToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleBroker = () => {    // En este metodo se llama al servicio delete broker.
    const newBrokerList = brokerList.filter(broker => broker.id !== brokerToDelete.toString())
    setBrokerList(newBrokerList)
    setOpenDelete(false)
  }

  useEffect(() => {
    setBrokerList(getBrokerList)
    //eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   setAccounts(accountsReducer.accounts || [])

  //   console.log(loading)
  //   setLoading(accountsReducer.loading)
  //   //eslint-disable-next-line
  // }, [accountsReducer])

  return (
    <>
      <TableHeader selectedRows={selectedRows} badgeData={badgeData} />
      <DataGrid
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        rows={brokerList}
        columns={column}
        pagination
        pageSize={10}
        components={{
          Pagination: CustomPagination
        }}
        className={'catalogue-datagrid'}
        onSelectionModelChange={rows => setSelectedRows(rows)}
      />
      <Modal
                className='delete-modal'
                open={openDelete}
                onClose={() => {
                  setOpenDelete(false)
                }}
              >
                <Box className='modal-wrapper'>
                  <HeaderTitleModal>
                    <Typography variant='h6'>Are you sure you want to delete this account?</Typography>
                    <ButtonClose
                      onClick={() => {
                        setOpenDelete(false)
                      }}
                    >
                      <CloseIcon />
                    </ButtonClose>
                  </HeaderTitleModal>
                  <div className='delete-modal-text'>This action can’t be undone.</div>
                  <Button className='header-modal-btn' variant='contained' onClick={deleteSingleBroker}>
                    DELETE
                  </Button>
                  <Button
                    className='close-modal header-modal-btn'
                    onClick={() => {
                      setOpenDelete(false)
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </Modal>
    </>
  )
}

export default Table
