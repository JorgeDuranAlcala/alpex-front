/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

// ** Theme
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Custom Hooks
import { useAddEndorsement } from '@/hooks/endorsement/useAdd'
import {
  useDeleteInformationDocument,
  useFindInformationByIdAccount,
  useGetInfoDoctosByIdAccount
} from 'src/hooks/accounts/information'

// ** Components
import PlacementStructureBound from 'src/views/accounts/bound-account-steps/Information/PlacementStructureBound'
import BasicInfo from 'src/views/accounts/new-account-steps/Information/BasicInfo'
import FileSubmit from 'src/views/accounts/new-account-steps/Information/FileSubmit'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, Modal } from '@mui/material'

// ** Rxjs
import { Subject } from 'rxjs'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Redux
import { updateEndorsement } from '@/store/apps/endorsement'
import { useAppDispatch, useAppSelector } from 'src/store'

// ** Styles
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'

// ** Utils
import { delayMs, formatUTC } from '@/utils/formatDates'
import { getFileFromUrl } from '@/utils/formatDoctos'

// ** Dtos
import { DiscountDto } from '@/services/accounts/dtos/discount.dto'

// ** Utils
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { DisableForm } from 'src/views/accounts/new-account-steps/_commons/DisableForm'

// ** Nextjs
import { useRouter } from 'next/router'

export interface InformationSectionsInt {
  basicInfo: boolean
  placementStructure: boolean
}

type InformationProps = {
  onStepChange: (step: number) => void
  disableSectionCtrl?: InformationSectionsInt
}

export interface BasicInfoInterface {
  insured: string
  country: number | string
  economicSector: number | string
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
  industryCode: number | string | null | undefined
  riskActivity: string
  riskClass: number
  receptionDate: Date | null
  effectiveDate: Date | null
  expirationDate: Date | null
  idAccountType: number
  typeLogo: number | null
}

export interface PlacementStructure {
  currency: string
  total: number
  sir: number
  reinsuranceBrokerageP: number
  taxesP: number
  frontingFeeP: number
  netPremium: number
  netPremiumWithTaxes: number
  netPremiumWithoutDiscounts: number
  exchangeRate: number
  limit: number
  grossPremium: number
  reinsuranceBrokerage: number
  taxes: number
  frontingFee: number
  attachmentPoint: number
  typeOfLimit: string | number | null
}

