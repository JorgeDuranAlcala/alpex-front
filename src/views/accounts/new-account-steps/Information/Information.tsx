import React, { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Custom Hooks
import {
  useAddInformation,
  useFindInformationByIdAccount,
  useUpdateInformationByIdAccount
} from 'src/hooks/accounts/information'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, Modal } from '@mui/material'
import BasicInfo from './BasicInfo'

// ** Icon Imports
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'

// ** Utils
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'
import { delayMs, formatUTC } from '@/utils/formatDates'

type InformationProps = {
  onStepChange: (step: number) => void
  onIsNewAccountChange: (status: boolean) => void
}

export interface BasicInfoInterface {
  insured: string
  country: number | string
  broker: number | string
  brokerContact: number | null | string
  brokerContactEmail: string
  brokerContactPhone: string
  brokerContactCountry: string
  cedant: number | string
  cedantContact: number | null | string
  cedantContactEmail: string
  cedantContactPhone: string
  cedantContactCountry: string
  lineOfBusiness: number | string
  underwriter: number | string | null
  leadUnderwriter: number | string | null
  technicalAssistant: number | string | null
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

const Information: React.FC<InformationProps> = ({ onStepChange, onIsNewAccountChange }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false)
  const [disableSave, setDisableSave] = useState(false)

  // const [changeTitle, setChangeTitle] = useState(false)

  //Validaciones
  const [allValidated, setAllValidated] = useState(false)
  const [validationCount, setValidationCount] = useState(0)
  const [validatedForms, setValidatedForms] = useState(0)

  const [open, setOpen] = useState<boolean>(false)
  const [nextClicked, setNextClicked] = useState<boolean>(false)
  const [saveClicked, setSaveClicked] = useState<boolean>(false)
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // Save id doctos by file name
  // const [doctoIdByName, setDoctoIdByName] = useState({})
  const [userFile] = useState<File[]>([])

  // const [userFileToDelete, setUserFileToDelete] = useState<File>()

  //store
  const idAccount = useAppSelector(state => state.accounts?.formsData?.form1?.id)
  const lastForm1Information = useAppSelector(state => state.accounts?.formsData?.form1)

  // const [fileUrls, setFileUrls] = useState<string[]>([])

  // ** Custom Hooks
  const { getInformaByIdAccount } = useFindInformationByIdAccount()
  const { addInformation } = useAddInformation()
  const { updateInformationByIdAccount } = useUpdateInformationByIdAccount()

  // const { uploadInformationDocument } = useUploadInformationDocument()
  // const { getInfoDoctosByIdAccount } = useGetInfoDoctosByIdAccount()

  // const { deleteInformationDocument } = useDeleteInformationDocument()

  const dispatch = useAppDispatch()

