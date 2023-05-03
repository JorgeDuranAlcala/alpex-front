import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Icon from 'src/@core/components/icon';
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers';

// ** MUI Imports

interface StatusHistory {
  id: number;
  name: string;
  date: string;

}

const statusHistory: StatusHistory[] = [
  {
    id: 1,
    name: 'Account creation',
    date: '11 / December / 2020',

  },
  {
    id: 2,
    name: 'Bound status',
    date: '11 / January / 2021',

  }
]


const ActionsHeader = () => {
  const [status, setStatus] = useState({})
  const [editableAccount, setEditableAccount] = useState(true)
  const [editInfo, setEditInfo] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showPrintOptions, setShowPrintOptions] = useState(false)

  const deleteAccount = () => {
    console.log('Deleted')
    setOpenDelete(false)
  }

  const downloadSpanish = () => {
    console.log('Spanish Download')
    setShowPrintOptions(false)
  }

  const downloadEnglish = () => {
    console.log('English Download')
    setShowPrintOptions(false)
  }

  return (
    <>

      <div className='actions-header'>
        <div className='header-text'>
          Status:
        </div>
        <div className='header-row'>

          <div className="header-btn">
            {/* <span className='form-header-subtitle'>
              <StatusSelect setSelectedStatus={setStatus} />
            </span> */}
            <Button
              className="edit-button"
              onClick={() => { setEditInfo(true) }}
              variant='outlined'
              >
              <div className="btn-icon">
                <Icon icon='mdi:clock' />
              </div>
              Pending
            </Button>
          </div>

          <div className="header-btn">
            <Button
              className="edit-button"
              onClick={() => { setEditInfo(true) }}
              variant='outlined'
              disabled={editableAccount}>
              <div className="btn-icon">
                <Icon icon='mdi:pencil' />
              </div>
              EDIT INFORMATION
            </Button>
          </div>

          <div className="header-btn">
            <Button
              className="history-button"
              onClick={() => { setOpenHistory(true) }}
              variant='outlined'
              disabled={editableAccount}>
              <div className="btn-icon">
                <Icon icon='mdi:clock' />
              </div>
              ACCOUNT HISTORY
            </Button>
            <Modal className="history-modal" open={openHistory} onClose={() => { setOpenHistory(false) }}>
              <Box
                className="modal-wrapper"
              >
                <HeaderTitleModal>
                  <Typography variant='h6'>Account History</Typography>
                  <ButtonClose onClick={() => { setOpenHistory(false) }}>
                    <CloseIcon />
                  </ButtonClose>
                </HeaderTitleModal>
                <div className='headers'>
                  <div className='name'>Name</div>
                  <div className='date'>Date</div>
                </div>
                {statusHistory.map((status) => (
                  <>
                    <div className={(status.id % 2) == 0 ? "history-status grey-bg" : "history-status"} key={status.id}>
                      <div className="name">{status.name}</div>
                      <div className="date">{status.date}</div>
                    </div>
                  </>
                ))}
              </Box>
            </Modal>
          </div>

          <div className="header-btn">
            <div className='print-btn'>
              <Button
                className="print-button"
                onClick={() => { setShowPrintOptions(!showPrintOptions) }}
                variant='outlined'
                disabled={editableAccount}>
                <div className="btn-icon">
                  <Icon icon='mdi:printer' />
                </div>
                PRINT SECTION
              </Button>
              {showPrintOptions ?
                <div className="print-options">
                  <div className='title'>Select a language</div>
                  <div className='language' onClick={downloadEnglish}>English</div>
                  <div className='language' onClick={downloadSpanish}>Spanish</div>
                </div> : ''
              }
            </div>

          </div>

          <div className="header-btn">

            <Button
              className="delete-button"
              onClick={() => { setOpenDelete(true) }}
              variant='outlined'
              disabled={editableAccount}>
              <div className="btn-icon">
                <Icon icon='mdi:delete' />
              </div>
              DELETE ACCOUNT
            </Button>


            <Modal className="delete-modal" open={openDelete} onClose={() => { setOpenDelete(false) }}>
              <Box
                className="modal-wrapper"
              >
                <HeaderTitleModal>
                  <Typography variant='h6'>Are you sure you want to delete this account?</Typography>
                  <ButtonClose onClick={() => { setOpenDelete(false) }}>
                    <CloseIcon />
                  </ButtonClose>
                </HeaderTitleModal>
                <div className='delete-modal-text'>
                  This action can’t be undone.
                </div>
                <Button
                  className='header-modal-btn'
                  variant='contained'
                  onClick={deleteAccount}
                >
                  DELETE
                </Button>
                <Button className='close-modal header-modal-btn' onClick={() => { setOpenDelete(false) }}>
                  CANCEL
                </Button>
              </Box>
            </Modal>
          </div>
        </div>

      </div>

    </>
  )
}

export default ActionsHeader