const InformationBound: React.FC<InformationProps> = ({ onStepChange, disableSectionCtrl }) => {
  const router = useRouter()
  const idAccountRouter = Number(router?.query?.idAccount)

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const [subjectState] = useState<Subject<void>>(new Subject())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [makeValidations, setMakeValidations] = useState(false)
  const [makeSaveValidations, setMakeSaveValidations] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableSave, setDisableSave] = useState(false)
  const [changeTitle, setChangeTitle] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [discounts, setDiscounts] = useState<DiscountDto[]>([])
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // Validaciones
  const [allValidated, setAllValidated] = useState(false)
  const [validationCount, setValidationCount] = useState(0)
  const [validatedForms, setValidatedForms] = useState(0)
  const [updateInfo, setUpdateInfo] = useState<boolean>(false)

  const [open, setOpen] = useState<boolean>(false)
  const [nextClicked, setNextClicked] = useState<boolean>(false)
  const [saveClicked, setSaveClicked] = useState<boolean>(false)

  // Save id doctos by file name
  const [doctoIdByName, setDoctoIdByName] = useState({})
  const [userFile, setUserFile] = useState<File[]>([])
  const [userFileToDelete, setUserFileToDelete] = useState<File>()

  // Redux
  const endorsementData = useAppSelector(state => state.endorsement.data)
  const dispatch = useAppDispatch()

  const [fileUrls, setFileUrls] = useState<string[]>([])

  // ** Custom Hooks
  const { getInformaByIdAccount } = useFindInformationByIdAccount()

  // const { uploadInformationDocument } = useUploadInformationDocument()
  const { getInfoDoctosByIdAccount } = useGetInfoDoctosByIdAccount()
  const { deleteInformationDocument } = useDeleteInformationDocument()

  // const { addDiscounts } = useAddDiscounts()
  // const { UpdateDiscounts } = useUpdateDiscounts()
  const { addEndorsement } = useAddEndorsement()

  const [basicInfo, setBasicInfo] = useState<BasicInfoInterface>({
    insured: '',
    country: '',
    economicSector: '',
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
    expirationDate: null,
    idAccountType: 1,
    typeLogo: null
  })

  const [placementStructure, setPlacementStructure] = useState<PlacementStructure>({
    currency: '',
    total: 0.0,
    sir: 0.0,
    reinsuranceBrokerageP: 0.0,
    taxesP: 0.0,
    frontingFeeP: 0.0,
    netPremium: 0.0,
    netPremiumWithTaxes: 0.0,
    netPremiumWithoutDiscounts: 0.0,
    exchangeRate: 0.0,
    limit: 0.0,
    grossPremium: 0.0,
    reinsuranceBrokerage: 0.0,
    taxes: 0.0,
    frontingFee: 0.0,
    attachmentPoint: 0.0,
    typeOfLimit: ''
  })

  const setDataInformation = async () => {
    let information

    if (endorsementData.initialized) {
      information = endorsementData.information
    } else {
      information = await getInformaByIdAccount(idAccountRouter)
    }

    if (!information) return

    const obBasicInfo = {
      insured: information.insured || '',
      country: information.idCountry || '',
      economicSector: information.idEconomicSector || '',
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
      riskClass: Number(information.riskClass),
      receptionDate: information.receptionDate ? new Date(information.receptionDate) : null,
      effectiveDate: information.effectiveDate ? new Date(information.effectiveDate) : null,
      expirationDate: information.expirationDate ? new Date(information.expirationDate) : null,
      idAccountType: Number(information.idAccountType),
      typeLogo: information.typeLogo ? information.typeLogo : null
    }

    const obPlacementStructure = {
      currency: information.currency || '',
      typeOfLimit: information.idTypeOfLimit || '',
      exchangeRate: Number(information.exchangeRate) || 0.0,
      attachmentPoint: Number(information.attachmentPoint) || 0.0,
      frontingFee: Number(information.frontingFee) || 0.0,
      grossPremium: Number(information.grossPremium) || 0.0,
      limit: Number(information.limit) || 0.0,
      netPremium: Number(information.netPremium) || 0.0,
      reinsuranceBrokerage: Number(information.reinsuranceBrokerage) || 0.0,
      sir: Number(information.sir) || 0.0,
      taxes: Number(information.taxes) || 0.0,
      total: Number(information.totalValues) || 0.0,
      reinsuranceBrokerageP: Number(information.reinsuranceBrokerageTotal) || 0.0,
      taxesP: Number(information.taxesTotal) || 0.0,
      frontingFeeP: Number(information.frontingFeeTotal) || 0.0,
      netPremiumWithTaxes: Number(information.premiumWithTaxes) || 0.0,
      netPremiumWithoutDiscounts: Number(information.premiumWithOutDiscounts) || 0.0
    }

    setBasicInfo(obBasicInfo)
    setUpdateInfo(true)
    setPlacementStructure(obPlacementStructure)
  }

  // const uploadDoctos = async (idAccount: number) => {
  //   const formatedDoctos = await formatInformationDoctos(userFile, idAccount, 1, doctoIdByName)
  //   const newDoctoIdByName: any = {}

  //   if (formatedDoctos.length === 0) {
  //     return
  //   }

  //   for (const docto of formatedDoctos) {
  //     const res = await uploadInformationDocument(docto)
  //     const createdDoctoData = res?.createdDoctoDB
  //     if (createdDoctoData) {
  //       newDoctoIdByName[createdDoctoData.name] = createdDoctoData.id
  //     }
  //   }

  //   setDoctoIdByName({
  //     ...doctoIdByName,
  //     ...newDoctoIdByName
  //   })
  // }

  // const updateDiscount = async () => {
  //   const discountSave: Partial<DiscountDto[]> = []
  //   const discountUpdate: DiscountDto[] = []

  //   for await (const discount of discounts) {
  //     if (discount.id !== 0) {
  //       discountUpdate.push(discount)
  //     } else {
  //       discountSave.push(discount)
  //     }
  //   }
  //   if (discountUpdate.length > 0) {
  //     await UpdateDiscounts(discountUpdate)
  //   }

  //   if (discountSave.length > 0) {
  //     await addDiscounts(discountSave)
  //   }

  //   triggerFunction()
  // }

  const handleSaveInformation = async () => {
    // if (idAccount) {
    //   await updateInformation()
    //   await uploadDoctos(idAccount)
    //   await updateDiscount()
    //   dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: idAccount } }))
    //   setDisableSave(false)
    // } else {
    //   await saveInformation()
    //   setDisableSave(false)

    //   if (res) {
    //     const discountTemp = discounts.map(discount => ({
    //       ...discount,
    //       idAccount: res.account.id
    //     }))
    //     await localStorage.setItem('idAccount', String(res.account.id))
    //     if (discountTemp.length > 0) {
    //       await addDiscounts(discountTemp)
    //       triggerFunction()
    //     }
    //   }

    //   await uploadDoctos(res.account.id)
    //   dispatch(updateFormsData({ form1: { basicInfo, placementStructure, userFile, id: res?.account?.id } }))
    // }
    if (!endorsementData.initialized) return
    const dataToUpdate = {
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
      riskClass: Number(basicInfo.riskClass),
      currency: placementStructure.currency,
      exchangeRate: placementStructure.exchangeRate,
      attachmentPoint: placementStructure.attachmentPoint,
      frontingFee: placementStructure.frontingFee,
      frontingFeeTotal: placementStructure.frontingFeeP,
      grossPremium: placementStructure.grossPremium,
      limit: placementStructure.limit,
      netPremium: placementStructure.netPremium,
      premiumWithTaxes: placementStructure.netPremiumWithTaxes,
      premiumWithOutDiscounts: placementStructure.netPremiumWithoutDiscounts,
      reinsuranceBrokerage: placementStructure.reinsuranceBrokerage,
      reinsuranceBrokerageTotal: placementStructure.reinsuranceBrokerageP,
      sir: placementStructure.sir,
      taxes: placementStructure.taxes,
      taxesTotal: placementStructure.taxesP,
      totalValues: placementStructure.total,
      idTypeOfLimit: Number(placementStructure.typeOfLimit),
      idAccountType: Number(basicInfo.idAccountType),
      step: 1,
      idEconomicSector: Number(basicInfo.economicSector) || null
    }
    const newEndorsementData = {
      ...endorsementData,
      information: {
        ...endorsementData.information,
        ...dataToUpdate
      },
      discounts: [...discounts]
    }

    dispatch(updateEndorsement(newEndorsementData))
  }

  const handleDiscountsChange = (newDiscounts: DiscountDto[]) => {
    const discountsTemp = newDiscounts.map(discount => ({
      ...discount,
      idAccount: idAccountRouter || 0
    }))
    setDiscounts(discountsTemp)
  }

  //Evento que controla el evento de continuar
  const handleNextStep = async () => {
    if (allValidated) {
      await handleSaveInformation()
      onStepChange(2)
    }
    handleCloseModal()
  }

  const handleValidationComplete = (valid: boolean, formName: string) => {
    setValidationCount(prevCount => prevCount + 1)

    //controller to update and save when the next button is clicked
    if (nextClicked) {
      if (valid && makeValidations) {
        if (nextClicked) setValidatedForms(prevCount => prevCount + 1)

        if (formName == 'basicInfo' && saveClicked) {
          // If Basic info is validated and save button was clicked then save information
          setMakeSaveValidations(false)
          setDisableSave(true)
          handleSaveInformation()

          setSaveClicked(false)
        }
      } else {
        setMakeValidations(false)
        setNextClicked(false)
      }
    }
  }

  const handleEndorsement = async () => {
    if (endorsementData.type?.toLowerCase() === 'informative') {
      setBadgeData({
        message: `ENDORSING`,
        status: 'secondary',
        open: true,
        icon: <CircularProgress size={20} color='secondary' />,
        backgroundColor: '#828597',
        theme: 'info',
        disableAutoHide: true
      })
      await delayMs(1000)

      const newEndorsementData = {
        ...endorsementData,
        information: {
          ...endorsementData.information,
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
          idTechnicalAssistant:
            Number(basicInfo.technicalAssistant) === 0 ? null : Number(basicInfo.technicalAssistant),
          idUnderwriter: Number(basicInfo.underwriter) === 0 ? null : Number(basicInfo.underwriter),
          riskClass: Number(basicInfo.riskClass),
          idAccountType: Number(basicInfo.idAccountType),
          idEconomicSector: Number(basicInfo.economicSector) || null
        }
      }

      const res = await addEndorsement(newEndorsementData)

      if (!res) {
        setBadgeData({
          message: `ENDORSEMENT ERROR`,
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
          message: `ENDT. GENERATED`,
          status: 'success',
          open: true,
          icon: <Icon icon='ic:baseline-check-circle' />,
          theme: 'success',
          disableAutoHide: true
        })
      }

      await delayMs(1500)

      setBadgeData({
        message: '',
        status: undefined,
        icon: undefined,
        open: false
      })
    }
  }

  const handleAction = (action: string) => {
    setValidationCount(0)
    setValidatedForms(0)
    switch (action) {
      case 'next':
        setNextClicked(true)
        setMakeValidations(true)
        break

      case 'endorsement':
        setMakeSaveValidations(true)
        handleEndorsement()
        break

      default:
        break
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const resetMakeValidations = () => {
    setMakeValidations(false)
  }

  const onSubmittedFiles = (change: boolean) => {
    setChangeTitle(change)
  }

  useEffect(() => {
    const getFiles = async () => {
      if (idAccountRouter) {
        const res = await getInfoDoctosByIdAccount(idAccountRouter)
        const newDoctoIdByName: any = {}
        const newUserFiles: File[] = []

        if (res.length > 0) {
          const urls: string[] = []
          for (const docto of res) {
            newDoctoIdByName[docto.name] = docto.id
            urls.push(docto.url)
            const newFile = await getFileFromUrl(docto.url, docto.name)
            if (newFile) {
              newUserFiles.push(newFile)
            }
          }

          setFileUrls(urls)
          setUserFile(newUserFiles)

          setDoctoIdByName({
            ...doctoIdByName,
            ...newDoctoIdByName
          })
        }
      }
    }
    getFiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const deleteFile = async (userFileToDelete: File) => {
      const fileName = String(userFileToDelete.name)
      const idDocto = doctoIdByName[fileName as keyof typeof doctoIdByName]

      if (idDocto) {
        const bodyToDelete = {
          idAccount: idAccountRouter,
          idDocto,
          fileName: fileName
        }
        await deleteInformationDocument(bodyToDelete)
        delete doctoIdByName[fileName as keyof typeof doctoIdByName]
      }
    }

    if (userFileToDelete && idAccountRouter) {
      deleteFile(userFileToDelete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFileToDelete])

  useEffect(() => {
    if (idAccountRouter) {
      setDataInformation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccountRouter])

  useEffect(() => {
    if (validationCount === 2 && validatedForms === 2) {
      setAllValidated(true)
      if (nextClicked) {
        setOpen(true)
        setNextClicked(false)
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
        <CustomAlert {...badgeData} />
        <form noValidate autoComplete='on' onSubmit={handleNextStep}>
          <div className='section'>
            <DisableForm isDisabled={disableSectionCtrl?.basicInfo} sg={5000}>
              <BasicInfo
                basicInfo={basicInfo}
                setBasicInfo={setBasicInfo}
                makeValidations={makeValidations}
                makeSaveValidations={makeSaveValidations}
                onValidationComplete={handleValidationComplete}
                setUpdateInfo={setUpdateInfo}
              />
            </DisableForm>
          </div>
          <div className='section'>
            <DisableForm isDisabled={disableSectionCtrl?.placementStructure} sg={5000}>
              <PlacementStructureBound
                placementStructure={placementStructure}
                setPlacementStructure={setPlacementStructure}
                onDiscountsChange={handleDiscountsChange}
                makeValidations={makeValidations}
                onValidationComplete={handleValidationComplete}
                triggerSubject={subjectState}
              />
            </DisableForm>
          </div>

          <div className='section' style={{ display: 'none' }}>
            <div className='title'>{changeTitle ? 'Submited files' : 'File submit'}</div>
            <FileSubmit
              userFile={userFile}
              urls={fileUrls}
              setUserFile={setUserFile}
              setUserFileToDelete={setUserFileToDelete}
              changeTitle={onSubmittedFiles}
              isPayments={false}
            />
          </div>
          <div className='section action-buttons'>
            <Button
              className='btn-endorsement'
              onClick={() => handleAction('endorsement')}
              variant='contained'
              disabled={!(endorsementData?.type?.toLowerCase() === 'informative')}
            >
              <div className='btn-icon' style={{ marginRight: '8px' }}>
                <Icon icon='material-symbols:approval-outline' />
              </div>
              ENDORSE
            </Button>
            <Button
              className='btn-next'
              onClick={() => {
                handleAction('next')
              }}
              disabled={endorsementData?.type?.toLowerCase() === 'informative'}
            >
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
                  left: { xs: '8%', md: '50%' },
                  boxShadow: 24,
                  pl: 5,
                  pr: 5,
                  transform: { xs: 'translate(-4%, -50%)', md: 'translate(-50%, -50%)' },
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

export default InformationBound
