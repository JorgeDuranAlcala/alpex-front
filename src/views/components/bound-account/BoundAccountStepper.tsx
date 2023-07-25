import { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

// ** Icon Imports

interface StepperProps {
  changeStep?: number
  onStepChange?: (step: number) => void
}

interface ModalProps {
  openModal: boolean
  text?: string
  onCloseModal: (close: boolean) => void
  onStepBack: () => void
}

const StepModal: React.FC<ModalProps> = ({ openModal, onCloseModal, onStepBack, text }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
    if (onCloseModal) onCloseModal(false)
  }

  useEffect(() => {
    if (openModal == true) setOpen(true)
    else setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  return (
    <>
      <Modal className='stepper-modal' open={open} onClose={handleClose}>
        <Box className='modal-wrapper' style={{ width: '30%' }}>
          <HeaderTitleModal>
            <Typography variant='h6'>Change step?</Typography>
            <ButtonClose onClick={handleClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='stepper-modal-text'>{text}</div>
          <Button className='stepper-modal-btn' variant='contained' onClick={onStepBack}>
            CONTINUE
          </Button>
          <Button className='close-modal stepper-modal-btn' onClick={handleClose}>
            KEEP EDITING
          </Button>
        </Box>
      </Modal>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BoundAccountStepper = ({ changeStep = 1, onStepChange }: StepperProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [activeStep, setActiveStep] = useState(1)
  const [selectedStep, setSelectedStep] = useState(1)
  const [openModal, setOpenModal] = useState(false)

  const handleStepClick = (step: number) => {
    setSelectedStep(step)
    setOpenModal(true)
  }

  const stepBack = () => {
    setActiveStep(selectedStep)
    setOpenModal(false)
    if (onStepChange) onStepChange(selectedStep)
  }

  useEffect(() => {
    setActiveStep(changeStep)
  }, [changeStep])

  return (
    <>
      <div className='new-account-stepper' style={{ fontFamily: inter }}>
        <div className='steps'>
          <div className={activeStep == 1 ? 'step active' : 'step'} onClick={() => handleStepClick(1)}>
            <div className='step-number'>1</div>
            <div className='step-name'>Information</div>
          </div>
          <div className={activeStep == 2 ? 'step active' : 'step'} onClick={() => handleStepClick(2)}>
            <div className='step-number'>2</div>
            <div className='step-name'>Security</div>
          </div>
          <div className={activeStep == 3 ? 'step active' : 'step'} onClick={() => handleStepClick(3)}>
            <div className='step-number'>3</div>
            <div className='step-name'>Payment warranty</div>
          </div>
          <div className={activeStep == 4 ? 'step active' : 'step'} onClick={() => handleStepClick(4)}>
            <div className='step-number'>4</div>
            <div className='step-name'>Sublimits</div>
          </div>
          <div className={activeStep == 5 ? 'step active' : 'step'} onClick={() => handleStepClick(5)}>
            <div className='step-number'>5</div>
            <div className='step-name'>SOV</div>
          </div>
        </div>
        <StepModal
          text={'Would you like to continue?'}
          openModal={openModal}
          onCloseModal={() => {
            setOpenModal(false)
          }}
          onStepBack={stepBack}
        />
      </div>
    </>
  )
}

export default BoundAccountStepper
