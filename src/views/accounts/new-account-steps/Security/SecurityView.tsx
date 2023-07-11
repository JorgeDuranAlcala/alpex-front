import { ResponseGetAccount, useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSecurities } from '@/hooks/accounts/security'
import { useAddSecurityTotal, useUpdateSecurityTotalById } from '@/hooks/accounts/securityTotal'
import {
  FormInformation,
  FormSecurity,
  SecurityContextDto,
  SecurityDto,
  SecurityProps
} from '@/services/accounts/dtos/security.dto'

import { useAppSelector } from '@/store'

import { Title } from '@/styled-components/accounts/Security.styled'
import { ButtonClose, HeaderTitleModal } from '@/styles/modal/modal.styled'
import { FormSection } from '@/views/accounts/new-account-steps/Security/components/SecurityForm'
import { NumericFormatCustom } from '@/views/components/inputs/numeric-format/NumericFormatCustom'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  TextField
} from '@mui/material'
import { createContext, useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { SecurityMapper } from './mappers/SecurityForm.mapper'

import { SecondViewProvider } from './components/secondView/SecondViewProvider'
import { CalculateSecurity } from './utils/calculates-securities'

export const SecurityContext = createContext<SecurityContextDto>({} as SecurityContextDto)
let securitiesSecondView: SecurityDto[] = []
let allFormDataView2: FormSecurity = {
  formData: [],
  recievedNetPremium: 0,
  distribuitedNetPremium: 0,
  diference: 0
}
const Security = ({ onStepChange }: SecurityProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const [securities, setSecurities] = useState<SecurityDto[]>([])

  const [firstTimeSecurities, setFirstTimeSecurities] = useState<SecurityDto[]>([])
  const [activeErros, setActiveErrors] = useState<boolean>(false)

  //** second view */
  // const [securitiesSecondView, setSecuritiesSecondView] = useState<SecurityDto[]>([])

  // const [allFormDataView2, setAllFormDataView2] = useState<FormSecurity>({
  //   formData: [],
  //   recievedNetPremium: 0,
  //   distribuitedNetPremium: 0,
  //   diference: 0
  // })
  const [currentView, setCurrentView] = useState<number>(0)

  const [isNextStep, setIsNextStep] = useState<boolean>(false)
  const [allFormData, setAllFormData] = useState<FormSecurity>({
    formData: [],
    recievedNetPremium: 0,
    distribuitedNetPremium: 0,
    diference: 0
  })
  const [allErrors, setAllErrors] = useState<boolean[]>([])

  const [openNextModal, setOpenNextModal] = useState<boolean>(false)
  const [information, setInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0,
    limit: 0
  })
  const [companiesSelect] = useState<number[]>([])

  const { account, setAccountId, getAccountById, accountId } = useGetAccountById()
  const { saveSecurityTotal } = useAddSecurityTotal()
  const { updateSecurityTotal } = useUpdateSecurityTotalById()

  // const { updateSecurities } = useUpdateSecurities()
  const { saveSecurities } = useAddSecurities()

  const accountData = useAppSelector(state => state.accounts)

  const inter = userThemeConfig.typography?.fontFamilyInter
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })
  const getSecuritiesCalculate = (securitiesParam: SecurityDto[]): SecurityDto[] => {
    const tempSecurities: SecurityDto[] = []

    for (const securityOrigin of securitiesParam) {
      const security = { ...securityOrigin }
      const operationSecurity: CalculateSecurity = new CalculateSecurity()
        .setInformation(information)
        .setSecurity(security)
      if (security?.idCReinsuranceCompany?.id) companiesSelect.push(security.idCReinsuranceCompany.id)
      console.log({ security })

      security.frontingFee = Number(security.frontingFee) || 0
      security.taxes = Number(security.taxes) || 0
      security.netPremiumAt100 = Number(security.netPremiumAt100) || 0

      security.premiumPerShareAmount = operationSecurity.getPremierPerShare() || 0

      security.grossPremiumPerShare = operationSecurity.getGrossPremierPerShare() || 0
      security.brokerAgeAmount = operationSecurity.getBrokerAge() || 0
      security.dynamicCommissionAmount = operationSecurity.getDynamicComissionAmount() || 0

      security.frontingFeeAmount = operationSecurity.getFrontingFeeAmount(security.frontingFee) || 0

      security.taxesAmount = operationSecurity.getTaxesAmount(security.taxes) || 0

      security.shareAmount = operationSecurity.getShareAmount() || 0
      security.share = Number(security.share) || 0

      operationSecurity.setSecurity(security)
      const tempDiscountList = []
      if (security?.discounts) {
        security.totalAmountOfDiscounts = 0
        for (const discount of security?.discounts) {
          discount.percentage = Number(discount.percentage)
          discount.amount = operationSecurity.getDiscountAmount(Number(discount.percentage))
          security.totalAmountOfDiscounts += discount.amount
          tempDiscountList.push(discount)
        }
      }

      security.discounts = tempDiscountList
      security.netReinsurancePremium = operationSecurity.getNetReinsurancePremium() || 0

      tempSecurities.push({
        ...security,
        difference: Number(security.difference) || 0,
        distributedNetPremium: Number(security.distributedNetPremium) || 0,
        dynamicCommission: Number(security.dynamicCommission),

        receivedNetPremium: Number(security.receivedNetPremium) || 0,
        reinsuranceBrokerage: Number(security.reinsuranceBrokerage) || 0
      })
    }

    return tempSecurities
  }
  const calculateSecurities = (
    securitiesParam: SecurityDto[],

    view = 0,
    isFirstTime = false
  ) => {
    if (securitiesParam.length > 0 && information && currentView !== 3) {
      companiesSelect.splice(0, companiesSelect.length)
      const tempSecurities = getSecuritiesCalculate(securitiesParam)
      let dataFormView2: FormSecurity = {} as FormSecurity
      let tempSecuritiesView2: SecurityDto[] = []

      tempSecuritiesView2 = getSecuritiesCalculate(
        tempSecurities.map(security => ({
          ...security,
          netPremiumAt100: security.isGross ? information.grossPremium : information.netPremium,
          view: view === 3 ? 1 : 2
        }))
      )

      dataFormView2 = {
        ...allFormDataView2,
        formData: tempSecuritiesView2,
        ...CalculateSecurity.getData(tempSecuritiesView2)
      }
      securitiesSecondView = [...tempSecuritiesView2]
      allFormDataView2 = dataFormView2
      console.log('view dentro de calculate', { view, dataFormView2, tempSecuritiesView2 })
      if (view === 3) {
        if (account) {
          if (account.securitiesTotal[0])
            dataFormView2 = {
              ...dataFormView2,
              id: account.securitiesTotal[0].id
            }
        }

        setAllFormData(dataFormView2)

        setAllErrors(allErrors.map(error => error))

        setSecurities(tempSecuritiesView2)

        setCurrentView(0)
        securitiesSecondView = []
        allFormDataView2 = {
          formData: [],
          recievedNetPremium: 0,
          distribuitedNetPremium: 0,
          diference: 0
        }

        return
      }

      if (currentView < 2) {
        let dataForm: FormSecurity = {
          ...allFormData,
          formData: tempSecurities,
          ...CalculateSecurity.getData(tempSecurities, dataFormView2)
        }

        if (account) {
          if (account.securitiesTotal[0])
            dataForm = {
              ...dataForm,
              id: account.securitiesTotal[0].id
            }
        }
        setAllFormData(dataForm)

        setAllErrors(allErrors.map(error => error))
        console.log({ tempSecurities, view })
        setSecurities(tempSecurities)
      }

      if (isFirstTime) {
        setFirstTimeSecurities(tempSecurities)
      }
    }
  }

  const addNewForm = () => {
    const securityNew = {} as SecurityDto
    calculateSecurities([...securities, { ...securityNew, frontingFeeActive: false, view: 1 }])
  }

  const handleNextStep = () => {
    const isError = allErrors.find(error => error)
    setActiveErrors(isError || false)
    if (!isError) setOpenNextModal(true)
  }

  const handleCloseModal = () => {
    setOpenNextModal(false)
  }

  const onNextStep = () => {
    SaveData()
    setIsNextStep(true)
    handleCloseModal()
  }

  const SaveData = async () => {
    // const isError = allErrors.find(error => error)

    // if (!isError) {
    const update: Partial<SecurityDto>[] = []
    const save: Partial<SecurityDto>[] = []

    for (const security of securities) {
      // * Con esta validación no se guardarán los datos de la vista 2
      if (security.view === 2) return

      // Todo quitar el as any
      const mapper = SecurityMapper.securityToSecurityForm(security, accountData as any)

      save.push({ ...mapper, view: 1 })
    }

    if (!allFormData.id) {
      await saveSecurityTotal([
        {
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id,
          view: 1
        }
      ])
        .then(response => {
          console.log('saveSecurityTotal', { response })
        })
        .catch(e => {
          console.log('saveSecurityTotal', e)
        })
    } else {
      await updateSecurityTotal([
        {
          id: +allFormData.id,
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id,
          view: 1
        }
      ])
        .then(response => {
          console.log('updateSecurityTotal', { response })
        })
        .catch(e => {
          console.log('updateSecurityTotal', e)
        })
    }

    if (save.length > 0) {
      await saveSecurities({ idAccount: +accountData.formsData.form1.id, securities: save })
        .then(async res => {
          console.log('saveSecurities', { res })
          const accountById: Partial<ResponseGetAccount> = await getAccountById(Number(accountId))
            .then(account => {
              if (account) {
                account.securities =
                  account.securities.length === 0
                    ? [{ frontingFeeActive: false, isGross: false } as SecurityDto]
                    : account.securities
              }

              return account
            })
            .catch((error: Error) => {
              console.log(error)

              return {}
            })

          const accountSecurities = accountById?.securities as SecurityDto[]

          if (accountSecurities && information) {
            calculateSecurities(accountSecurities, 0, true)
            accountById.securitiesTotal &&
              setAllFormData({
                ...allFormData,
                recievedNetPremium: Number(accountById.securitiesTotal[0].receivedNetPremium),
                distribuitedNetPremium: Number(accountById.securitiesTotal[0].distributedNetPremium),
                diference: Number(accountById.securitiesTotal[0].difference),
                id: Number(accountById.securitiesTotal[0].id)
              })
          }

          update.length === 0 &&
            setBadgeData({
              message: 'THE INFORMATION HAS BEEN SAVED',
              theme: 'success',
              open: true,
              status: 'error'
            })
        })
        .catch(e => {
          console.log('ERROR saveSecurities', e)

          setBadgeData({
            message: 'Error saving data',
            theme: 'error',
            open: true,
            status: 'error',
            icon: <Icon style={{ color: '#FF4D49' }} icon='icon-park-outline:error' />
          })
        })

      setTimeout(() => {
        setBadgeData({
          ...badgeData,
          open: false
        })
      }, 2000)
    }
  }

  const DeleteNewForm = (index: number) => {
    const updatedSecurities = [...securities]
    const updatedErrors = [...allErrors]

    updatedSecurities.splice(index, 1)
    updatedErrors.splice(index, 1)

    calculateSecurities([...updatedSecurities])
    setAllErrors(() => [...updatedErrors])
  }

  useEffect(() => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    if (accountData.formsData.form1.id) {
      setAccountId(accountData.formsData.form1.id || idAccountCache)
      const data = accountData.formsData.form1.placementStructure as FormInformation
      setInformation(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.formsData.form1.id])

  useEffect(() => {
    if (account && information) {
      calculateSecurities(account.securities, 0, true)

      account.securitiesTotal.length > 0 &&
        setAllFormData({
          ...allFormData,
          recievedNetPremium: Number(account.securitiesTotal[0].receivedNetPremium),
          distribuitedNetPremium: Number(account.securitiesTotal[0].distributedNetPremium),
          diference: Number(account.securitiesTotal[0].difference),
          id: Number(account.securitiesTotal[0].id)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, information])

  useEffect(() => {
    if (isNextStep) onStepChange(3)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextStep])

  useEffect(() => {
    if (currentView === 3) calculateSecurities(securities, currentView, true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView])

  return (
    <SecurityContext.Provider
      value={{
        firstTimeSecurities,
        securities,
        setSecurities,
        information,
        activeErros,
        allErrors,
        companiesSelect,
        calculateSecurities,
        setAllErrors,
        setCurrentView
      }}
    >
      <div style={{ fontFamily: inter }}>
        <CardHeader title={<Title>Security</Title>} />
        <CustomAlert {...badgeData} />
        <form noValidate autoComplete='on'>
          <SecondViewProvider>
            <CardContent>
              {currentView !== 2
                ? securities.map((security, index) => {
                  return (
                    <FormSection
                      key={`${index}-${security?.id}`}
                      security={security}
                      index={index}
                      onDeleteItemList={DeleteNewForm}
                    />
                  )
                })
                : securitiesSecondView.map((security, index) => {
                  return (
                    <FormSection
                      key={`${index}-${security?.id}`}
                      security={security}
                      index={index}
                      onDeleteItemList={DeleteNewForm}
                    />
                  )
                })}

              <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      autoFocus
                      label='Received net premium'
                      disabled
                      fullWidth
                      value={currentView !== 2 ? allFormData.recievedNetPremium : allFormDataView2.recievedNetPremium}
                      InputProps={{
                        inputComponent: NumericFormatCustom as any
                      }}
                      inputProps={{
                        suffix: ' '
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      autoFocus
                      label='Distributed net premium'
                      value={
                        currentView !== 2 ? allFormData.distribuitedNetPremium : allFormDataView2.distribuitedNetPremium
                      }
                      InputProps={{
                        inputComponent: NumericFormatCustom as any
                      }}
                      inputProps={{
                        suffix: ' '
                      }}
                      disabled
                    />
                    {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      autoFocus
                      label='Difference'
                      value={currentView !== 2 ? allFormData.diference : allFormDataView2.diference}
                      InputProps={{
                        inputComponent: NumericFormatCustom as any
                      }}
                      inputProps={{
                        suffix: ' '
                      }}
                      disabled
                    />
                    {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={5}
                sx={{
                  marginTop: '20px'
                }}
              >
                {/* ADD REINSURER */}
                <Grid item xs={12} sm={12}>
                  <div className='add-reinsurer'>
                    { }
                    <Button
                      disabled={currentView === 2}
                      type='button'
                      onClick={addNewForm}
                      variant='text'
                      color='primary'
                      size='large'
                      fullWidth
                      sx={{ justifyContent: 'start' }}
                    >
                      <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD
                      REINSURER
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <div
                    className='section action-buttons'
                    style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
                  >
                    <Button
                      disabled={currentView === 2}
                      className='btn-save'
                      color='success'
                      variant='contained'
                      onClick={SaveData}
                    >
                      <div className='btn-icon'>
                        <Icon icon='mdi:content-save' />
                      </div>
                      SAVE CHANGES
                    </Button>
                    <Button disabled={currentView === 2} className='btn-next' onClick={handleNextStep}>
                      Next Step
                      <div className='btn-icon'>
                        <Icon icon='material-symbols:arrow-right-alt' />
                      </div>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </SecondViewProvider>
          <Modal className='next-step-modal' open={openNextModal} onClose={handleCloseModal}>
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
              <Button className='create-contact-modal' onClick={() => setOpenNextModal(false)}>
                Keep editing information
              </Button>
            </Box>
          </Modal>
        </form>
      </div>
    </SecurityContext.Provider>
  )
}

export default Security
