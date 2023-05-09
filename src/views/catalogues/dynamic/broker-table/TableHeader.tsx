// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import { GridRowId } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components imports
import fonts from 'src/views/accounts/font'

import { IAlert } from 'src/views/custom/alerts'



interface ITableHeader {
  selectedRows: GridRowId[]
  badgeData: IAlert
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableHeader: React.FC<ITableHeader> = ({ selectedRows, badgeData }) => {
  // ** Custom Hooks
  const router = useRouter()
  const [openDelete, setOpenDelete] = useState(false)

  const deleteBrokers = ()=>{
    console.log("delete brokers")
    setOpenDelete(false)
  }

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      <Box>
        <div className='search-wrapper'>
          <input className='input-search' placeholder='Search' style={{ fontFamily: fonts.inter }} />
        </div>
      </Box>
      <Box>
        <Button
          className='delete-button'
          onClick={() => {
            setOpenDelete(true)
          }}
          variant='outlined'
        >
          <div className='btn-icon'>
            <Icon icon='mdi:delete-outline' />
          </div>
          DELETE
        </Button>
        <Modal
          className='delete-modal'
          open={openDelete}
          onClose={() => {
            setOpenDelete(false)
          }}
        >
          <Box className='modal-wrapper'>
            <HeaderTitleModal>
              <Typography variant='h6'sx={{maxWidth: "450px"}}>Are you sure you want to delete the selected Brokers?</Typography>
              <ButtonClose
                onClick={() => {
                  setOpenDelete(false)
                }}
              >
                <CloseIcon />
              </ButtonClose>
            </HeaderTitleModal>
            <div className='delete-modal-text'>This action can’t be undone.</div>
            <Button className='header-modal-btn' variant='contained' onClick={deleteBrokers}>
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
      </Box>
      <Box sx={{ marginLeft: 'auto' }}>
        <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.push('/catalogues/dynamic/add-broker')}>
          ADD NEW BROKER &nbsp; <Icon icon='mdi:plus' />
        </Button>
      </Box>

      {/* <Box sx={{ marginLeft: 'auto' }}>
        {!badgeData.status ? (
          <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.push('/accounts/new-account')}>
            ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
          </Button>
        ) : (
          <CustomAlert {...badgeData} />
        )}
      </Box> */}
    </Box>
  )
}

export default TableHeader
