import { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import * as yup from 'yup'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

// ** Icon Imports

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { updateFormsData } from '@/store/apps/accounts'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

//Hooks
import { useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSecurities, useUpdateSecurities } from '@/hooks/accounts/security'
import { useAddSecurityTotal, useUpdateSecurityTotalById } from '@/hooks/accounts/securityTotal'

//Componentes
import { FormSection } from './components/SecurityForm'

interface FormInfo extends BrokerFormInfo {
  [key: string]: string | boolean | undefined
  NetPremium: string
  SharePercent: string
  DynamicComissionPercent: string
  FrontingFee: string
  ReinsuranceCompany: string
  PremiumPerShare: string
  DynamicComission: string
  FrontingFeePercent: string
  NetInsurancePremium: string
  RetroCedant: string
  RetroCedantContact: string
  ContactEmail: string
  ContactPhone: string
  ContactCountry: string
  HasFrontingFee: boolean
  IsGross: boolean
}

interface PreviousFormInfo {
  id?: number
  RecievedNetPremium: string
  DistribuitedNetPremium: string
  Diference: string
}

interface BrokerFormInfo {
  BrokerAge: string
  Taxes: string
  BrokerAgePercent: string
  TaxesPercent: string
}

const SecurityForm: FormInfo = {
  NetPremium: '',
  SharePercent: '',
  DynamicComissionPercent: '',
  FrontingFee: '',
  ReinsuranceCompany: '',
  PremiumPerShare: '',
  DynamicComission: '',
  FrontingFeePercent: '',
  NetInsurancePremium: '',
  RetroCedant: '',
  RetroCedantContact: '',
  ContactEmail: '',
  ContactPhone: '',
  ContactCountry: '',
  BrokerAge: '',
  Taxes: '',
  BrokerAgePercent: '',
  TaxesPercent: '',
  HasFrontingFee: false,
  IsGross: false,
  id: ''
}

interface FormSecurity extends PreviousFormInfo {
  FormData: FormInfo[]
}

type SecurityProps = {
  onStepChange: (step: number) => void
}
yup.setLocale({
  mixed: {
    required: 'This field is required',
    notType: 'This field must be a number'
  },
  number: {
    min: 'This field must be greater than ${min}',
    max: 'This field must be less than ${max}'
  }
})

const schemaNetPremium = yup.object().shape(
  {
    HasFrontingFee: yup.boolean(),
    IsGross: yup.boolean(),
    NetPremium: yup
      .number()
      .optional()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    SharePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComissionPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    FrontingFee: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .when('HasFrontingFee', {
        is: true,
        then: yup.number().required()
      }),
    ReinsuranceCompany: yup
      .string()
      .test('is-valid', 'This field is required', value => value !== '-1')
      .required(),
    PremiumPerShare: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComission: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    FrontingFeePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .when('HasFrontingFee', {
        is: true,
        then: yup
          .number()
          .transform(value => (isNaN(value) ? undefined : value))
          .required('This field is required')
      }),
    NetInsurancePremium: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required()
      .test('Is positive?', 'ERROR: The number must be greater than 0!', value => {
        const valueVal = value || 0

        return +valueVal >= 0
      })
  },
  [['IsGross', 'frontingFeeEnabled']]
)

const schema = yup.object().shape(
  {
    HasFrontingFee: yup.boolean(),
    IsGross: yup.boolean(),
    NetPremium: yup
      .number()
      .optional()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    SharePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComissionPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .required(),
    FrontingFee: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .when('HasFrontingFee', {
        is: true,
        then: yup.number().required()
      }),
    ReinsuranceCompany: yup
      .string()
      .test('is-valid', 'This field is required', value => value !== '-1')
      .required(),
    PremiumPerShare: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .min(0, 'This field must be greater than 0')
      .required(),
    DynamicComission: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required(),
    FrontingFeePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .when('HasFrontingFee', {
        is: true,
        then: yup
          .number()
          .transform(value => (isNaN(value) ? undefined : value))
          .required('This field is required')
      }),
    NetInsurancePremium: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required()
      .test('Is positive?', 'ERROR: The number must be greater than 0!', value => {
        const valueVal = value || 0

        return +valueVal >= 0
      }),
    RetroCedant: yup.string().when('HasFrontingFee', {
      is: true,
      then: yup.string().required()
    }),
    RetroCedantContact: yup.string().when('HasFrontingFee', {
      is: true,
      then: yup.string().notRequired()
    }),
    BrokerAge: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    Taxes: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    BrokerAgePercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      }),
    TaxesPercent: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .test('max 100', 'This field must be less than 100', value => Number(value) <= 100)
      .min(0, 'This field must be greater than 0')
      .nullable()
      .when('IsGross', {
        is: true,
        then: yup.number().required()
      })
  },
  [['IsGross', 'frontingFeeEnabled']]
)

