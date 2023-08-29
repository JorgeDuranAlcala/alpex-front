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
  isBoundStepper?: boolean
}

interface ModalProps {
  openModal: boolean
  text?: string
  selectedStep?: number
  onCloseModal: (close: boolean) => void
  onStepBack: () => void
  isBoundStepper?: boolean
}

const StepModal: React.FC<ModalProps> = ({
  openModal,
  selectedStep,
  onCloseModal,
  onStepBack,
  text,
  isBoundStepper
}) => {
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
        <Box className='modal-wrapper' style={{ width: isBoundStepper ? '25%' : '40%' }}>
          <HeaderTitleModal>
            {isBoundStepper ? (
              <Typography variant='h6'>Changing to step {selectedStep}</Typography>
            ) : (
              <Typography variant='h6'>Going back?</Typography>
            )}
            <ButtonClose onClick={handleClose}>
              <CloseIcon />
            </ButtonClose>
          </HeaderTitleModal>
          <div className='stepper-modal-text'>{text}</div>
          <Button
            className='stepper-modal-btn'
            variant='contained'
            onClick={onStepBack}
            style={{ marginBottom: isBoundStepper ? '15px' : '0px' }}
          >
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
const NewAccountStepper = ({ changeStep = 1, onStepChange, isBoundStepper }: StepperProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [activeStep, setActiveStep] = useState(1)
  const [selectedStep, setSelectedStep] = useState(1)
  const [modalText, setModalText] = useState(' ')
  const [openModal, setOpenModal] = useState(false)

  const handleStepClick = (step: number) => {
    if (!isBoundStepper) {
      setSelectedStep(step)

      if (selectedStep < activeStep) {
        switch (activeStep) {
          case 2: {
            setModalText(
              'Doing this will cause the information entered in form #2, deleted. Would you like to continue?'
            )
            break
          }
          case 3: {
            setModalText(
              'Doing this will cause the information entered in form #3, deleted. Would you like to continue?'
            )
            break
          }
          case 4: {
            setModalText(
              'Doing this will cause the information entered in form #4, deleted. Would you like to continue?'
            )
            break
          }
          case 5: {
            setModalText(
              'Doing this will cause the information entered in form #5, deleted. Would you like to continue?'
            )
            break
          }
        }

        setOpenModal(true)
      }
    } else {
      setSelectedStep(step)
      setOpenModal(true)
    }
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
          text={isBoundStepper ? 'Would you like to continue?' : modalText}
          openModal={openModal}
          onCloseModal={() => {
            setOpenModal(false)
          }}
          onStepBack={stepBack}
          selectedStep={selectedStep}
          isBoundStepper={isBoundStepper}
        />
      </div>
    </>
  )
}

export default NewAccountStepper
