
// ** React Imports
import { useEffect, useState, useContext } from 'react'

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
import { useDeleteBank } from 'src/hooks/catalogs/bank/useDelete'

// ** Custom Components Imports
import CustomPagination from '../CustomPaginationImpl'
import TableHeader from '../TableHeader'

// ** Custom utilities
import useGetAllPagination from '@/hooks/catalogs/bank/useGetAllPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

// context

import { DynamicContext } from 'src/context/dynamic/reducer';
import DynamicActionTypes from 'src/context/dynamic/actionTypes';

import toast from 'react-hot-toast'

// bank


export interface IBank {
  id: number
  capacity: string;
  bank: string;
  beneficiary: string;
  accountNumber: number;
  swift: string;
  aba: number;
  clabe: number;
  intermediary: string;
  idCCurrency?: {
      id: number;
      code: string;
      name: string;
      active: boolean;
      country: string;
      createdAt: string;
      updatedAt: string;
  } | undefined;
  idCLocation?: {
      id: number;
      name: string;
      createdAt: string;
      active: boolean;
  } | undefined;
  furtherAccountInfo: string;
  active: boolean,
  createdAt: string,
  updatedAt: string,
}

const BanksTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [banksList, setBanksList] = useState<IBank[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)
  const [bankToDelete, setBankToDelete] = useState(0)

  

  //hooks
  const {
    banksPagination,
    setBanksPagination,
    banks,
    bankInfoPage,
    getBanksPagination
  } = useGetAllPagination()

  const { deleteBank } = useDeleteBank()


  // context

  const { dispatch } = useContext(DynamicContext);


  const router = useRouter()


  const column: GridColumns<IBank> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'catalogue-column-header-checkbox'
    },
    {
      flex: 0.5,
      field: 'nro',
      headerName: 'NO.',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'catalogue-column-header',
      renderHeader: ({ }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            NO.
          </Typography>
        </Box>
      ),
      renderCell: (params) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {String(params.api.getRowIndex(params.row.id) + 1).padStart(2, "0")}
        </Typography>
      )
    },
    {
      flex: 0.5,
      field: 'bank',
      headerName: 'BANK',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'catalogue-column-header',
      renderHeader: ({ }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            BANK
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.bank}
        </Typography>
      )
    },
    {
      flex: 0.5,
      field: 'location',
      headerName: 'Location',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'catalogue-column-header',
      renderHeader: ({ }) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Typography
            component={'span'}
            sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
          >
            Location
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.idCLocation ? row.idCLocation.name : "None"}
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
      renderHeader: ({ }) => (
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
            onClick={() => {
              handleSelectEdit(row.id)
            }}
            size='small'
            sx={{ mr: 1 }}
          >
            <Icon icon='mdi:pencil' />
          </IconButton>
          <IconButton
            size='small'
            sx={{ mr: 1 }}
            onClick={() => {
              handleSelectEdit(row.id)
            }}
          >
            <Icon icon='ic:baseline-login' />
          </IconButton>
          <IconButton
            onClick={() => {
              openDeleteModal(row.id)
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
    setBanksList(banks || [])
  }, [banks])

  const handleSelectEdit = (id: number | null) => {
    router.push({ pathname: '/catalogues/dynamic/update-bank', query: { id } })
  }


  const deleteRows = async () => {
    Promise.all(selectedRows.map(async (id) => await deleteBank(id)))
    .then(() => {
      getBanksPagination({ ...banksPagination });
      toast.success("all rows deleted")
    })
    .catch(error => toast.error(error.message))
    setOpenDeleteRows(false)
  }

  const openDeleteModal = (id: number) => {
    setBankToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleBank = async () => {
    dispatch({ type: DynamicActionTypes.REMOVE_BANK, payload: { id: bankToDelete } })
    deleteBank(bankToDelete)
    .then(() => {
      getBanksPagination({ ...banksPagination });
      toast.success("Row deleted")
    })
    .catch(error => toast.error(error.message))
    setOpenDelete(false)
  }

  const handleDispatch = (e: any, value: number) => {
    setBanksPagination({
      ...banksPagination,
      info: { ...bankInfoPage, page: value }
    })
  }

  const onSearchBank = (value: string) => {
    /* TODO */
    console.log("SEARCH", value)
  }

  return (
    <>
      <div className='outter-wrapper'>
        <TableHeader
          onDeleteRows={() => {
            setOpenDeleteRows(true)
          }}
          onSearch={onSearchBank}
          deleteBtn={selectedRows.length > 0 ? true : false}
          textBtn='ADD BANK ACCOUNT'
          onClickBtn={() => router.push('/catalogues/dynamic/add-bank')}
        />
        <div className='bank-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={banksList}
            columns={column}
            pagination
            pageSize={bankInfoPage.take}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...bankInfoPage } }
            }}
            className={'catalogue-datagrid'}
            onSelectionModelChange={(rows: any[]) => setSelectedRows(rows)}
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
            <Typography variant='h6'>Are you sure you want to delete this Bank?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteSingleBank}>
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
              Are you sure you want to delete the selected Banks?
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

export default BanksTable