interface FormInformation {
  frontingFee: number
  netPremium: number
  grossPremium: number
}

const Security = ({ onStepChange }: SecurityProps) => {
  const [securitiesList, setSecuritiesList] = useState<FormInfo[]>([])
  const [formErrors, setFormErrors] = useState<FormInfo[]>([{ ...SecurityForm }])
  const { saveSecurityTotal } = useAddSecurityTotal()
  const { updateSecurities } = useUpdateSecurities()
  const { saveSecurities } = useAddSecurities()
  const [canMakeRequest, setCanMakeRequest] = useState<boolean>(false)
  const [isNextStep, SetIsNextStep] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const accountData = useAppSelector(state => state.accounts)
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const { account, setAccountId, getAccountById } = useGetAccountById()
  const { updateSecurityTotal } = useUpdateSecurityTotalById()
  const [itemsChanged, setItemsChanged] = useState(false)

  const handleItemChange = (index: number, item: FormInfo) => {
    console.log("handle Item change ")
    console.log(item)
    setItemsChanged(true)
    setSecuritiesList((prevSecuritiesList) => {
      const tempSecurities = [...prevSecuritiesList.slice(0, index), item, ...prevSecuritiesList.slice(index + 1)]

      return tempSecurities;
    });

  }

  const [allFormData, setAllFormData] = useState<FormSecurity>({
    FormData: securitiesList,
    RecievedNetPremium: '',
    DistribuitedNetPremium: '',
    Diference: ''
  })

  const [open, setOpen] = useState<boolean>(false)
  const [formInformation, setFormInformation] = useState<FormInformation>({
    frontingFee: 0,
    netPremium: 0,
    grossPremium: 0
  })
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  useEffect(() => {
    accountData.formsData.form1.id && setAccountId(accountData.formsData.form1.id)
  }, [accountData.formsData.form1.id, setAccountId])



  const inter = userThemeConfig.typography?.fontFamilyInter

  const addNewForm = () => {
    setSecuritiesList([...securitiesList, { ...SecurityForm, NetPremium: '' + formInformation.netPremium }])
    setFormErrors([...formErrors, { ...SecurityForm }])
  }

  const DeleteNewForm = (index: number) => {
    const updatedSecurities = [...securitiesList]
    const updatedValidations = [...formErrors]
    updatedSecurities.splice(index, 1)
    updatedValidations.splice(index, 1)

    setSecuritiesList(updatedSecurities)
    setFormErrors(updatedValidations)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    validate()
    SetIsNextStep(true)
    handleCloseModal()
  }

  const handleNext = () => {
    setOpen(true)
  }

  const handleSubmit = async (isNextStep = false) => {
    validate()
    SetIsNextStep(isNextStep)
  }

  const validate = async () => {
    securitiesList.forEach((form, index) => {
      const data = [...formErrors]
      data[index] = { ...SecurityForm }

      if (form.IsGross) {
        schema
          .validate(form, { abortEarly: false })
          .then(function () {
            setCanMakeRequest(true)
          })
          .catch(function (err) {
            err?.inner?.forEach((e: any) => {
              data[index][e.path] = e.message
              setFormErrors(data)
              setCanMakeRequest(false)
            })
          })
      } else {
        schemaNetPremium
          .validate(form, { abortEarly: false })
          .then(function () {
            setCanMakeRequest(true)
          })
          .catch(function (err) {
            err?.inner?.forEach((e: any) => {
              data[index][e.path] = e.message
              setFormErrors(data)
              setCanMakeRequest(false)
            })
          })
      }
    })
  }

  const calculateDistribuitedNetPremium = (item: FormInfo, index: number) => {
    const tempSecurities = [...securitiesList.slice(0, index), item, ...securitiesList.slice(index + 1)]

    let DistribuitedNetPremium = 0
    let sumSharePercent = 0
    let sumGrossShare = 0

    tempSecurities.forEach(form => {
      DistribuitedNetPremium +=
        +form.BrokerAge + +form.Taxes + +form.DynamicComission + +form.FrontingFee + +form.NetInsurancePremium
      if (!form.IsGross) sumSharePercent += +form.SharePercent
      else sumGrossShare += +form.PremiumPerShare
    })

    const recievedNetPremium = (sumSharePercent * +formInformation.netPremium) / 100 + sumGrossShare

    setAllFormData(state => ({
      ...state,
      Diference: (DistribuitedNetPremium - recievedNetPremium).toString(),
      DistribuitedNetPremium: DistribuitedNetPremium.toString(),
      RecievedNetPremium: recievedNetPremium.toString()
    }))
  }

  const getSecurities = async () => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    const accountInfo = await getAccountById(idAccountCache)
    if (accountInfo?.securities.length <= 0 && !accountInfo.securityTotal) {
      setSecuritiesList([{ ...SecurityForm, NetPremium: '' + accountInfo.informations[0].netPremium }])
      setFormErrors([{ ...SecurityForm }])

      return
    }

    const securitiesTem: Partial<FormInfo>[] = []
    const securitiesErrorsTemp: FormInfo[] = []
    for (const security of accountInfo.securities) {
      securitiesTem.push({
        id: String(security.id),
        BrokerAgePercent: String(security.reinsuranceBrokerage),
        TaxesPercent: String(security.taxes),
        IsGross: security.isGross || false,
        NetPremium: String(security.netPremiumAt100),
        FrontingFeePercent: String(security.frontingFee),
        DynamicComissionPercent: String(security.dynamicCommission),
        SharePercent: String(security.share),
        NetInsurancePremium: String(security.netReinsurancePremium),
        ReinsuranceCompany:
          typeof security.idCReinsuranceCompany !== 'number' && security.idCReinsuranceCompany
            ? String(security.idCReinsuranceCompany.id)
            : String(security.idCReinsuranceCompany),
        RetroCedant:
          typeof security.idCRetroCedant !== 'number' && security.idCRetroCedant
            ? String(security.idCRetroCedant!.id) ?? ''
            : String(security.idCRetroCedant) ?? '',
        RetroCedantContact:
          typeof security.idCRetroCedantContact !== 'number' && security.idCRetroCedantContact
            ? String(security.idCRetroCedantContact?.id)
            : String(security.idCRetroCedantContact) ?? '',
        HasFrontingFee: security.frontingFeeActive || false,
        BrokerAge: '0',
        ContactCountry:
          typeof security.idCRetroCedantContact !== 'number' && security.idCRetroCedantContact
            ? '' + security.idCRetroCedantContact['__idCCountry__']?.id ?? ''
            : '',
        ContactEmail: typeof security.idCRetroCedantContact !== 'number' ? security.idCRetroCedantContact?.email : '',
        ContactPhone: typeof security.idCRetroCedantContact !== 'number' ? security.idCRetroCedantContact?.phone : '',
        DynamicComission: '0',
        FrontingFee: '0',
        PremiumPerShare: '0',
        Taxes: '0'
      })
    }

    accountInfo.securities.forEach(() => securitiesErrorsTemp.push({ ...SecurityForm }))

    {!itemsChanged && setSecuritiesList([...securitiesTem] as FormInfo[])}
    setFormErrors([...securitiesErrorsTemp])
    setAllFormData({
      ...allFormData,
      DistribuitedNetPremium: accountInfo.securityTotal.distributedNetPremium.toString(),
      RecievedNetPremium: accountInfo.securityTotal.receivedNetPremium.toString(),
      Diference: accountInfo.securityTotal.difference.toString(),
      id: accountInfo.securityTotal.id
    })
  }

  const SaveData = async () => {
    const update: Partial<SecurityDto>[] = []
    const save: Partial<SecurityDto>[] = []
    securitiesList.forEach(form => {
      if (form.id) {
        update.push({
          id: +form!.id,
          netPremiumAt100: +form.NetPremium || 0,
          share: +form.SharePercent || 0,
          frontingFeeActive: form.HasFrontingFee || false,
          dynamicCommission: +form.DynamicComissionPercent || 0,
          frontingFee: +form.FrontingFeePercent || 0,
          netReinsurancePremium: +form.NetInsurancePremium || 0,
          taxes: +form.TaxesPercent || 0,
          reinsuranceBrokerage: +form.BrokerAgePercent || 0,
          active: true,
          idCReinsuranceCompany: Number(form.ReinsuranceCompany),
          idCRetroCedant: Number(form.RetroCedant) || null,
          idCRetroCedantContact: Number(form.RetroCedantContact) || null,
          idEndorsement: null,
          idAccount: +accountData.formsData.form1.id,
          receivedNetPremium: 0,
          distributedNetPremium: 0,
          difference: 0
        })
      } else {
        save.push({
          netPremiumAt100: +form.NetPremium || 0,
          share: +form.SharePercent || 0,
          frontingFeeActive: form.HasFrontingFee || false,
          dynamicCommission: +form.DynamicComissionPercent || 0,
          frontingFee: +form.FrontingFeePercent || 0,
          netReinsurancePremium: +form.NetInsurancePremium || 0,
          taxes: +form.TaxesPercent || 0,
          reinsuranceBrokerage: +form.BrokerAgePercent || 0,
          active: true,
          idCReinsuranceCompany: Number(form.ReinsuranceCompany),
          idCRetroCedant: Number(form.RetroCedant) || null,
          idCRetroCedantContact: Number(form.RetroCedantContact) || null,
          idEndorsement: null,
          idAccount: +accountData.formsData.form1.id,
          receivedNetPremium: 0,
          distributedNetPremium: 0,
          difference: 0
        })
      }
    })

    let saveTotal = ''
    if (!allFormData.id) {
      saveTotal = (await saveSecurityTotal({
        receivedNetPremium: +allFormData.RecievedNetPremium,
        distributedNetPremium: +allFormData.DistribuitedNetPremium,
        difference: +allFormData.Diference,
        idAccount: +accountData.formsData.form1.id
      })) as string
    } else {
      await updateSecurityTotal(allFormData.id, {
        receivedNetPremium: +allFormData.RecievedNetPremium,
        distributedNetPremium: +allFormData.DistribuitedNetPremium,
        difference: +allFormData.Diference,
        idAccount: +accountData.formsData.form1.id
      })
    }

    let saveAll = ''
    await updateSecurities(update)
    saveSecurities(save)
      .then(res => (saveAll = '' + res))
      .finally(() => {
        setCanMakeRequest(false)
        setItemsChanged(false)
        setSecuritiesList([])
        getSecurities()
      })

    if (saveAll === 'error' || saveTotal === 'error') {
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
  }

  const handleSuccess = () => {
    SaveData()
    dispatch(updateFormsData({ form2: allFormData }))
  }

  useEffect(() => {
    const data = accountData.formsData.form1.placementStructure as FormInformation
    setFormInformation(data)
    //eslint-disable-next-line
  }, [accountData.formsData.form1])

  useEffect(() => {
    setAllFormData({
      ...allFormData,
      Diference: (+allFormData.RecievedNetPremium - +allFormData.DistribuitedNetPremium).toString()
    })
    //eslint-disable-next-line
  }, [allFormData.DistribuitedNetPremium, allFormData.RecievedNetPremium])

  useEffect(() => {
    getSecurities()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (canMakeRequest) {
      handleSuccess()
    }

    console.log({ isNextStep, canMakeRequest })

    if (isNextStep && canMakeRequest) onStepChange(3)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canMakeRequest, isNextStep])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    console.log("useffect")
    console.log(securitiesList)
  }, [securitiesList]);


  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <div className='title'>Security</div>
        <div style={{ width: 'fit-content', float: 'right' }}>
          <CustomAlert {...badgeData} />
        </div>
        <form noValidate autoComplete='on' onSubmit={() => handleSubmit(false)}>
          <div className='section'>
            {securitiesList.map((_, index) => (
              <>
                {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
                <FormSection
                  key={index}
                  index={index}
                  security={securitiesList[index]}
                  onChangeItemList={handleItemChange}
                  formErrors={formErrors}
                  setFormErrors={setFormErrors}
                  securities={securitiesList}
                  onDeleteItemList={DeleteNewForm}
                  onMakeTotals={calculateDistribuitedNetPremium}
                />
              </>
            ))}
          </div>
          <div className='fullwidth'>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Recieved net premium'
                disabled
                fullWidth
                value={allFormData.RecievedNetPremium}
              />
            </FormControl>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                fullWidth
                label='Distribuited net premium'
                disabled
                value={allFormData.DistribuitedNetPremium}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
            <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
              <TextField autoFocus label='Diference' disabled value={allFormData.Diference} />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          </div>
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
          <div className='section action-buttons' style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
            <Button className='btn-save' onClick={() => handleSubmit(false)} variant='contained'>
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

export default Security
