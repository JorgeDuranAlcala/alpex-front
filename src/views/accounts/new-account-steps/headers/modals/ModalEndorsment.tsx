import { useGetAllEndorsementTypes } from '@/hooks/catalogs/endorsementType/getAllEndorsementTypes'
import { AbilityContext } from '@/layouts/components/acl/Can'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, styled } from '@mui/material'
import { useContext, useState } from 'react'
import Icon from 'src/@core/components/icon'
import {
  ButtonClose,
  ContentEndorsmentContainer,
  ContentEndorsmentContainerCancel,
  FormContainer,
  HeaderTitleModal
} from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchAccountById, updateEndorsement } from 'src/store/apps/endorsement'

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

  // uneditableAccount,
  openHistory,
  handleSubmit,
  setCancellEndorsment
}: any) => {
  const { endorsementTypes } = useGetAllEndorsementTypes()

  const ability = useContext(AbilityContext)
  const [generateEndt] = useState(ability?.cannot('generateEndorsement', 'account'))

  const [createdEndorsement, setCreatedEndorsement] = useState({
    type: '',
    reason: '',
    idEndorsementType: 0
  })

  const dispatchRedux = useAppDispatch()

  return (
    <div className='header-btns'>
      <ButtonIcon
        onClick={() => {
          setOpenHistory(true)
        }}
        title='GENERATE ENDT.'
        disabled={generateEndt}
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
                value={createdEndorsement.idEndorsementType}
                onChange={e => {
                  const endorsementType = endorsementTypes?.find(
                    endorsement => endorsement.id === Number(e.target.value)
                  )
                  setCreatedEndorsement({
                    ...createdEndorsement,
                    type: String(endorsementType?.type),
                    idEndorsementType: Number(endorsementType?.id)
                  })
                }}
                sx={{ display: 'flex', flexDirection: 'column-reverse' }}
              >
                {endorsementTypes &&
                  endorsementTypes?.map(item => {
                    return (
                      <FormControlLabel
                        sx={{ height: '54px' }}
                        key={item?.id}
                        control={<Radio />}
                        label={item.type}
                        value={item.id}
                      />
                    )
                  })}
              </RadioGroup>
            </form>
          </FormContainer>
          {createdEndorsement.type !== '' && (
            <TextField
              id='standard-multiline-static'
              label='Reason for Endorsement'
              multiline
              variant='standard'
              sx={{ width: '100%', marginBottom: '40px', marginTop: '10px' }}
              helperText='This note will be saved in Endorsement History.'
              value={createdEndorsement.reason}
              onChange={e =>
                setCreatedEndorsement({
                  ...createdEndorsement,
                  reason: e.target.value
                })
              }
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
                if (createdEndorsement.type === 'Cancellation') {
                  setCancellEndorsment(true)
                }
                setOpenHistory(false)
                dispatchRedux(
                  updateEndorsement({
                    ...createdEndorsement,
                    initialized: true
                  })
                )
                dispatchRedux(fetchAccountById())
              }}
              disabled={!createdEndorsement.reason}
            >
              NEXT
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export const ActionsHeaderBoundModalCancel = ({ setOpenHistory, openHistory, setCancellEndorsment, cancel }: any) => {
  const endorsementType = useAppSelector(state => state?.endorsement?.data?.type)

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
                if (endorsementType === 'Cancellation') {
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
                if (endorsementType === 'Cancellation') {
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
