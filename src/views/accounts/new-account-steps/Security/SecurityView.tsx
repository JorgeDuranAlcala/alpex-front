import { useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSecurities, useUpdateSecurities } from '@/hooks/accounts/security'
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
import { CalculateSecurity } from './utils/calculates-securities'

export const SecurityContext = createContext<SecurityContextDto>({} as SecurityContextDto)

const Security = ({ onStepChange }: SecurityProps) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const [securities, setSecurities] = useState<SecurityDto[]>([])
  const [isNextStep, setIsNextStep] = useState<boolean>(false)
  const [allFormData, setAllFormData] = useState<FormSecurity>({
    formData: [],
    recievedNetPremium: 0,
    distribuitedNetPremium: 0,
    diference: 0
  })
  const [allErrors, setAllErrors] = useState<boolean[]>([])

  const [open, setOpen] = useState<boolean>(false)
  const [information, setInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })
  const [companiesSelect] = useState<number[]>([])
  const { account, setAccountId } = useGetAccountById()
  const { saveSecurityTotal } = useAddSecurityTotal()
  const { updateSecurityTotal } = useUpdateSecurityTotalById()
  const { updateSecurities } = useUpdateSecurities()
  const { saveSecurities } = useAddSecurities()
  const accountData = useAppSelector(state => state.accounts)
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const calculateSecurities = (securities: SecurityDto[]) => {
    if (account && information) {
      const tempSecurities = []
      companiesSelect.splice(0, companiesSelect.length)
      allErrors.splice(0, allErrors.length)

      for (const security of securities) {
        allErrors.push(false)
        const operationSecurity: CalculateSecurity = new CalculateSecurity()
          .setInformation(information)
          .setSecurity(security)
        if (security?.idCReinsuranceCompany?.id) companiesSelect.push(security.idCReinsuranceCompany.id)

        security.premiumPerShareAmount = operationSecurity.getPremierPerShare() || 0
        security.brokerAgeAmount = operationSecurity.getBrokerAge() || 0
        security.dynamicCommissionAmount = operationSecurity.getDynamicComissionAmount() || 0
        security.frontingFeeAmount = operationSecurity.getFrontingFeeAmount() || 0
        security.taxesAmount = operationSecurity.getTaxesAmount() || 0
        security.netReinsurancePremium = operationSecurity.getNetReinsurancePremium() || 0
        tempSecurities.push({
          ...security,
          difference: Number(security.difference) || 0,
          distributedNetPremium: Number(security.distributedNetPremium) || 0,
          dynamicCommission: Number(security.dynamicCommission) || 0,
          frontingFee: Number(security.frontingFee) || 0,
          netPremiumAt100: Number(security.netPremiumAt100) || 0,
          receivedNetPremium: Number(security.receivedNetPremium) || 0,
          reinsuranceBrokerage: Number(security.reinsuranceBrokerage) || 0,
          share: Number(security.share) || 0,
          taxes: Number(security.taxes) || 0
        })
      }
      setAllFormData({
        formData: tempSecurities,
        ...CalculateSecurity.getData(tempSecurities, information),
        id: account.securityTotal.id
      })
      setSecurities(tempSecurities)
    }
  }
  const addNewForm = () => {
    const securityNew = {} as SecurityDto
    calculateSecurities([...securities, securityNew])
  }
  const handleNextStep = () => {
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }
  const onNextStep = () => {
    setIsNextStep(true)
    handleCloseModal()
  }
  const SaveData = async () => {
    const isError = allErrors.find(error => error)

    if (!isError) {
      const update: Partial<SecurityDto>[] = []
      const save: Partial<SecurityDto>[] = []
      debugger
      for (const security of securities) {
        const mapper = {
          netPremiumAt100: security.netPremiumAt100,
          share: security.share,
          frontingFeeActive: security.frontingFeeActive,
          dynamicCommission: security.dynamicCommission,
          frontingFee: security.frontingFee,
          netReinsurancePremium: security.netReinsurancePremium,
          taxes: security.taxes,
          reinsuranceBrokerage: security.reinsuranceBrokerage,
          active: true,
          idCReinsuranceCompany: security.idCReinsuranceCompany,
          idCRetroCedant: security.idCRetroCedant,
          idCRetroCedantContact: security.idCRetroCedantContact,
          idEndorsement: undefined,
          idAccount: +accountData.formsData.form1.id,
          receivedNetPremium: 0,
          distributedNetPremium: 0,
          difference: 0
        }
        if (security.id) {
          update.push({
            ...mapper,
            id: security.id
          })
        } else {
          save.push({ ...mapper })
        }
      }

      if (!allFormData.id) {
        saveSecurityTotal({
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id
        })
          .then(response => {
            console.log('saveSecurityTotal', { response })
          })
          .catch(e => {
            console.log('saveSecurityTotal', e)
          })
      } else {
        await updateSecurityTotal(allFormData?.id, {
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id
        })
          .then(response => {
            console.log('updateSecurityTotal', { response })
          })
          .catch(e => {
            console.log('updateSecurityTotal', e)
          })
      }

      if (update.length > 0)
        updateSecurities(update)
          .then(res => {
            console.log('updateSecurities', { res })

            setBadgeData({
              message: 'Saved successfully',
              theme: 'success',
              open: true,
              status: 'error'
            })
          })
          .catch(e => {
            console.log('ERROR updateSecurities', e)
            setBadgeData({
              message: 'Error saving data',
              theme: 'error',
              open: true,
              status: 'error',
              icon: <Icon style={{ color: '#FF4D49' }} icon='icon-park-outline:error' />
            })
          })
      if (save.length > 0)
        saveSecurities(save)
          .then(res => {
            console.log('saveSecurities', { res })

            setBadgeData({
              message: 'Saved successfully',
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
    }
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
      calculateSecurities(account.securities)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, information])
  console.log({ allErrors })
  useEffect(() => {
    const isError = allErrors.find(error => error)
    if (isNextStep && !isError) onStepChange(3)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextStep])

  return (
    <SecurityContext.Provider
      value={{
        securities,
        setSecurities,
        information,
        allErrors,
        companiesSelect,
        calculateSecurities,
        setAllErrors
      }}
    >
      <div style={{ fontFamily: inter }}>
        <CardHeader title={<Title>Security</Title>} />

        <div style={{ width: 'fit-content', float: 'right' }}>
          <CustomAlert {...badgeData} />
        </div>
        <form noValidate autoComplete='on'>
          <CardContent>
            {securities.length > 0 ? (
              securities.map((security, index) => {
                return <FormSection key={index} security={security} index={index} />
              })
            ) : (
              <FormSection index={0} security={{} as SecurityDto} />
            )}

            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    label='Recieved net premium'
                    disabled
                    fullWidth
                    value={allFormData.recievedNetPremium}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    fullWidth
                    label='Distribuited net premium'
                    disabled
                    value={allFormData.distribuitedNetPremium}
                  />
                  {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <TextField autoFocus label='Diference' value={allFormData.diference} disabled />
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
              <Grid item xs={12} sm={6}>
                <div className='add-reinsurer'>
                  <Button
                    type='button'
                    onClick={addNewForm}
                    variant='text'
                    color='primary'
                    size='large'
                    fullWidth
                    sx={{ justifyContent: 'start' }}
                  >
                    <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD REINSURER
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div
                  className='section action-buttons'
                  style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
                >
                  <Button className='btn-save' variant='contained' onClick={SaveData}>
                    <div className='btn-icon'>
                      <Icon icon='mdi:content-save' />
                    </div>
                    SAVE CHANGES
                  </Button>
                  <Button className='btn-next' onClick={handleNextStep}>
                    Next Step
                    <div className='btn-icon'>
                      <Icon icon='material-symbols:arrow-right-alt' />
                    </div>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </CardContent>
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
        </form>
      </div>
    </SecurityContext.Provider>
  )
}

export default Security
