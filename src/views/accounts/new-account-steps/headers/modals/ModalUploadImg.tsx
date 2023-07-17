import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
import Icon from 'src/@core/components/icon'
import {
  ButtonClose,
  ContentModalUpload,
  FormContainerUpload,
  HeaderTitleModal
} from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

export const ModalUploadImg = ({ setOpenHistory, openHistory }: any) => {
  return (
    <div>
      <Modal
        open={openHistory}
        onClose={() => {
          setOpenHistory(false)
        }}

        // sx={{ paddingBottom: '40px' }}
      >
        <Box className='modal-wrapper' sx={{ padding: '20px', minWidth: '505px', minHeight: '533px' }}>
          <HeaderTitleModal style={{ justifyContent: 'flex-end', marginBottom: '0px' }}>
            <ButtonClose
              onClick={() => {
                setOpenHistory(false)
              }}
              sx={{ color: '#646776' }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <ContentModalUpload>
            <div className='title'>Upload company logo</div>
          </ContentModalUpload>
          <FormContainerUpload>
            <img className='img' alt='' src={''} />
            <div className='btnContainer'>
              <Button
                variant='outlined'
                endIcon={
                  <Icon icon='ic:baseline-refresh' style={{ marginLeft: 'auto', color: '#686B7E' }} fontSize={20} />
                }
                sx={{ color: '#686B7E', borderColor: '#686B7E', marginBottom: '10px' }}
              >
                Regenerate
              </Button>
            </div>{' '}
            <p className='txt'>Click on Regenerate if you want to change the background color.</p>
            <Button variant='contained' sx={{ marginBottom: '0' }} onClick={() => console.log('hola')}>
              DONE
            </Button>
          </FormContainerUpload>
        </Box>
      </Modal>
    </div>
  )
}
