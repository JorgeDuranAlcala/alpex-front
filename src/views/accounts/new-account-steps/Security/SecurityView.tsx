import { useGetAccountById } from '@/hooks/accounts/forms'
import { FormInformation, FormSecurity, SecurityDto } from '@/services/accounts/dtos/security.dto'
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

type SecurityContextDto = {
  securities: SecurityDto[]
  information: FormInformation
  companiesSelect: number[]
  setCompaniesSelect: React.Dispatch<React.SetStateAction<number[]>>
  setSecurities: React.Dispatch<React.SetStateAction<SecurityDto[]>>
  calculateSecurities: (securities: SecurityDto[]) => void
}
export const SecurityContext = createContext<SecurityContextDto>({} as SecurityContextDto)
const Security = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const [securities, setSecurities] = useState<SecurityDto[]>([])
  const [allFormData, setAllFormData] = useState<FormSecurity>({
    formData: [],
    recievedNetPremium: 0,
    distribuitedNetPremium: 0,
    diference: 0
  })
  const [information, setInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })
  const { account, setAccountId, getAccountById } = useGetAccountById()
  const [companiesSelect, setCompaniesSelect] = useState<number[]>([])
  const accountData = useAppSelector(state => state.accounts)
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  useEffect(() => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    if (accountData.formsData.form1.id) {
      setAccountId(accountData.formsData.form1.id || idAccountCache)
      const data = accountData.formsData.form1.placementStructure as FormInformation
      setInformation(data)
    }
  }, [accountData.formsData.form1.id, setAccountId])
  const calculateSecurities = (securities: SecurityDto[]) => {
    if (account && information) {
      const tempSecurities = []
      for (const security of securities) {
        const operationSecurity: CalculateSecurity = new CalculateSecurity()
          .setInformation(information)
          .setSecurity(security)
        companiesSelect.push(security.idCReinsuranceCompany.id)
        security.premiumPerShareAmount = operationSecurity.getPremierPerShare()
        security.brokerAgeAmount = operationSecurity.getBrokerAge()
        security.dynamicCommissionAmount = operationSecurity.getDynamicComissionAmount()
        security.frontingFeeAmount = operationSecurity.getFrontingFeeAmount()
        security.taxesAmount = operationSecurity.getTaxesAmount()
        security.netReinsurancePremium = operationSecurity.getNetReinsurancePremium()
        tempSecurities.push(security)
      }

      setAllFormData({
        formData: tempSecurities,
        ...CalculateSecurity.getData(tempSecurities, information)
      })

      setSecurities(tempSecurities)
    }
  }
  useEffect(() => {
    if (account && information) {
      calculateSecurities(account.securities)
    }
  }, [account, information])
  console.log({ securities })

  return (
    <SecurityContext.Provider
      value={{ securities, setSecurities, information, setCompaniesSelect, companiesSelect, calculateSecurities }}
    >
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
        </CardContent>
        <div className='add-reinsurer'>
          <Button
            type='button'
            onClick={() => {}}
            variant='text'
            color='primary'
            size='large'
            fullWidth
            sx={{ justifyContent: 'start' }}
          >
            <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD REINSURER
          </Button>
        </div>
        <div className='section action-buttons' style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
          <Button className='btn-save' variant='contained'>
            <div className='btn-icon'>
              <Icon icon='mdi:content-save' />
            </div>
            SAVE CHANGES
          </Button>
          <Button className='btn-next'>
            Next Step
            <div className='btn-icon'>
              <Icon icon='material-symbols:arrow-right-alt' />
            </div>
          </Button>

          <Modal
            className='next-step-modal'
            open={false}
            onClose={() => {
              console.log('close')
            }}
          >
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
                <ButtonClose onClick={() => {}}>
                  <CloseIcon />
                </ButtonClose>
              </HeaderTitleModal>
              <div className='next-modal-text'>
                You are about to advance to the next form. Make sure that all the fields have been completed with the
                correct information.
              </div>
              <Button className='continue-modal-btn' variant='contained' onClick={() => {}}>
                CONTINUE
              </Button>
              <Button className='create-contact-modal' onClick={() => {}}>
                Keep editing information
              </Button>
            </Box>
          </Modal>
        </div>
      </form>
    </SecurityContext.Provider>
  )
}

export default Security
