import React, { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// // ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import BasicInfo from './BasicInfo'
import FileSubmit from './FileSubmit'
import PlacementStructure from './PlacementStructure'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type InformationProps = {
  onStepChange?: (step: number) => void
}

interface BasicInfoInterface {
  insured: string
  country: string
  broker: string
  brokerContact: string
  cedant: string
  cedantContact: string
  lineOfBusiness: string
  underwriter: string
  leadUnderwriter: string
  technicalAssistant: string
  industryCode: string
  riskActivity: string
  riskClass: string
  receptionDate: Date | null
  effectiveDate: Date | null
  expirationDate: Date | null
}

interface UserFile {
  file: File | null
}

const Information: React.FC<InformationProps> = ({ onStepChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false)
  const [disableSaveBtn, setDisableSaveBtn] = useState(true)
  const [disableNextBtn, setDisableNextBtn] = useState(true)
  const [basicIncfoValidated, setBasicIncfoValidated] = useState(false)
  const [placementStructureValidated, setPlacementStructureValidated] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  const [basicInfo, setBasicInfo] = useState<BasicInfoInterface>({
    insured: '',
    country: '',
    broker: '',
    brokerContact: '',
    cedant: '',
    cedantContact: '',
    lineOfBusiness: '',
    underwriter: '',
    leadUnderwriter: '',
    technicalAssistant: '',
    industryCode: '',
    riskActivity: '',
    riskClass: '',
    receptionDate: null,
    effectiveDate: null,
    expirationDate: null
  })
  const [placementStructure, setPlacementStructure] = useState({
    currency: '',
    total: 0.0,
    sir: 0.0,
    reinsuranceBrokerageP: 0.0,
    taxesP: 0.0,
    frontingFeeP: 0.0,
    netPremium: 0.0,
    exchangeRate: 0.0,
    limit: 0.0,
    grossPremium: 0.0,
    reinsuranceBrokerage: 0.0,
    taxes: 0.0,
    frontingFee: 0.0,
    attachmentPoint: 0.0,
    typeOfLimit: ''
  })
  const [userFile, setUserFile] = useState<UserFile>({
    file: null
  })

  const handleSubmit = () => {
    setDisableNextBtn(false)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    if (onStepChange) {
      onStepChange(2)
    }
  }
  const handleNext = () => {
    setMakeValidations(true)

    if (basicIncfoValidated && placementStructureValidated) {
      setOpen(true)
    }
  }

  const resetMakeValidations = () => {
    setMakeValidations(false)
  }
  const setValidBasicInfo = (valid: boolean) => {
    setBasicIncfoValidated(valid)
  }
  const setValidPlacementStructure = (valid: boolean) => {
    setPlacementStructureValidated(valid)
  }

  useEffect(() => {
    const isBasicInfoValid = Object.values(basicInfo).some(value => value !== '' && value !== null)
    setDisableSaveBtn(!isBasicInfoValid)
  }, [basicInfo])

  useEffect(() => {
    const isplacementStructureValid = Object.values(placementStructure).some(
      value => value !== '' && value !== null && value !== 0
    )
    setDisableSaveBtn(!isplacementStructureValid)
  }, [placementStructure])

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            <BasicInfo
              basicInfo={basicInfo}
              setBasicInfo={setBasicInfo}
              makeValidations={makeValidations}
              resetMakeValidations={resetMakeValidations}
              isValidForm={setValidBasicInfo}
            />
          </div>

          <div className='section'>
            <PlacementStructure
              placementStructure={placementStructure}
              setPlacementStructure={setPlacementStructure}
              makeValidations={makeValidations}
              resetMakeValidations={resetMakeValidations}
              isValidForm={setValidPlacementStructure}
            />
          </div>

          <div className='section'>
            <div className='title'>File submit</div>
            <FileSubmit userFile={userFile} setUserFile={setUserFile} />
          </div>
          <div className='section action-buttons'>
            <Button className='btn-save' onClick={handleSubmit} disabled={disableSaveBtn} variant='contained'>
              <div className='btn-icon'>
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
            <Button className='btn-next' onClick={handleNext} disabled={disableNextBtn}>
              Next Step
              <div className='btn-icon'>
                <Icon icon='material-symbols:arrow-right-alt' />
              </div>
            </Button>

            <Modal className='next-step-modal' open={open} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: 'absolute',
                  bgcolor: 'white',
                  top: '50%',
                  left: '50%',
                  boxShadow: 24,
                  pl: 5,
                  pr: 5,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '10px',
                  padding: '15px'
                }}
              >
                <HeaderTitleModal>
                  <div className='next-modal-title'>Ready to continue?</div>
                  <ButtonClose onClick={handleCloseModal}>
                    <CloseIcon />
                  </ButtonClose>
                </HeaderTitleModal>
                <div className='next-modal-text'>
                  You are about to advance to the next form. Make sure that all the fields have been completed with the
                  correct information.
                </div>
                <Button className='continue-modal-btn' variant='contained' onClick={onNextStep}>
                  CONTINUE
                </Button>
                <Button className='create-contact-modal' onClick={() => setOpen(false)}>
                  Keep editing information
                </Button>
              </Box>
            </Modal>
          </div>
        </form>
      </div>
    </>
  )
}

export default Information
