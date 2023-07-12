import { useGetAccountById } from '@/hooks/accounts/forms'
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

const Security = ({ onStepChange }: SecurityProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const [securities, setSecurities] = useState<SecurityDto[]>([])

  const [activeErros, setActiveErrors] = useState<boolean>(false)

  //** second view */
  const [securitiesSecondView, setSecuritiesSecondView] = useState<SecurityDto[]>([])

  const [allFormDataView2, setAllFormDataView2] = useState<FormSecurity>({
    formData: [],
    recievedNetPremium: 0,
    distribuitedNetPremium: 0,
    diference: 0
  })
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

  const { account, setAccountId } = useGetAccountById()
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

  /**
   *
   * @param securitiesParam
   * @returns
   */
  const getSecuritiesCalculate = (securitiesParam: SecurityDto[]): SecurityDto[] => {
    const tempSecurities: SecurityDto[] = []

    for (const security of securitiesParam) {
      const operationSecurity: CalculateSecurity = new CalculateSecurity()
        .setInformation(information)
        .setSecurity(security)

      if (security?.idCReinsuranceCompany?.id) companiesSelect.push(security.idCReinsuranceCompany.id)

      //campos que necesitan: information.limit,share
      security.shareAmount = operationSecurity.getShareAmount() || 0

      //campos que necesitan: inetPremiumAt100,information.grossPremium,share
      security.grossPremiumPerShare = operationSecurity.getGrossPremierPerShare() || 0

      //este campo necesita grossPremiumPerShare,brokerAgeAmount,taxes,netPremiumAt100,share

      if (!security.isGross) {
        security.taxesAmount = operationSecurity.getTaxesAmount(security.taxes) || 0
        const tempDiscountList = []
        if (security?.discounts) {
          security.totalAmountOfDiscounts = 0
          for (const discount of security?.discounts) {
            discount.percentage = Number(discount.percentage)

            //este campo necesita: premiumPerShareAmount,netPremiumAt100
            discount.amount = operationSecurity.getDiscountAmount(Number(discount.percentage))
            security.totalAmountOfDiscounts += discount.amount
            tempDiscountList.push(discount)
          }
        }

        security.discounts = tempDiscountList
        operationSecurity.setSecurity(security)
      }

      //este campo necesita : netPremiumAt100,share, sumTaxes, sum discount
      security.premiumPerShareAmount = operationSecurity.getPremierPerShare() || 0

      //campos que necesitan el premiumPerShareAmount
      security.dynamicCommissionAmount = operationSecurity.getDynamicComissionAmount() || 0

      //este campo necesita reinsuranceBrokerage,premiumPerShareAmount
      security.brokerAgeAmount = operationSecurity.getBrokerAge() || 0

      //este campo necesita premiumPerShareAmount
      security.frontingFeeAmount = operationSecurity.getFrontingFeeAmount(security.frontingFee) || 0
      if (security.isGross) {
        security.taxesAmount = operationSecurity.getTaxesAmount(security.taxes) || 0
        const tempDiscountList = []
        if (security?.discounts) {
          security.totalAmountOfDiscounts = 0
          for (const discount of security?.discounts) {
            discount.percentage = Number(discount.percentage)

            //este campo necesita: premiumPerShareAmount,netPremiumAt100
            discount.amount = operationSecurity.getDiscountAmount(Number(discount.percentage))
            security.totalAmountOfDiscounts += discount.amount
            tempDiscountList.push(discount)
          }
        }

        security.discounts = tempDiscountList
        operationSecurity.setSecurity(security)
      }

      /**
       * este campo necesita:
       * dynamicCommissionAmount, frontingFeeAmount, brokerAgeAmount
       * taxesAmount,premiumPerShareAmount
       */
      security.netReinsurancePremium = operationSecurity.getNetReinsurancePremium() || 0

      tempSecurities.push({ ...security })
    }

    return tempSecurities
  }

  const calculateSecurities = (securitiesParam: SecurityDto[], view = 0) => {
    if (securitiesParam.length > 0 && information) {
      companiesSelect.splice(0, companiesSelect.length)

      //hace el calculo de securities de la primer vista es decir cuando el current view este en 0 o en 1
      const tempSecurities = getSecuritiesCalculate(securitiesParam)

      // este estara siempre haciendo los calculos independiente si la vista ya halla cambiado es decir sea 0,1,2,3
      const securitiesView2: SecurityDto[] = []
      for (const seconSecurity of securitiesParam) {
        securitiesView2.push({
          ...seconSecurity,
          netPremiumAt100: seconSecurity.isGross ? information.grossPremium : information.netPremium,
          view: currentView === 3 ? 1 : 2
        })
      }
      const tempSecuritiesView2 = getSecuritiesCalculate(securitiesView2)

      const dataFormView2 = {
        ...allFormDataView2,
        formData: tempSecuritiesView2,
        ...CalculateSecurity.getData(tempSecuritiesView2)
      }
      console.log({ allFormDataView2, tempSecuritiesView2 })

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
      if (currentView !== 3) {
        setSecurities(() => tempSecurities)

        setAllFormData(() => dataForm)
      } else {
        setSecurities(() => tempSecuritiesView2)

        setAllFormData(() => dataFormView2)
        setCurrentView(0)
      }

      setAllErrors(allErrors.map(error => error))
      setAllFormData(() => dataForm)
      setAllFormDataView2(dataFormView2)
      setSecuritiesSecondView(tempSecuritiesView2)
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
    const update: Partial<SecurityDto>[] = []
    const save: Partial<SecurityDto>[] = []

    for (const security of securities) {
      // * Con esta validación no se guardarán los datos de la vista 2
      if (security.view === 2) return

      const mapper = SecurityMapper.securityToSecurityForm(security, accountData)

      save.push({ ...mapper, view: 1 })
    }

    if (!allFormData.id) {
      //TODO REVISAR SI PUEDE TRABAJAR CON PROMISE ALL
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
        .then(async () => {
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
    if (accountData.formsData.form1.id) {
      setAccountId(accountData.formsData.form1.id)
      const data = accountData.formsData.form1.placementStructure as FormInformation
      setInformation(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.formsData.form1.id])

  useEffect(() => {
    if (account && account.securities.length > 0 && information) {
      calculateSecurities(
        account.securities.map(security => SecurityMapper.securityToSecurityForm(security, accountData)),
        30
      )

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
    calculateSecurities(securities, currentView)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView])

  return (
    <SecurityContext.Provider
      value={{
        securities,
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
              {securities.length > 0 &&
                securities.map((security, index) => {
                  return (
                    <FormSection
                      key={`${index}-${security?.id}`}
                      security={currentView === 2 ? securitiesSecondView[index] : security}
                      index={index}
                      onDeleteItemList={DeleteNewForm}
                      securities={securities}
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
                    {}
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