  const [basicInfo, setBasicInfo] = useState<BasicInfoInterface>({
    insured: '',
    country: '',
    broker: '',
    brokerContact: '',
    brokerContactEmail: '',
    brokerContactPhone: '',
    brokerContactCountry: '',
    cedant: '',
    cedantContact: '',
    cedantContactEmail: '',
    cedantContactPhone: '',
    cedantContactCountry: '',
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

  const updateInformation = async () => {
    const res = await updateInformationByIdAccount(idAccount, {
      insured: basicInfo.insured,
      idCountry: Number(basicInfo.country),
      idBroker: Number(basicInfo.broker),
      idBrokerContact: Number(basicInfo.brokerContact),

      // brokerContactEmail: basicInfo.brokerContactEmail,
      // brokerContactPhone: basicInfo.brokerContactPhone,
      // brokerContactCountry: basicInfo.brokerContactCountry,
      idCedant: Number(basicInfo.cedant),
      idCedantContact: Number(basicInfo.cedantContact),

      // cedantContactEmail: basicInfo.cedantContactEmail,
      // cedantContactPhone: basicInfo.cedantContactPhone,
      // cedantContactCountry: basicInfo.cedantContactCountry,
      idLineOfBussines: Number(basicInfo.lineOfBusiness),
      idRiskActivity: Number(basicInfo.industryCode),
      effectiveDate: basicInfo.effectiveDate,
      expirationDate: basicInfo.expirationDate,
      receptionDate: basicInfo.receptionDate && new Date(basicInfo.receptionDate),
      idLeadUnderwriter: Number(basicInfo.leadUnderwriter) === 0 ? null : Number(basicInfo.leadUnderwriter),
      idTechnicalAssistant: Number(basicInfo.technicalAssistant) === 0 ? null : Number(basicInfo.technicalAssistant),
      idUnderwriter: Number(basicInfo.underwriter) === 0 ? null : Number(basicInfo.underwriter),
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
      idAccountType: 1
    })

    await delayMs(1000)
    if (!res) {
      setBadgeData({
        message: `ERROR UPDATING INFORMATION`,
        theme: 'error',
        open: true,
        status: 'error',
        icon: (
          <Icon
            style={{
              color: '#FF4D49',
              marginTop: '-1px'
            }}
            icon='jam:alert'
          />
        ),
        disableAutoHide: true
      })
    } else {
      setBadgeData({
        message: `UPDATED SUCCESSFULLY`,
        status: 'success',
        theme: 'success',
        open: true,
        icon: <Icon icon='ic:baseline-check-circle' />,
        disableAutoHide: true
      })
    }

    await delayMs(1000)
    setBadgeData({
      message: '',
      status: undefined,
      icon: undefined,
      open: false
    })

    return res
  }

  const saveInformation = async () => {
    const dataToSave = {
      insured: basicInfo.insured,
      idCountry: Number(basicInfo.country),
      idBroker: Number(basicInfo.broker),
      idBrokerContact: Number(basicInfo.brokerContact),
      brokerContactEmail: basicInfo.brokerContactEmail,
      brokerContactPhone: basicInfo.brokerContactPhone,
      brokerContactCountry: basicInfo.brokerContactCountry,
      idCedant: Number(basicInfo.cedant),
      idCedantContact: Number(basicInfo.cedantContact),
      cedantContactEmail: basicInfo.cedantContactEmail,
      cedantContactPhone: basicInfo.cedantContactPhone,
      cedantContactCountry: basicInfo.cedantContactCountry,
      idLineOfBussines: Number(basicInfo.lineOfBusiness),
      idRiskActivity: Number(basicInfo.industryCode),
      receptionDate: formatUTC(basicInfo.receptionDate),
      effectiveDate: formatUTC(basicInfo.effectiveDate),
      expirationDate: formatUTC(basicInfo.expirationDate),
      idLeadUnderwriter: Number(basicInfo.leadUnderwriter) === 0 ? null : Number(basicInfo.leadUnderwriter),
      idTechnicalAssistant: Number(basicInfo.technicalAssistant) === 0 ? null : Number(basicInfo.technicalAssistant),
      idUnderwriter: Number(basicInfo.underwriter) === 0 ? null : Number(basicInfo.underwriter),
      idAccountType: 1,
      riskClass: basicInfo.riskClass,

      currency: 'USD',
      exchangeRate: 1,
      attachmentPoint: 0,
      frontingFee: 4400,
      frontingFeeTotal: 2,
      grossPremium: 220000,
      limit: 3000000,
      netPremium: 180400,
      reinsuranceBrokerage: 22000,
      reinsuranceBrokerageTotal: 10,
      sir: 0,
      taxes: 13.2,
      taxesTotal: 6,
      totalValues: 3500000,
      idTypeOfLimit: 2,
      step: 1
    }

    const res = await addInformation(dataToSave)

    await delayMs(1000)
    if (!res) {
      setBadgeData({
        message: `ERROR SAVING INFORMATION`,
        theme: 'error',
        open: true,
        status: 'error',
        icon: (
          <Icon
            style={{
              color: '#FF4D49',
              marginTop: '-1px'
            }}
            icon='jam:alert'
          />
        ),
        disableAutoHide: true
      })
    } else {
      setBadgeData({
        message: `SAVED SUCCESSFULLY`,
        status: 'success',
        theme: 'success',
        open: true,
        icon: <Icon icon='ic:baseline-check-circle' />,
        disableAutoHide: true
      })
    }

    await delayMs(1000)
    setBadgeData({
      message: '',
      status: undefined,
      icon: undefined,
      open: false
    })

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
        brokerContactEmail: information.brokerContactEmail || '',
        brokerContactPhone: information.brokerContactPhone || '',
        brokerContactCountry: information.brokerContactCountry || '',
        cedant: information?.idCedant || '',
        cedantContact: information.idCedantContact || '',
        cedantContactEmail: information.cedantContactEmail || '',
        cedantContactPhone: information.cedantContactPhone || '',
        cedantContactCountry: information.cedantContactCountry || '',
        lineOfBusiness: information.idLineOfBussines || '',
        underwriter: information.idUnderwriter || '',
        leadUnderwriter: information.idLeadUnderwriter || '',
        technicalAssistant: information.idTechnicalAssistant || '',
        industryCode: information.idRiskActivity || '',
        riskActivity: '',
        riskClass: information.riskClass,
        receptionDate: information.receptionDate ? new Date(information.receptionDate) : null,
        effectiveDate: information.effectiveDate ? new Date(information.effectiveDate) : null,
        expirationDate: information.expirationDate ? new Date(information.expirationDate) : null
      }

      const obPlacementStructure = {
        currency: 'USD',
        typeOfLimit: '',
        exchangeRate: 1,
        attachmentPoint: 0,
        frontingFee: 4400,
        frontingFeeTotal: 2,
        grossPremium: 220000,
        limit: 3000000,
        netPremium: 180400,
        reinsuranceBrokerage: 22000,
        reinsuranceBrokerageTotal: 10,
        sir: 0,
        taxes: 13.2,
        taxesTotal: 6,
        totalValues: 3500000,
        idTypeOfLimit: '2',
        total: 234,
        reinsuranceBrokerageP: 0.0,
        taxesP: 0.0,
        frontingFeeP: 0.0
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

  // const uploadDoctos = async (idAccount: number) => {
  //   const formatedDoctos = await formatInformationDoctos(userFile, idAccount, 1, doctoIdByName)
  //   const newDoctoIdByName: any = {}

  //   await delayMs(1000)
  //   if (formatedDoctos.length === 0) {
  //     setBadgeData({
  //       message: '',
  //       status: undefined,
  //       icon: undefined,
  //       open: false
  //     })

  //     return
  //   }

  //   setBadgeData({
  //     message: `UPDATING DOCUMENTS`,
  //     status: 'secondary',
  //     open: true,
  //     icon: <CircularProgress size={20} color='primary' />,
  //     backgroundColor: '#828597',
  //     theme: 'info',
  //     disableAutoHide: true
  //   })

  //   for (const docto of formatedDoctos) {
  //     const res = await uploadInformationDocument(docto)
  //     const createdDoctoData = res?.createdDoctoDB
  //     if (createdDoctoData) {
  //       newDoctoIdByName[createdDoctoData.name] = createdDoctoData.id
  //     }

  //     if (!res) {
  //       setBadgeData({
  //         message: `ERROR UPDATING DOCUMENT: ${docto.name}`,
  //         theme: 'error',
  //         open: true,
  //         status: 'error',
  //         icon: (
  //           <Icon
  //             style={{
  //               color: '#FF4D49',
  //               marginTop: '-1px'
  //             }}
  //             icon='jam:alert'
  //           />
  //         ),
  //         disableAutoHide: true
  //       })
  //     } else {
  //       setBadgeData({
  //         message: `DOC: "${docto.name.toUpperCase()}", SAVED SUCCESSFULLY`,
  //         status: 'success',
  //         open: true,
  //         icon: <Icon icon='ic:baseline-check-circle' />,
  //         theme: 'success',
  //         disableAutoHide: true
  //       })
  //     }

  //     await delayMs(800)
  //   }

  //   setBadgeData({
  //     message: '',
  //     status: undefined,
  //     icon: undefined,
  //     open: false
  //   })

  //   setDoctoIdByName({
  //     ...doctoIdByName,
  //     ...newDoctoIdByName
  //   })
  // }

  const handleSaveInformation = async () => {
    if (idAccount) {
      setBadgeData({
        message: `UPDATING INFORMATION`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='primary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })

      await updateInformation()

      // await uploadDoctos(idAccount)
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: idAccount } }))
      setDisableSave(false)
    } else {
      setBadgeData({
        message: `SAVING INFORMATION`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='secondary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })

      const res = await saveInformation()
      setDisableSave(false)
      if (res) {
        localStorage.setItem('idAccount', String(res.account.id))
      }

      // await uploadDoctos(res.account.id)
      dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: res?.account?.id } }))

      onIsNewAccountChange(false)
    }
  }

  //Evento que controla el evento de continuar
  const handleNextStep = async () => {
    if (allValidated) {
      await handleSaveInformation()
      onStepChange(2)
    }
    handleCloseModal()
  }

  const handleValidationComplete = (valid: boolean) => {
    setValidationCount(prevCount => prevCount + 1)
    if (valid) {
      setValidatedForms(prevCount => prevCount + 1)
    }
  }

  const handleAction = (action: string) => {
    setValidationCount(0)
    setValidatedForms(0)
    switch (action) {
      case 'save':
        setSaveClicked(true)
        break
      case 'next':
        setNextClicked(true)
        break
      default:
        break
    }

    setMakeValidations(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const resetMakeValidations = () => {
    setMakeValidations(false)
  }

  // const onSubmittedFiles = (change: boolean) => {
  //   setChangeTitle(change)
  // }

  useEffect(() => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    dispatch(updateFormsData({ form1: { ...lastForm1Information, id: idAccountCache } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValidated])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfo, setBasicInfo])

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fileUrls])

  // useEffect(() => {
  //   const getFiles = async () => {
  //     const idAccountCache = Number(localStorage.getItem('idAccount'))
  //     if (idAccountCache) {
  //       const res = await getInfoDoctosByIdAccount(idAccountCache)
  //       const newDoctoIdByName: any = {}
  //       const newUserFiles: File[] = []

  //       if (res.length > 0) {
  //         const urls: string[] = []
  //         for (const docto of res) {
  //           newDoctoIdByName[docto.name] = docto.id
  //           urls.push(docto.url)
  //           const newFile = await getFileFromUrl(docto.url, docto.name)
  //           if (newFile) {
  //             newUserFiles.push(newFile)
  //           }
  //         }

  //         setFileUrls(urls)
  //         setUserFile(newUserFiles)

  //         setDoctoIdByName({
  //           ...doctoIdByName,
  //           ...newDoctoIdByName
  //         })
  //       }
  //     }
  //   }
  //   getFiles()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   const deleteFile = async (userFileToDelete: File) => {
  //     const fileName = String(userFileToDelete.name)
  //     const idDocto = doctoIdByName[fileName as keyof typeof doctoIdByName]

  //     if (idDocto) {
  //       const bodyToDelete = {
  //         idAccount: idAccount,
  //         idDocto,
  //         fileName: fileName
  //       }
  //       await deleteInformationDocument(bodyToDelete)
  //       delete doctoIdByName[fileName as keyof typeof doctoIdByName]
  //     }
  //   }

  //   if (userFileToDelete && idAccount) {
  //     deleteFile(userFileToDelete)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userFileToDelete])

  useEffect(() => {
    if (idAccount) {
      setDataInformation()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccount])

  useEffect(() => {
    console.log(validationCount)
    console.log(validatedForms)
    if (validationCount === 1 && validatedForms === 1) {
      setAllValidated(true)
      if (nextClicked) {
        setOpen(true)
        setNextClicked(false)
      }
      if (saveClicked) {
        setDisableSave(true)
        handleSaveInformation()
        setSaveClicked(false)
      }
    } else {
      setAllValidated(false)
      if (nextClicked) {
        setOpen(true)
        setNextClicked(false)
      }
    }
    resetMakeValidations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationCount, validatedForms])

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
              onValidationComplete={handleValidationComplete}
            />
          </div>

          {/* <div className='section'>
            <PlacementStructure
              placementStructure={placementStructure}
              setPlacementStructure={setPlacementStructure}
              makeValidations={makeValidations}
              onValidationComplete={handleValidationComplete}
            />
          </div>

          <div className='section'>
            <div className='title'>{changeTitle ? 'Submited files' : 'File submit'}</div>
            <FileSubmit
              userFile={userFile}
              urls={fileUrls}
              setUserFile={setUserFile}
              setUserFileToDelete={setUserFileToDelete}
              changeTitle={onSubmittedFiles}
            />
          </div> */}
          <div className='section action-buttons'>
            <Button
              className='btn-save'
              onClick={() => handleAction('save')}
              variant='contained'
              disabled={disableSave}
            >
              <div className='btn-icon'>
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
            {/* <Button
              className='btn-next'
              onClick={() => {
                handleAction('next')
              }}
            >
              Next Step
              <div className='btn-icon'>
                <Icon icon='material-symbols:arrow-right-alt' />
              </div>
            </Button> */}

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
                  padding: '20px'
                }}
              >
                {allValidated ? (
                  <>
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
                      You are about to advance to the next form. Make sure that all the fields have been completed with
                      the correct information.
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
                  </>
                ) : (
                  <>
                    <HeaderTitleModal>
                      <div className='next-modal-title'>Incomplete Information</div>
                      <ButtonClose
                        onClick={() => {
                          setOpen(false)
                        }}
                      >
                        <CloseIcon />
                      </ButtonClose>
                    </HeaderTitleModal>
                    <div className='next-modal-text'>
                      Please fill out all the required files to proceed to the next form.
                    </div>
                    <Button
                      className='ok-modal-btn'
                      variant='contained'
                      onClick={() => {
                        setOpen(false)
                        setNextClicked(false)
                      }}
                    >
                      OK
                    </Button>
                  </>
                )}
              </Box>
            </Modal>
          </div>
        </form>
      </div>
    </>
  )
}

export default Information
