import { useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSublimits, useDeleteSublimits, useUpdateSublimits } from '@/hooks/accounts/sublimit'
import { AbilityContext } from '@/layouts/components/acl/Can'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'
import { useAppDispatch, useAppSelector } from '@/store'
import { NextContainer } from '@/styles/Forms/Sublimits'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { Button, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react' //useContext
import InputLimit from './components/InputLimit/InputLimit'
import SelectCoverage from './components/SelectCoverage/SelectCoverage'
import { GenericCard } from './components/SublimitsCards'

import { useUpdateAccountsStatus } from '@/hooks/accounts/status'
import UserThemeOptions from '@/layouts/UserThemeOptions'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import Icon from 'src/@core/components/icon'

//Custom hooks
import { useGetAllCoverage } from '@/hooks/catalogs/coverage'

//import Redux para endosos
import { updateEndorsement } from '@/store/apps/endorsement'

// import useFormStep_updateSublimits from '@/hooks/accounts/forms/stepForms/update/useFormStep_updateSublimits'

import { useRouter } from 'next/router'
import { DisableForm } from '../_commons/DisableForm'

const initialValues: SublimitDto = {
  id: undefined,
  sublimit: 0,
  deductible: 0,
  amount: 0,
  min: 0,
  daysBi: 0,
  amountBi: 0,
  coinsurance: 0,
  yes: false,
  luc: false,
  typeDeductible: '',
  typeBi: '',
  at100: false,
  idCDeductiblePer: 0,
  active: true,
  idCCoverage: null,
  idEndorsement: null,
  title: '',
  idAccount: 0
}

export interface FormErrors {
  sublimit: string
  at100: string
  deductible: string
  amount: string
  min: string
  coinsurance: string
  yes: string
  luc: string
  typeBi: string
  typeDeductible: string
  daysBi: string
  idCCoverage: string
  amountBi: string
  idCDeductiblePer: string
}

export const initialErrorValues: FormErrors = {
  sublimit: '',
  deductible: '',
  amount: '',
  min: '',
  amountBi: '',
  coinsurance: '',
  yes: '',
  luc: '',
  typeDeductible: '',
  typeBi: '',
  daysBi: '',
  at100: '',
  idCCoverage: '',
  idCDeductiblePer: ''
}

interface SublimitsProps {
  getAccountByIdHeader?: (idAccount: number) => void
  onStepChange?: (step: number) => void
  disableSectionCtrl?: boolean
  isBoundAccount?: boolean
}

// getAccountByIdHeader

const Sublimits = ({ getAccountByIdHeader, onStepChange, disableSectionCtrl, isBoundAccount }: SublimitsProps) => {
  const router = useRouter()
  const idAccountRouter = Number(router?.query?.idAccount)
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const [formInformationData, setFormInformationData] = useState<any>({}) //formInformationData
  const [subLimits, setSubLimits] = useState<SublimitDto[]>([])

  // const [coverageSelected, setCoverageSelected] = useState<CoverageDto[]>([])
  const [coverageSelected, setCoverageSelected] = useState<any[]>([])

  const ability = useContext(AbilityContext)

  //state para lo botones
  const [disableBoundBtn, setDisableBoundBtn] = useState(ability?.cannot('addBound', 'account'))
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
  const [showErrors, setShowErrors] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean[]>([])
  const { account, setAccountId, getAccountById, setAccount } = useGetAccountById()

  //** REDUX
  const accountData = useAppSelector(state => state.accounts)

  // Redux para endosos********************************************
  const endorsementData = useAppSelector(state => state.endorsement.data)
  const dispatch = useAppDispatch()

  //theme
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14

  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  //hooks para sublimits
  const { saveSublimits } = useAddSublimits()
  const { updateSublimits } = useUpdateSublimits()
  const { deleteSublimits } = useDeleteSublimits()

  // ** Custom hooks
  const { updateAccountsStatus } = useUpdateAccountsStatus()

  // custom hooks para endosos
  const { coverages, getAllCoverages, setAccountIdCoverage } = useGetAllCoverage()

  const handleSelectedCoverage = (coverageSelect: CoverageDto) => {
    // console.log('coverageSelect', coverageSelect);

    setCoverageSelected([...coverageSelected, coverageSelect])
  }

  const handleToggle = (value: number, label: string) => {
    try {
      const idAccountCache = Number(localStorage.getItem('idAccount')) ?? accountData.formsData.form1?.id
      const subLimitsTemp = subLimits.find(sublimit => sublimit.title === label)

      if (!subLimitsTemp) {
        const subLimitsTemp = [...subLimits]
        setSubLimits([
          ...subLimitsTemp,
          {
            ...initialValues,
            title: label,
            idCCoverage: value,
            idAccount: account ? account?.id : isBoundAccount ? idAccountRouter : idAccountCache
          }
        ])
        formErrors.push(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteSublimit = async (index: number) => {
    const sublimit = subLimits[index]
    const coverageDelete = coverageSelected.filter(cov => cov.coverage !== sublimit.title)

    /**
     * Hace el borrado de la base de datos directamente
     */
    //Validación para endosos
    isBoundAccount ? undefined : await deleteSublimits([sublimit])

    setSubLimits(state => {
      const newState = state.filter((sub, i) => index !== i)

      return newState
    })

    setFormErrors(state => {
      const newState = state.filter((errors, i) => index !== i)

      return newState
    })

    if (coverageDelete) {
      setCoverageSelected([...coverageDelete])
    }
  }

  const handleClickSave = () => {
    const existError = formErrors.find(error => error)
    if (!existError && subLimits.length > 0) {
      handleSubmit()
    } else {
      setShowErrors(true)
    }
  }

  //* funciones para la parte de Endosos para sublimits***************************************************
  //Evento que controla el evento de continuar
  const handleNextStep = async () => {
    const existError = formErrors.find(error => error)
    if (!existError && subLimits.length > 0) {
      handleSaveSubmit()
      onStepChange ? onStepChange(5) : undefined
    } else {
      setShowErrors(true)
    }
  }

  const handleSaveSubmit = async () => {
    if (!endorsementData.initialized) return
    const save: Partial<SublimitDto>[] = []
    for (const subLimit of subLimits) {
      // * Cuando hay un cambio en el componente DeductibleMaterialDamage,
      // * desaparece el campo idCDeductiblePer, si no hay un cambio
      // * lo deja en 0, entonces cuando venga en 0, lo elimino

      const tempSubmit = {
        ...subLimit,
        ...(subLimit?.idCDeductiblePer === 0 ? { idCDeductiblePer: null } : null)
      }

      save.push(tempSubmit)
    }

    const newEndorsementData = {
      ...endorsementData,
      sublimits: save
    }
    dispatch(updateEndorsement(newEndorsementData))
  }
  useEffect(() => {
    if (idAccountRouter && !endorsementData.initialized) {
      setAccountId(idAccountRouter)
    } else {
      setAccount({
        id: idAccountRouter,
        status: '',
        discounts: endorsementData.discounts,
        idAccountStatus: 0,
        idAccountType: 0,
        informations: [
          {
            ...endorsementData.information,
            idLineOfBussines: {},
            idCountry: {},
            idBroker: {},
            idCedant: {},
            idRiskActivity: {},
            idTypeOfLimit: {},
            idCurrency: {},
            idBrokerContact: {},
            idCedantContact: {},
            idEconomicSector: {},
            idLeadUnderwriter: {},
            idTechnicalAssistant: {},
            idUnderwriter: {}
          }
        ],
        installments: endorsementData.installments,
        securities: endorsementData.securities,
        securitiesTotal: endorsementData.securitiesTotal,
        sublimits: endorsementData.sublimits
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAccountRouter, setAccountId])

  useEffect(() => {
    if (account && account.sublimits.length > 0) {
      setSubLimits([...account.sublimits])

      formErrors.push(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (coverageSelected.length === 0) {
      setAccountIdCoverage(accountData.formsData.form1?.id)

      getAllCoverages(accountData.formsData.form1?.id)
      const coveragesFiltered = coverages.filter((elemento: any) => {
        return subLimits.some(filtroItem => filtroItem.idCCoverage.id === elemento.id)
      })

      setCoverageSelected(coveragesFiltered)
    }
  }, [subLimits])

  //************************************************************************

  const handleSubmit = async () => {
    setDisableBoundBtn(true)
    setDisableSaveBtn(true)
    const save: Partial<SublimitDto>[] = []
    const update: Partial<SublimitDto>[] = []
    for (const subLimit of subLimits) {
      // * Cuando hay un cambio en el componente DeductibleMaterialDamage,
      // * desaparece el campo idCDeductiblePer, si no hay un cambio
      // * lo deja en 0, entonces cuando venga en 0, lo elimino

      // * Se elimina el campo title porque no existe en la base de datos,
      // * ya hay otro llamado "coverage" el cuál contiene el título de la card
      const tempSubmit = {
        ...subLimit,
        ...(subLimit?.idCDeductiblePer === 0 ? { idCDeductiblePer: null } : null),
        ...(subLimit?.title ? { title: undefined } : null)
      }

      if (subLimit.id) {
        update.push(tempSubmit)
      } else {
        save.push(tempSubmit)
      }
    }

    Promise.all([updateSublimits(update), saveSublimits(save)])
      .then(values => {
        console.log({ values })
        setBadgeData({
          message: 'THE INFORMATION HAS BEEN SAVED',
          theme: 'success',
          open: true,
          status: 'error'
        })

        getAccountData().then(console.log)

        setDisableBoundBtn(false)
        setDisableSaveBtn(false)
      })
      .catch(reason => {
        console.log({ reason })

        setDisableBoundBtn(false)
        setDisableSaveBtn(false)
      })

    setTimeout(() => {
      setBadgeData({
        message: '',
        theme: 'success',
        open: false,
        status: 'error'
      })
    }, 4000)
  }

  const handleUpdateStatus = async () => {
    const existError = formErrors.find(error => error)
    if (!existError) {
      handleSubmit()

      await updateAccountsStatus({
        updateStatus: [
          {
            idAccount: formInformationData.id,
            status: 5
          }
        ]
      })
      getAccountByIdHeader ? getAccountByIdHeader(formInformationData.id) : undefined
      setBadgeData({
        message: 'Account has been updated',
        theme: 'success',
        open: true,
        status: 'error'
      })
      setTimeout(() => {
        setBadgeData({
          message: 'updated successfully',
          theme: 'success',
          open: false,
          status: 'error'
        })
      }, 50)
    }
  }

  const getAccountData = async () => {
    const idAccount = Number(localStorage.getItem('idAccount')) ?? accountData.formsData.form1?.id

    if (!idAccount) return

    localStorage.setItem('idAccount', idAccount.toString())
    setAccountId(idAccount)

    const accountDataF = await getAccountById(idAccount)

    if (accountDataF && accountDataF.sublimits.length > 0) {
      setSubLimits([...accountDataF.sublimits])

      formErrors.push(false)
    }
  }

  useEffect(() => {
    if (accountData.formsData.form1?.id) {
      setAccountId(accountData.formsData.form1.id)
      setFormInformationData(accountData.formsData.form1)
    }
  }, [accountData, setAccountId])

  useEffect(() => {
    getAccountData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log({ subLimits, coverageSelected })

  // * INIT -  Actualizar los datos del formulario en Redux + + + + + + + + + + + + + +

  // const { handleCanUpdateSublimitsData } = useFormStep_updateSublimits({
  //   idAccount: account?.id || null,
  //   sublimits: subLimits
  // });

  // * END -  Actualizar los datos del formulario en Redux + + + + + + + + + + + + + +

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h5'>Sublimits</Typography>

          <div style={{ width: 'fit-content', float: 'right', alignSelf: 'end' }}>
            <CustomAlert {...badgeData} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <form noValidate autoComplete='on' onClick={handleCanUpdateSublimitsData}> */}
          <form noValidate autoComplete='on'>
            <DisableForm
              isDisabled={
                isBoundAccount ? disableSectionCtrl : account?.status.toLowerCase() === 'bound' ? true : false
              }
              sg={isBoundAccount ? 2000 : undefined}
            >
              {/* campos header */}
              <Grid container spacing={5}>
                <InputLimit account={account} />
                <SelectCoverage
                  idAccount={accountData.formsData.form1?.id}
                  onChangeSelected={handleSelectedCoverage}
                  coverageSelected={coverageSelected}
                  onClickToggle={handleToggle}
                />
              </Grid>
              <Grid container spacing={5} sx={{ mt: '20px' }}>
                {account?.informations &&
                  subLimits.map((subLimit, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                      <GenericCard
                        selectedCoverages={coverageSelected}
                        subLimit={subLimit}
                        setSubLimits={setSubLimits}
                        subLimits={subLimits}
                        index={index}
                        limit={Number(account.informations[0].limit)}
                        formErrors={formErrors}
                        handleOnDeleteForm={handleDeleteSublimit}
                        setErrors={setFormErrors}
                        showErrors={showErrors}
                      />
                    </Grid>
                  ))}
              </Grid>
            </DisableForm>
          </form>
        </Grid>
      </Grid>
      <NextContainer>
        {isBoundAccount ? (
          <Button
            className='btn-next'
            onClick={() => {
              handleNextStep()
            }}
          >
            Next Step
            <div className='btn-icon'>
              <Icon icon='material-symbols:arrow-right-alt' />
            </div>
          </Button>
        ) : (
          <>
            <Button
              className='btn-full-mob'
              variant='contained'
              color='success'
              sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
              disabled={disableSaveBtn || account?.status.toLowerCase() === 'bound' ? true : false}
              onClick={handleClickSave}
            >
              <SaveIcon /> &nbsp; Save changes
            </Button>
            <Button
              sx={{
                fontFamily: inter,
                letterSpacing: '0.4px',
                fontSize: userThemeConfig.typography?.size.px15,
                color: texButtonColor
              }}
              disabled={disableBoundBtn}
              onClick={handleUpdateStatus}
            >
              <CheckIcon /> &nbsp; Add bound
            </Button>
          </>
        )}
      </NextContainer>
    </CardContent>
  )
}

export default Sublimits
