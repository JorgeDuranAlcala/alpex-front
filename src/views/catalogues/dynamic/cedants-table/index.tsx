// ** React Imports
import { useEffect, useState } from 'react'

//** Next Imports */
import { useRouter } from 'next/router'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import { useDeleteCedant } from '@/hooks/catalogs/cedant/useDelete'
import useGetAllPagination from '@/hooks/catalogs/cedant/useGetAllPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface ICedant {
  id: number
  name: string
}

const CedantsTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [cedantList, setCedantList] = useState<ICedant[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)
  const [cedantToDelete, setCedantToDelete] = useState(0)

  //hooks
  const { cedantPagination, setCedantPagination, cedants, getCedantsPagination, cedantInfoPage } = useGetAllPagination()
  const { deleteCedant } = useDeleteCedant()

  // Handle Alerts
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  const router = useRouter()

  // const [badgeData] = useState<IAlert>({
  //   message: '',
  //   status: undefined,
  //   icon: undefined
  // })

  const column: GridColumns<ICedant> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'cedantName',
      headerName: 'Cedant Name',
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
            CEDANT NAME
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
    setCedantPagination({ ...cedantPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCedantList(cedants || [])
  }, [cedants])

  const triggerAlert = (type: string, text: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText(text)
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error-alert':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn-alert':
        setAlertText('NO INTERNET CONNECTION')
        setAlertIcon('mdi:alert-outline')
        break
      default:
        break
    }

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  const handleSelectCedantEdit = (id: number | null) => {
    router.push({ pathname: '/catalogues/dynamic/add-cedants', query: { id } })
  }

  const searchCedant = (value: string) => {
    if (value === '') {
      setCedantPagination({ ...cedantPagination, filters: [], info: { ...cedantPagination.info, page: 1 } })
    } else {
      setCedantPagination({
        ...cedantPagination,
        filters: [{ type: 'name', value: value, text: value }],
        info: { ...cedantPagination.info, page: 1 }
      })
    }
  }

  const deleteRows = async () => {
    const result = await deleteCedant({ idDeleteList: selectedRows })
    if (result) {
      getCedantsPagination({ ...cedantPagination })
      triggerAlert('success', 'DELETED')
    }
    setOpenDeleteRows(false)
  }

  const openDeleteModal = (id: number) => {
    setCedantToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleCedant = async () => {
    const result = await deleteCedant({ idDeleteList: [cedantToDelete] })
    if (result) {
      getCedantsPagination({ ...cedantPagination })
      triggerAlert('success', 'DELETED')
    }
    setOpenDelete(false)
  }

  const handleDispatch = (e: any, value: number) => {
    setCedantPagination({
      ...cedantPagination,
      info: { ...cedantPagination.info, page: value }
    })
  }

  return (
    <>
      <div className='outter-wrapper'>
        {/* TODO:  */}
        {showAlert && (
          <div className={`${alertType} catalogue-item-alert`}>
            <div className='btn-icon'>
              <Icon icon={alertIcon} />
            </div>
            {alertText}
          </div>
        )}
        <TableHeader
          onDeleteRows={() => {
            setOpenDeleteRows(true)
          }}
          deleteBtn={selectedRows.length > 0 ? true : false}
          onSearch={searchCedant}
          textBtn='ADD NEW CEDANT'
          onClickBtn={() => router.push('/catalogues/dynamic/add-cedants')}
        />
        <div className='cedant-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={cedantList}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...cedantInfoPage } }
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
            <Typography variant='h6'>Are you sure you want to delete this cedant?</Typography>
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
              Are you sure you want to delete the selected Cedants?
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

export default CedantsTable
