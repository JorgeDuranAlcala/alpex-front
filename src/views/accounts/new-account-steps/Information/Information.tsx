import React, { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// Hooks
import {
  useAddInformation,
  useFindInformationByIdAccount,
  useUpdateInformationByIdAccount
} from 'src/hooks/accounts/information'

// // ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
import { ButtonClose, HeaderTitleModal } from 'src/styles/modal/modal.styled'
import BasicInfo from './BasicInfo'
import FileSubmit from './FileSubmit'
import PlacementStructure from './PlacementStructure'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'

type InformationProps = {
  onStepChange?: (step: number) => void
  onIsNewAccountChange: (status: boolean) => void
}

export interface BasicInfoInterface {
  insured: string
  country: number | string
  broker: number | string
  brokerContact: number | null | string
  cedant: number | string
  cedantContact: number | null | string
  lineOfBusiness: number | string
  underwriter: number | string
  leadUnderwriter: number | string
  technicalAssistant: number | string
  industryCode: number | string
  riskActivity: string
  riskClass: number
  receptionDate: Date | null
  effectiveDate: Date | null
  expirationDate: Date | null
}

export interface PlacementStructure {
  currency: string
  total: number
  sir: number
  reinsuranceBrokerageP: number
  taxesP: number
  frontingFeeP: number
  netPremium: number
  exchangeRate: number
  limit: number
  grossPremium: number
  reinsuranceBrokerage: number
  taxes: number
  frontingFee: number
  attachmentPoint: number
  typeOfLimit: string | number
}

interface UserFile {
  file: File | null
}

const Information: React.FC<InformationProps> = ({ onStepChange, onIsNewAccountChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false)
  const [disableSaveBtn, setDisableSaveBtn] = useState(false)
  const [, setDisableNextBtn] = useState(true)
  const [basicIncfoValidated, setBasicIncfoValidated] = useState(false)
  const [placementStructureValidated, setPlacementStructureValidated] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [nextClicked, setNextClicked] = useState<boolean>(false)
  const [userId, setUserId] = useState<number | null>(null)

  const idAccount = useAppSelector(state => state.accounts?.formsData?.form1?.id)
  const { getInformaByIdAccount } = useFindInformationByIdAccount()
  const { addInformation } = useAddInformation()
  const { updateInformationByIdAccount } = useUpdateInformationByIdAccount()

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
  const [placementStructure, setPlacementStructure] = useState<PlacementStructure>({
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
  const [userFile, setUserFile] = useState<UserFile[]>([
    {
      file: null
    }
  ])

  const updateInformation = async () => {
    if (userId) {
      const res = await updateInformationByIdAccount(userId, {
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
        idTypeOfLimit: Number(placementStructure.typeOfLimit)
      })

      return res
    }
  }

  const saveInformation = async () => {
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

  const setDataInformation = async () => {
    if (idAccount) {
      const information = await getInformaByIdAccount(idAccount)
      setBasicInfo({
        insured: information.insured || '',
        country: information.idCountry || '',
        broker: information.idBroker || '',
        brokerContact: information.idBrokerContact || '',
        cedant: information?.idCedant || '',
        cedantContact: information.idCedantContact || '',
        lineOfBusiness: information.idLineOfBussines || '',
        underwriter: information.idUnderwriter || '',
        leadUnderwriter: information.idLeadUnderwriter || '',
        technicalAssistant: information.idTechnicalAssistant || '',
        industryCode: information.idRiskActivity || '',
        riskActivity: '',
        riskClass: 0,
        receptionDate: information.receptionDate ? new Date(information.receptionDate) : null,
        effectiveDate: information.effetiveDate ? new Date(information.effetiveDate) : null,
        expirationDate: information.expirationDate ? new Date(information.expirationDate) : null
      })

      setPlacementStructure({
        currency: information.currency || '',
        total: information.totalValues || 0.0,
        sir: information.sir || 0.0,
        reinsuranceBrokerageP: information.reinsuranceBrokerageTotal || 0.0,
        taxesP: information.taxes || 0.0,
        frontingFeeP: information.frontingFeeTotal || 0.0,
        netPremium: information.netPremiun || 0.0,
        exchangeRate: information.exchangeRate || 0.0,
        limit: information.exchangeRate || 0.0,
        grossPremium: information.exchangeRate || 0.0,
        reinsuranceBrokerage: information.exchangeRate || 0.0,
        taxes: information.exchangeRate || 0.0,
        frontingFee: information.exchangeRate || 0.0,
        attachmentPoint: information.exchangeRate || 0.0,
        typeOfLimit: information.idTypeOfLimit || ''
      })
    }
  }

  const handleSaveInformation = async () => {
    if (userId) {
      await updateInformation()
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: userId } }))
      onIsNewAccountChange(false)
    } else {
      const res = await saveInformation()
      setUserId(res.account.id)
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: res.account.id } }))
      onIsNewAccountChange(false)
    }
  }

  const handleSubmit = async () => {
    setDisableNextBtn(false)
    await handleSaveInformation()
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = async () => {
    setDisableNextBtn(false)
    if (onStepChange) {
      await handleSaveInformation()
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
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Button className='btn-next' onClick={handleNext}>
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
