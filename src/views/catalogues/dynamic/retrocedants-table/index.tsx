// ** React Imports
import { useEffect, useState } from 'react'

//** Next Imports */
import { useRouter } from 'next/router'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColumns, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { useDeleteRetroCedant } from '@/hooks/catalogs/retroCedant/useDelete'
import useGetAllPagination from '@/hooks/catalogs/retroCedant/useGetAllPagination'

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface ICedant {
  id: number
  name: string
}

const RetroCedantsTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [retroCedantList, setRetroCedantList] = useState<ICedant[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)
  const [retroCedantToDelete, setRetroCedantToDelete] = useState(0)

  const router = useRouter()

  //hooks
  const {
    retroCedantPagination,
    setRetroCedantPagination,
    retroCedants,
    getRetroCedantsPagination,
    retroCedantInfoPage
  } = useGetAllPagination()
  const { deleteRetroCedant } = useDeleteRetroCedant()

  const handleSelectCedantEdit = (id: number | null) => {
    router.push({ pathname: '/catalogues/dynamic/add-retrocedants', query: { id } })
  }

  const column: GridColumns<ICedant> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'retroCedantName',
      headerName: 'Retro Cedant Name',
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
            RETRO CEDANT NAME
          </Typography>
        </Box>
      ),
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
        </Box>
      ),

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton
            size='small'
            sx={{ mr: 1 }}
            onClick={() => {
              handleSelectCedantEdit(row.id)
            }}
          >
            <Icon icon='ic:baseline-login' />
          </IconButton>
          <IconButton
            onClick={() => {
              openDeleteModal(+row.id)
            }}
            size='small'
            sx={{ mr: 1 }}
          >
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Box>
      )
    }
  ]

  useEffect(() => {
    setRetroCedantPagination({ ...retroCedantPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setRetroCedantList(retroCedants || [])
  }, [retroCedants])

  const searchRetroCedant = (value: string) => {
    //must be replaced with the respective broker service
    if (value === '') {
      setRetroCedantPagination({
        ...retroCedantPagination,
        filters: [],
        info: { ...retroCedantPagination.info, page: 1 }
      })
    } else {
      setRetroCedantPagination({
        ...retroCedantPagination,
        filters: [{ type: 'name', value: value, text: value }],
        info: { ...retroCedantPagination.info, page: 1 }
      })
    }
  }

  const deleteRows = async () => {
    //must be replaced with the respective broker service
    const result = await deleteRetroCedant({ idDeleteList: selectedRows })
    if (result) {
      //it needs an alert o message
      console.log('success')
      getRetroCedantsPagination({ ...retroCedantPagination })
    }
    setOpenDeleteRows(false)
  }

  const openDeleteModal = (id: number) => {
    setRetroCedantToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleCedant = async () => {
    const result = await deleteRetroCedant({ idDeleteList: [retroCedantToDelete] })
    if (result) {
      //it needs an alert o message
      console.log('success')
      getRetroCedantsPagination({ ...retroCedantPagination })
    }
    setOpenDelete(false)
  }

  const handleDispatch = (e: any, value: number) => {
    setRetroCedantPagination({
      ...retroCedantPagination,
      info: { ...retroCedantPagination.info, page: value }
    })
  }

  return (
    <>
      <div className='outter-wrapper'>
        <TableHeader
          onDeleteRows={() => {
            setOpenDeleteRows(true)
          }}
          deleteBtn={selectedRows.length > 0 ? true : false}
          onSearch={searchRetroCedant}
          textBtn='ADD NEW CEDANT'
          onClickBtn={() => router.push('/catalogues/dynamic/add-retrocedants')}
        />
        <div className='cedant-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={retroCedantList}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...retroCedantInfoPage } }
            }}
            className={'catalogue-datagrid'}
            onSelectionModelChange={rows => setSelectedRows(rows)}
          />
        </div>
      </div>

      <Modal
        className='delete-modal'
        open={openDelete}
        onClose={() => {
          setOpenDelete(false)
        }}
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Are you sure you want to delete this retro cedant?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteSingleCedant}>
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

      <Modal
        className='delete-modal'
        open={openDeleteRows}
        onClose={() => {
          setOpenDeleteRows(false)
        }}
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6' sx={{ maxWidth: '450px' }}>
              Are you sure you want to delete the selected retro cedants?
            </Typography>
            <ButtonClose
              onClick={() => {
                setOpenDeleteRows(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteRows}>
            DELETE
          </Button>
          <Button
            className='close-modal header-modal-btn'
            onClick={() => {
              setOpenDeleteRows(false)
            }}
          >
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default RetroCedantsTable
