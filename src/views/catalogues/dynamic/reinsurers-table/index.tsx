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
import { useDeleteReinsuranceCompany } from '@/hooks/catalogs/reinsuranceCompany/useDelete'
import useGetAllPagination from '@/hooks/catalogs/reinsuranceCompany/useGetAllPagination'

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IReinsurer {
  id: number
  name: string
}

const ReinsurersTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [reinsuranceCompanyList, setReinsuranceCompanyList] = useState<IReinsurer[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)
  const [reinsuranceCompanyToDelete, setReinsuranceCompanyToDelete] = useState(0)

  const router = useRouter()

  //hooks
  const {
    reinsuranceCompanyPagination,
    setReinsuranceCompanyPagination,
    reinsuranceCompanys,
    getReinsuranceCompanysPagination,
    reinsuranceCompanyInfoPage
  } = useGetAllPagination()
  const { deleteReinsuranceCompany: deleteReinsuranceCompanys } = useDeleteReinsuranceCompany()

  // Handle Alerts
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  useEffect(() => {
    setReinsuranceCompanyPagination({ ...reinsuranceCompanyPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setReinsuranceCompanyList(reinsuranceCompanys || [])
  }, [reinsuranceCompanys])

  const column: GridColumns<IReinsurer> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'reinsurerName',
      headerName: 'Reinsurer Name',
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
            REINSURER NAME
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
              handleSelectReinsuranceCompanyEdit(row.id)
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

  const triggerAlert = (type: string, text: string) => {
    setAlertType(type)

    switch (type) {
      case 'success':
        setAlertText(text)
        setAlertIcon('mdi:check-circle-outline')
        break
      case 'error':
        setAlertText('UNKNOWN ERROR, TRY AGAIN')
        setAlertIcon('mdi:alert-circle-outline')
        break
      case 'warn':
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

  const handleSelectReinsuranceCompanyEdit = (id: number | null) => {
    router.push({ pathname: '/catalogues/dynamic/add-reinsurer', query: { id } })
  }

  const searchReinsurer = (value: string) => {
    if (value === '') {
      setReinsuranceCompanyPagination({
        ...reinsuranceCompanyPagination,
        filters: [],
        info: { ...reinsuranceCompanyPagination.info, page: 1 }
      })
    } else {
      setReinsuranceCompanyPagination({
        ...reinsuranceCompanyPagination,
        filters: [{ type: 'name', value: value, text: value }],
        info: { ...reinsuranceCompanyPagination.info, page: 1 }
      })
    }
  }

  const deleteRows = async () => {
    const result = await deleteReinsuranceCompanys({ idDeleteList: selectedRows })
    if (result) {
      getReinsuranceCompanysPagination({ ...reinsuranceCompanyPagination })
      triggerAlert('success', 'DELETED')
    }
    setOpenDeleteRows(false)
  }

  const openDeleteModal = (id: number) => {
    setReinsuranceCompanyToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleReinsuranceCompany = async () => {
    const result = await deleteReinsuranceCompanys({ idDeleteList: [reinsuranceCompanyToDelete] })
    if (result) {
      getReinsuranceCompanysPagination({ ...reinsuranceCompanyPagination })
      triggerAlert('success', 'DELETED')
    }
    setOpenDelete(false)
  }

  const handleDispatch = (e: any, value: number) => {
    setReinsuranceCompanyPagination({
      ...reinsuranceCompanyPagination,
      info: { ...reinsuranceCompanyPagination.info, page: value }
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
          onSearch={searchReinsurer}
          textBtn='ADD NEW REINSURER'
          onClickBtn={() => router.push('/catalogues/dynamic/add-reinsurer')}
        />
        <div className='reinsurer-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={reinsuranceCompanyList}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...reinsuranceCompanyInfoPage } }
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
            <Typography variant='h6'>Are you sure you want to delete this reinsurer?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteSingleReinsuranceCompany}>
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
              Are you sure you want to delete the selected Reinsurers?
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

export default ReinsurersTable
