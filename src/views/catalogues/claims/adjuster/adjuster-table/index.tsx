// ** React Imports
import { useEffect, useState, useContext } from 'react'

//** Next Imports */
import { useRouter } from 'next/router'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled';

// ** context
import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer';
import CataloguesClaimsActionTypes from 'src/context/catalogues-claims/actionTypes';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

// ** Custom Components Imports
import CustomPagination from '../../CustomPaginationImpl'
import TableHeader from '../../TableHeader'

// ** Custom utilities
import useGetAllPagination from '@/hooks/catalogs/adjusters/useGetAllPagination'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

// adjuster

import { IAdjuster } from '../'

const AdjusterTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [adjusterList, setAdjusterList] = useState<IAdjuster[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openDeleteRows, setOpenDeleteRows] = useState(false)
  const [adjusterToDelete, setAdjusterToDelete] = useState("0")

  const { dispatch } = useContext(CataloguesClaimsContext);

  //hooks
  const {  
    adjusterPagination,
    setAdjusterPagination,
    adjusters,
    adjusterInfoPage
   } = useGetAllPagination()



  const router = useRouter()

  // const [badgeData] = useState<IAlert>({
  //   message: '',
  //   status: undefined,
  //   icon: undefined
  // })

  const column: GridColumns<IAdjuster> = [
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
      renderHeader: ({}) => (
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
      field: 'siglas',
      headerName: 'SIGLAS',
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
            SIGLAS
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.siglas}
        </Typography>
      )
    },
    {
      flex: 0.5,
      field: 'razonSocial',
      headerName: 'Razon Social',
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
            RAZON SOCIAL
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.razonSocial}
        </Typography>
      )
    },
    {
      flex: 0.5,
      field: 'estado',
      headerName: 'Estado',
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
            ESTADO
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.estado}
        </Typography>
      )
    },
    {
      flex: 0.5,
      field: 'proveedor',
      headerName: 'Proveedor',
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
            PROVEEDOR
          </Typography>
        </Box>
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.proveedor}
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
                handleSelectEdit(row.id)
              }}
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
    setAdjusterPagination({ ...adjusterPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setAdjusterList(adjusters || [])
  }, [adjusters])


  const handleSelectEdit = (id: string | null) => {
    router.push({ pathname: '/catalogues/claims/update-adjusters', query: { id } })
  }
  


  const deleteRows = async () => {
    setOpenDeleteRows(false)
  }

  const openDeleteModal = (id: string) => {
    setAdjusterToDelete(id)
    setOpenDelete(true)
  }

  const deleteSingleAdjuster = async () => {
    
    dispatch({ type: CataloguesClaimsActionTypes.REMOVE_ADJUSTER, payload: {id: adjusterToDelete}});
    setOpenDelete(false)
  }

  const handleDispatch = (e: any, value: number) => {
    setAdjusterPagination({
      ...adjusterPagination,
      info: { ...adjusterPagination.info, page: value }
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
          textBtn='ADD ADJUSTER'
          onClickBtn={() => router.push('/catalogues/claims/add-adjusters')}
        />
        <div className='adjuster-list'>
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            rows={adjusterList}
            columns={column}
            pagination
            pageSize={10}
            components={{
              Pagination: CustomPagination
            }}
            componentsProps={{
              pagination: { handleDispatch, infoPage: { ...adjusterInfoPage } }
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
            <Typography variant='h6'>Are you sure you want to delete this adjuster?</Typography>
            <ButtonClose
              onClick={() => {
                setOpenDelete(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='delete-modal-text'>This action can’t be undone.</div>
          <Button className='header-modal-btn' variant='contained' onClick={deleteSingleAdjuster}>
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
              Are you sure you want to delete the selected Adjusters?
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

export default AdjusterTable
