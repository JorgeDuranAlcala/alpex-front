import { useGetAllEndorsementTypes } from '@/hooks/catalogs/endorsementType/getAllEndorsementTypes'
import { useFindEndorsementsByIdAccount } from '@/hooks/endorsement'
import { useAppSelector } from '@/store'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, styled } from '@mui/material'
import { useEffect } from 'react'
import Icon from 'src/@core/components/icon'
import {
  ButtonClose,
  ContentEndorsmentContainer,
  ContentEndorsmentContainerCancel,
  FormContainer,
  HeaderTitleModal
} from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

const ButtonIcon = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  padding: '0px !important',
  maxWidth: '52px !important',
  '&:hover': {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  '&:focus': {}
})

export const ActionsHeaderBoundModal = ({
  setOpenHistory,
  uneditableAccount,
  openHistory,
  handleSubmit,
  value,
  handleRadioChange,
  setCancellEndorsment,
  setActiveEndorsement
}: any) => {
  const { endorsementTypes } = useGetAllEndorsementTypes()
  const account = useAppSelector(state => state.accounts?.formsData?.form1)
  const { endorsements, setIdAccount } = useFindEndorsementsByIdAccount()

  useEffect(() => {
    setIdAccount(account?.id)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  console.log('Este es el historial de endorsements: ', endorsements)

  return (
    <div className='header-btns'>
      <ButtonIcon
        onClick={() => {
          setOpenHistory(true)
        }}
        title='GENERATE ENDT.'
        disabled={uneditableAccount}
      >
        <Icon icon='material-symbols:approval-outline' />
      </ButtonIcon>
      <Modal
        className='history-modal'
        open={openHistory}
        onClose={() => {
          setOpenHistory(false)
        }}
      >
        <Box className='modal-wrapper' sx={{ padding: '20px' }}>
          <HeaderTitleModal style={{ justifyContent: 'flex-end', marginBottom: '0px' }}>
            <ButtonClose
              onClick={() => {
                setOpenHistory(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <ContentEndorsmentContainer>
            <div className='title'>Generate Endorsement</div>
            <div className='subtitle'>Select a Type of Endorsement and leave a note about this action. </div>
          </ContentEndorsmentContainer>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='none'
                name='radio-buttons-group'
                value={value}
                onChange={handleRadioChange}
                sx={{ display: 'flex', flexDirection: 'column-reverse' }}
              >
                {endorsementTypes &&
                  endorsementTypes?.map(item => {
                    // console.log(item)

                    return (
                      <FormControlLabel
                        sx={{ height: '54px' }}
                        key={item?.id}
                        control={<Radio />}
                        label={item.type}
                        value={item.type}
                      />
                    )
                  })}
              </RadioGroup>
            </form>
          </FormContainer>
          {value === 'Informative' && (
            <TextField
              id='standard-multiline-static'
              label='Reason for Endorsement'
              multiline
              variant='standard'
              sx={{ width: '100%', marginBottom: '40px', marginTop: '10px' }}
              helperText='This note will be saved in Endorsement History.'
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px' }}>
            <Button
              variant='text'
              onClick={() => {
                setOpenHistory(false)
              }}
            >
              CANCEL
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                if (value === 'Cancellation') {
                  setOpenHistory(false)
                  setCancellEndorsment(true)
                } else {
                  setActiveEndorsement(true)
                  setOpenHistory(false)
                }
              }}
            >
              NEXT
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export const ActionsHeaderBoundModalCancel = ({
  setOpenHistory,
  openHistory,
  setCancellEndorsment,
  value,
  cancel
}: any) => {
  return (
    <div>
      <Modal
        className='history-modal'
        open={openHistory}
        onClose={() => {
          setOpenHistory(false)
        }}
      >
        <Box className='modal-wrapper' sx={{ padding: '20px' }}>
          <HeaderTitleModal style={{ justifyContent: 'flex-end', marginBottom: '0px' }}>
            <ButtonClose
              onClick={() => {
                setOpenHistory(false)
              }}
            >
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <ContentEndorsmentContainer>
            <div className='title'>Cancellation Endorsement</div>
            <div className='subtitle'>Complete the information below to generate this type of ENDT. </div>
          </ContentEndorsmentContainer>
          <ContentEndorsmentContainerCancel>
            <TextField
              id='standard-multiline-static'
              label='09 / 04 / 2023  13:00 hrs'
              multiline
              type='date'
              variant='standard'
              sx={{ width: '100%' }}
              helperText='This note will be saved in Endorsement History.'
            />
            <TextField
              id='standard-multiline-static'
              label='Reason for Endorsement'
              multiline
              type='date'
              variant='standard'
              sx={{ width: '100%', marginBottom: '40px', marginTop: '10px' }}
              helperText='This note will be saved in Endorsement History.'
            />
          </ContentEndorsmentContainerCancel>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px' }}>
            <Button
              variant='text'
              onClick={() => {
                if (value === 'Cancellation') {
                  cancel(true)
                  setCancellEndorsment(false)
                } else {
                  console.log('Hola')
                }
              }}
            >
              CANCEL
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                if (value === 'Cancellation') {
                  setOpenHistory(false)
                } else {
                  console.log('Hola')
                }
              }}
            >
              NEXT
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
