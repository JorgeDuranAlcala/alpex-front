import React, { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Custom Hooks
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
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'

// ** Utils
import { useUploadInformationDocument } from '@/hooks/accounts/information'
import { formatInformationDoctos } from '@/utils/formatDoctos'

type InformationProps = {
  onStepChange: (step: number) => void
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
  typeOfLimit: string | number | null
}

interface UserFile {
  file: File | null
}

const Information: React.FC<InformationProps> = ({ onStepChange, onIsNewAccountChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false)
  const [makeValidationsPlacement, setMakeValidationsPlacement] = useState(false)

  //Validaciones
  const [basicIncfoValidated, setBasicIncfoValidated] = useState(false)
  const [placementStructureValidated, setPlacementStructureValidated] = useState(false)

  const [open, setOpen] = useState<boolean>(false)
  const [nextClicked, setNextClicked] = useState<boolean>(false)
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  //store
  const idAccount = useAppSelector(state => state.accounts?.formsData?.form1?.id)
  const lastForm1Information = useAppSelector(state => state.accounts?.formsData?.form1)

  // ** Custom Hooks
  const { getInformaByIdAccount } = useFindInformationByIdAccount()
  const { addInformation } = useAddInformation()
  const { updateInformationByIdAccount } = useUpdateInformationByIdAccount()
  const { uploadInformationDocument } = useUploadInformationDocument()

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
  const [userFile, setUserFile] = useState<UserFile[]>([])

  const updateInformation = async () => {
    if (idAccount) {
      const res = await updateInformationByIdAccount(idAccount, {
        insured: basicInfo.insured,
        idCountry: Number(basicInfo.country),
        idBroker: Number(basicInfo.broker),
        idBrokerContact: Number(basicInfo.brokerContact),
        idCedant: Number(basicInfo.cedant),
        idCedantContact: Number(basicInfo.cedantContact),
        idLineOfBussines: Number(basicInfo.lineOfBusiness),
        idRiskActivity: Number(basicInfo.industryCode),
        effectiveDate: basicInfo.effectiveDate,
        expirationDate: basicInfo.expirationDate,
        receptionDate: basicInfo.receptionDate && new Date(basicInfo.receptionDate),
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
        netPremium: placementStructure.netPremium,
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
      effectiveDate: basicInfo.effectiveDate,
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
      netPremium: placementStructure.netPremium,
      reinsuranceBrokerage: placementStructure.reinsuranceBrokerage,
      reinsuranceBrokerageTotal: placementStructure.reinsuranceBrokerageP,
      sir: placementStructure.sir,
      taxes: placementStructure.taxes,
      taxesTotal: placementStructure.taxesP,
      totalValues: placementStructure.total,
      idTypeOfLimit: Number(placementStructure.typeOfLimit),
      step: 1
    })
    if (typeof res === 'string' && res === 'error') {
      setBadgeData({
        message: 'Error saving data',
        theme: 'error',
        open: true,
        status: 'error',
        icon: <Icon style={{ color: '#FF4D49' }} icon='icon-park-outline:error' />
      })
      setTimeout(() => {
        setBadgeData({
          message: 'Saved successfully',
          theme: 'success',
          open: false,
          status: 'error'
        })
      }, 5000)
    } else {
      setBadgeData({
        message: 'The information has been saved',
        theme: 'success',
        open: true,
        status: 'error'
      })
      setTimeout(() => {
        setBadgeData({
          message: 'Saved successfully',
          theme: 'success',
          open: false,
          status: 'error'
        })
      }, 5000)
    }

    return res
  }

  const setDataInformation = async () => {
    if (idAccount) {
      const information = await getInformaByIdAccount(idAccount)

      if (!information) return

      const obBasicInfo = {
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
        effectiveDate: information.effectiveDate ? new Date(information.effectiveDate) : null,
        expirationDate: information.expirationDate ? new Date(information.expirationDate) : null
      }

      const obPlacementStructure = {
        currency: information.currency || '',
        total: Number(information.totalValues) || 0.0,
        sir: Number(information.sir) || 0.0,
        reinsuranceBrokerageP: Number(information.reinsuranceBrokerageTotal) || 0.0,
        taxesP: Number(information.taxesTotal) || 0.0,
        frontingFeeP: Number(information.frontingFeeTotal) || 0.0,
        netPremium: Number(information.netPremium) || 0.0,
        exchangeRate: Number(information.exchangeRate) || 0.0,
        limit: Number(information.limit) || 0.0,
        grossPremium: Number(information.grossPremium) || 0.0,
        reinsuranceBrokerage: Number(information.reinsuranceBrokerage) || 0.0,
        taxes: Number(information.taxes) || 0.0,
        frontingFee: Number(information.frontingFee) || 0.0,
        attachmentPoint: Number(information.attachmentPoint) || 0.0,
        typeOfLimit: information.idTypeOfLimit || ''
      }

      setBasicInfo(obBasicInfo)
      setPlacementStructure(obPlacementStructure)
      dispatch(
        updateFormsData({
          form1: { basicInfo: obBasicInfo, placementStructure: obPlacementStructure, userFile, id: idAccount }
        })
      )
      onIsNewAccountChange(false)
    }
    onIsNewAccountChange(false)
  }

  const uploadDoctos = async (idAccount: number) => {
    const formatedDoctos = await formatInformationDoctos(userFile, idAccount, 1)
    for (const docto of formatedDoctos) {
      const res = await uploadInformationDocument(docto)
      console.log(res)
    }
  }

  const handleSaveInformation = async () => {
    if (idAccount) {
      await updateInformation()
      await uploadDoctos(idAccount)
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: idAccount } }))
    } else {
      const res = await saveInformation()
      localStorage.setItem('idAccount', String(res.account.id))
      await uploadDoctos(res.account.id)
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: res.account.id } }))
      onIsNewAccountChange(false)
    }
  }

  //Evento que controla el evento de continuar
  const handleNextStep = async () => {
    if (nextClicked) {
      if (basicIncfoValidated && placementStructureValidated) {
        await handleSaveInformation()
        onStepChange(2)
      }
    }
    handleCloseModal()
  }

  //Evento para controlar el botÃ³n de save
  const handleSave = () => {
    if (nextClicked) {
      if (basicIncfoValidated) {
        handleSaveInformation()
      }
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleNext = () => {
    setNextClicked(true)
    setOpen(true)
    setMakeValidations(true)
    setMakeValidationsPlacement(true)
  }

  const resetMakeValidations = () => {
    setMakeValidations(false)
  }

  const resetMakeValidationsPlacements = () => {
    setMakeValidationsPlacement(false)
  }

  const setValidBasicInfo = (valid: boolean) => {
    setBasicIncfoValidated(valid)
  }
  const setValidPlacementStructure = (valid: boolean) => {
    setPlacementStructureValidated(valid)
  }

  useEffect(() => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    dispatch(updateFormsData({ form1: { ...lastForm1Information, id: idAccountCache } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (idAccount) {
      setDataInformation()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccount])

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <div style={{ width: 'fit-content', float: 'right' }}>
          <CustomAlert {...badgeData} />
        </div>
        <form noValidate autoComplete='on' onSubmit={handleNextStep}>
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
              makeValidations={makeValidationsPlacement}
              resetMakeValidations={resetMakeValidationsPlacements}
              isValidForm={setValidPlacementStructure}
            />
          </div>

          <div className='section'>
            <div className='title'>File submit</div>
            <FileSubmit userFile={userFile} setUserFile={setUserFile} />
          </div>
          <div className='section action-buttons'>
            <Button
              className='btn-save'
              onClick={handleSave}
              onMouseEnter={() => {
                setNextClicked(true)
                setMakeValidations(true)
              }}
              variant='contained'
            >
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
                <Button className='continue-modal-btn' variant='contained' onClick={handleNextStep}>
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
