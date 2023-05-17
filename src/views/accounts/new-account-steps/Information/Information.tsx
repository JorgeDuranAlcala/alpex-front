import React, { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// Hooks
import { useAddInformation } from 'src/hooks/accounts/information'

// // ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import BasicInfo from './BasicInfo'
import FileSubmit from './FileSubmit'
import PlacementStructure from './PlacementStructure'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'

type InformationProps = {
  onStepChange?: (step: number) => void
}

export interface BasicInfoInterface {
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
  riskClass: number
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
  const [disableSaveBtn, setDisableSaveBtn] = useState(false)
  const [disableNextBtn, setDisableNextBtn] = useState(true)
  const [basicIncfoValidated, setBasicIncfoValidated] = useState(false)
  const [placementStructureValidated, setPlacementStructureValidated] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [nextClicked, setNextClicked] = useState<boolean>(false)

  const { addInformation } = useAddInformation()

  const dispatch = useAppDispatch()

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
    riskClass: 0,
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

  const saveInformation = async () => {
    //ALLOW NULLS

    const res = await addInformation({
      insured: basicInfo.insured,
      idCountry: Number(basicInfo.country),
      idBroker: Number(basicInfo.broker),
      idBrokerContact: Number(basicInfo.brokerContact),
      idCedant: Number(basicInfo.cedant),
      idCedantContact: Number(basicInfo.cedantContact),
      idLineOfBussines: Number(basicInfo.lineOfBusiness),
      idRiskActivity: Number(basicInfo.industryCode),
      effetiveDate: basicInfo.effectiveDate,
      expirationDate: basicInfo.expirationDate,
      receptionDate: basicInfo.receptionDate,
      idLeadUnderwriter: Number(basicInfo.leadUnderwriter),
      idTechnicalAssistant: Number(basicInfo.technicalAssistant),
      idUnderwriter: Number(basicInfo.underwriter),
      riskClass: basicInfo.riskClass,
      currency: placementStructure.currency,
      exchangeRate: placementStructure.exchangeRate,
      attachmentPoint: placementStructure.attachmentPoint,
      frontingFee: placementStructure.frontingFee,
      frontingFeeTotal: placementStructure.frontingFeeP,
      grossPremium: placementStructure.grossPremium,
      limit: placementStructure.limit,
      netPremiun: placementStructure.netPremium,
      reinsuranceBrokerage: placementStructure.reinsuranceBrokerage,
      reinsuranceBrokerageTotal: placementStructure.reinsuranceBrokerageP,
      sir: placementStructure.sir,
      taxes: placementStructure.taxes,
      taxesTotal: placementStructure.taxesP,
      totalValues: placementStructure.total,
      idTypeOfLimit: Number(placementStructure.typeOfLimit),
      step: 1
    })

    return res
  }

  const handleSubmit = async () => {
    setDisableNextBtn(false)
    const res = await saveInformation()
    if (res) {
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: res.account.id } }))
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    setDisableNextBtn(false)
    if (onStepChange) {
      onStepChange(2)
    }
  }
  const handleNext = async () => {
    await setMakeValidations(true)
    setNextClicked(true)
    handleNextStep()
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

  const handleNextStep = () => {
    if (nextClicked) {
      if (basicIncfoValidated && placementStructureValidated) {
        setOpen(true)
      }
    }
  }

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
                  <ButtonClose
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
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
                <Button
                  className='create-contact-modal'
                  onClick={() => {
                    setOpen(false)
                    setNextClicked(false)
                  }}
                >
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
