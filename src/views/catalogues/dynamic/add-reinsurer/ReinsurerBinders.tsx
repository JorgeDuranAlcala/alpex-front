// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControl, IconButton, Modal, TextField, Typography } from '@mui/material'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'

import FormHelperText from '@mui/material/FormHelperText'

// ** Custom Imports
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import { useAddReinsuranceCompanyBinder } from '@/hooks/catalogs/reinsuranceCompanyBinder/useAdd'
import { useDeleteReinsuranceCompanyBinder } from '@/hooks/catalogs/reinsuranceCompanyBinder/useDelete'
import useGetAllByIdReinsuranceCompanyAndPagination from '@/hooks/catalogs/reinsuranceCompanyBinder/useGetAllByIdReinsuranceAndPagination'
import { useUpdateById } from '@/hooks/catalogs/reinsuranceCompanyBinder/useUpdateById'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IBinder {
  id: number
  referenceNumber: string
  idCReinsuranceCompany?: number
}

const initialData: IBinder = {
  id: 0,
  referenceNumber: '',
  idCReinsuranceCompany: 0
}

interface IReinsuranceCompanyBinders {
  idReinsuranceCompany: number
}

const ReinsurerBinders = ({ idReinsuranceCompany }: IReinsuranceCompanyBinders) => {
  // ** State

  // Handle Data
  const [binderData, setBinderData] = useState<IBinder>(initialData)
  const [currentBinder, setCurrentBinder] = useState<IBinder>(initialData)
  const [selectedRow, setSelectedRow] = useState<IBinder | null>(null)
  const [binderToDelete, setBinderToDelete] = useState<number>(0)

  //Handle View
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [btnDisable, setBtnDisable] = useState(true)
  const [btnEditDisable, setBtnEditDisable] = useState(true)

  // Handle new binder validations
  const [startValidations, setStartValidations] = useState(false)
  const [error, setError] = useState(true)

  //Handle edit binder validations
  const [startEditValidations, setStartEditValidations] = useState(false)
  const [errorEdit, setErrorEdit] = useState(true)

  // Handle modals
  const [openNewBinder, setOpenNewBinder] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)

  // Handle alerts
  const [showAlert, setShowAlert] = useState(true)
  const [alertType, setAlertType] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertIcon, setAlertIcon] = useState('')

  //hooks
  const { deleteReinsuranceCompanyBinder } = useDeleteReinsuranceCompanyBinder()
  const { saveReinsuranceCompanyBinder } = useAddReinsuranceCompanyBinder()
  const { update } = useUpdateById()
  const {
    reinsuranceCompanyBindersPagination,
    reinsuranceCompanyBinders,
    setReinsuranceCompanyBindersPagination,
    getReinsuranceCompanyBindersByIdReinsuranceCompany,
    reinsuranceCompanyBinderInfoPage
  } = useGetAllByIdReinsuranceCompanyAndPagination()

  useEffect(() => {
    idReinsuranceCompany != 0 &&
      setReinsuranceCompanyBindersPagination({
        ...reinsuranceCompanyBindersPagination,
        idCReinsuranceCompany: idReinsuranceCompany
      })
    //eslint-disable-next-line
  }, [idReinsuranceCompany])

  const column: GridColumns<IBinder> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'contact-name ',
      headerName: 'REFERENCE NUMBER',
      minWidth: 170,
      type: 'string',
      align: 'left',
      sortable: false,
      headerClassName: ' broker-contacts-header',
      renderHeader: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            REFERENCE NUMBER
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: fonts.size.px14, fontFamily: fonts.inter }}>{row.referenceNumber}</Typography>
      )
    },
    {
      flex: 0.1,
      field: 'actions',
      headerName: 'Actions',
      minWidth: 70,
      maxWidth: 70,
      sortable: false,
      align: 'right',
      disableColumnMenu: true,
      cellClassName: 'catalogue-column-cell-pl-0',
      renderHeader: ({}) => (
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
        ></Box>
      ),

      renderCell: ({ row }) => {
        const showActions = row === selectedRow

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div className='actions-wrapper'>
              <IconButton
                onClick={() => {
                  if (showActions) {
                    setSelectedRow(null)
                  } else {
                    setSelectedRow(row)
                  }
                }}
                size='small'
                sx={{ mr: 1 }}
              >
                <Icon icon='mdi:dots-vertical' />
              </IconButton>
              {showActions && (
                <div className='actions-menu'>
                  <div className='menu-option' onClick={() => handleEditBinder(row)}>
                    Edit
                  </div>
                  <div className='menu-option' onClick={() => handleDeleteBinder(row.id)}>
                    Delete
                  </div>
                </div>
              )}
            </div>
          </Box>
        )
      }
    }
  ]

  const triggerAlert = (type: string, text?: string) => {
    setAlertType(type)

    switch (type) {
      case 'success-alert':
        setAlertText(text || 'NEW BINDER ADDED')
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

  const handleChangeModal = (field: keyof IBinder, value: any) => {
    setStartValidations(true)
    setBinderData({ ...binderData, [field]: value })
  }

  const handleDeleteBinder = (id: number) => {
    setBinderToDelete(id)
    setSelectedRow(null)
    setOpenDelete(true)
  }

  const handleEditBinder = (row: IBinder) => {
    console.log(row)
    setCurrentBinder(row)
    setSelectedRow(null)
    setOpenEdit(true)
  }

  const searchBinders = (value: string) => {
    if (value === '') {
      setReinsuranceCompanyBindersPagination({
        ...reinsuranceCompanyBindersPagination,
        filters: [],
        info: { ...reinsuranceCompanyBindersPagination.info, page: 1 }
      })
    } else {
      setReinsuranceCompanyBindersPagination({
        ...reinsuranceCompanyBindersPagination,
        filters: [{ type: 'referenceNumber', value: value, text: value }],
        info: { ...reinsuranceCompanyBindersPagination.info, page: 1 }
      })
    }
  }

  const editBinder = async () => {
    const result = await update(currentBinder.id, {
      ...currentBinder,
      idCReinsuranceCompany: idReinsuranceCompany
    })
    if (result) {
      triggerAlert('success', 'CHANGES SAVED')
      getReinsuranceCompanyBindersByIdReinsuranceCompany(reinsuranceCompanyBindersPagination)
    }
    setOpenEdit(false)
  }

  const deleteBinder = async () => {
    const result = await deleteReinsuranceCompanyBinder({ idDeleteList: [binderToDelete] })
    if (result) {
      getReinsuranceCompanyBindersByIdReinsuranceCompany(reinsuranceCompanyBindersPagination)
      triggerAlert('success', 'DELETED')
    }
    setOpenDelete(false)
  }

  const deleteRows = async () => {
    const result = await deleteReinsuranceCompanyBinder({ idDeleteList: selectedRows })
    if (result) {
      getReinsuranceCompanyBindersByIdReinsuranceCompany(reinsuranceCompanyBindersPagination)
      triggerAlert('success', 'DELETED')
    }
    setOpenDeleteRows(false)
  }

  const handleCreateBinder = async () => {
    const result = await saveReinsuranceCompanyBinder({
      ...binderData,
      idCReinsuranceCompany: idReinsuranceCompany
    })
    if (result) {
      triggerAlert('success-alert')
      setBinderData(initialData)
      getReinsuranceCompanyBindersByIdReinsuranceCompany(reinsuranceCompanyBindersPagination)
    }
    setOpenNewBinder(false)
    triggerAlert('success-alert')
  }

  useEffect(() => {
    if (binderData.referenceNumber == undefined) {
      setError(true)
    }

    if (startValidations) {
      if (binderData.referenceNumber.length < 14) {
        setError(true)
      } else {
        setError(false)
      }
    }
    if (error) setBtnDisable(true)
    else if (!error) setBtnDisable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binderData.referenceNumber, error])

  useEffect(() => {
    if (currentBinder) {
      if (currentBinder.referenceNumber == undefined) {
        setErrorEdit(true)
      }

      if (startEditValidations) {
        if (currentBinder.referenceNumber.length < 14) {
          setErrorEdit(true)
        } else {
          setErrorEdit(false)
        }
      }
      if (errorEdit) setBtnEditDisable(true)
      else if (!errorEdit) setBtnEditDisable(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBinder?.referenceNumber, errorEdit])

  const handleDispatch = (e: any, value: number) => {
    setReinsuranceCompanyBindersPagination({
      ...reinsuranceCompanyBindersPagination,
      info: { ...reinsuranceCompanyBindersPagination.info, page: value }
    })
  }

  return (
    <>
      <div className='contacts-wrapper'>
        <div className='title'>Binder</div>
        <div className='description'>
          Here you will find the Binders linked to this specific Reinsurer, you can add one or more Binders.
        </div>
        <div className='table-header'>
          <TableHeader
            onSearch={searchBinders}
            onDeleteRows={() => {
              setOpenDeleteRows(true)
            }}
            deleteBtn={selectedRows.length > 0 ? true : false}
            textBtn='ADD BINDER'
            onClickBtn={() => {
              setOpenNewBinder(true)
            }}
            addBtnDisable={idReinsuranceCompany === 0}
          />
          {showAlert && (
            <div className={`${alertType} contacts-alert`}>
              <div className='btn-icon'>
                <Icon icon={alertIcon} />
              </div>
              {alertText}
            </div>
          )}
        </div>

        <div className='contact-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={reinsuranceCompanyBinders}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...reinsuranceCompanyBinderInfoPage } }
            }}
            className={'catalogue-datagrid'}
            onSelectionModelChange={rows => {
              setSelectedRows(rows)
              console.log(selectedRows.length)
            }}
          />
        </div>
      </div>
      <Modal className='create-contact-modal' open={openNewBinder} onClose={() => setOpenNewBinder(false)}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Add Binder</Typography>
            <ButtonClose onClick={() => setOpenNewBinder(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                className='reference-number'
                label='Reference Number'
                value={binderData.referenceNumber}
                onChange={e => handleChangeModal('referenceNumber', e.target.value)}
              />

              {error && <FormHelperText sx={{ color: 'error.main' }}>Invalid Reference Number</FormHelperText>}
            </FormControl>
          </div>
          <Button
            className='create-contact-modal'
            disabled={btnDisable}
            variant='contained'
            onClick={handleCreateBinder}
          >
            CREATE
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpenNewBinder(false)}>
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
              Are you sure you want to delete the selected Binders?
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

      <Modal
        className='delete-modal'
        open={openDelete}
        onClose={() => {
          setOpenDelete(false)
        }}
      >
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6' sx={{ maxWidth: '450px' }}>
              Are you sure you want to delete this Binder?
            </Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteBinder}>
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
      <Modal className='create-contact-modal' open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box className='modal-wrapper'>
          <HeaderTitleModal>
            <Typography variant='h6'>Add Binder</Typography>
            <ButtonClose onClick={() => setOpenEdit(false)}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='contact-form'>
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                className='reference-number'
                label='Reference Number'
                value={currentBinder?.referenceNumber}
                onChange={e => {
                  setCurrentBinder({ id: currentBinder?.id, referenceNumber: e.target.value })
                  setStartEditValidations(true)
                }}
              />

              {errorEdit && <FormHelperText sx={{ color: 'error.main' }}>Invalid Reference Number</FormHelperText>}
            </FormControl>
          </div>
          <Button className='create-contact-modal' disabled={btnEditDisable} variant='contained' onClick={editBinder}>
            EDIT
          </Button>
          <Button className='create-contact-modal' onClick={() => setOpenEdit(false)}>
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ReinsurerBinders
