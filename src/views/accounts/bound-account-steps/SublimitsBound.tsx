import { useEffect, useState } from 'react'

// ** Custom Hooks
import { useGetAccountById } from '@/hooks/accounts/forms'

// ** Dtos
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'

// ** Components
import { NextContainer } from '@/styles/Forms/Sublimits'
import InputLimit from '@/views/accounts/new-account-steps/Sublimit/components/InputLimit/InputLimit'
import SelectCoverage from '@/views/accounts/new-account-steps/Sublimit/components/SelectCoverage/SelectCoverage'
import { GenericCard } from '@/views/accounts/new-account-steps/Sublimit/components/SublimitsCards'

// ** Redux
import { useAppDispatch, useAppSelector } from '@/store'
import { updateEndorsement } from '@/store/apps/endorsement'

// ** MUI Imports
import { Button, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'

// ** Utils
import { DisableForm } from '@/views/accounts/new-account-steps/_commons/DisableForm'

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
  onStepChange: (step: number) => void
  disableSectionCtrl?: boolean
}

const Sublimits = ({ onStepChange, disableSectionCtrl }: SublimitsProps) => {
  const [subLimits, setSubLimits] = useState<SublimitDto[]>([])
  const [coverageSelected, setCoverageSelected] = useState<CoverageDto[]>([])

  const [showErrors, setShowErrors] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean[]>([])

  // Redux
  const accountDataRedux = useAppSelector(state => state.accounts)
  const endorsementData = useAppSelector(state => state.endorsement.data)
  const dispatch = useAppDispatch()

  // Custom hooks
  const { account, setAccountId, setAccount } = useGetAccountById()

  const handleSelectedCoverage = (coverageSelect: CoverageDto) => {
    setCoverageSelected([...coverageSelected, coverageSelect])
  }

  const handleToggle = (value: number, label: string) => {
    try {
      const idAccountCache = Number(localStorage.getItem('idAccount'))
      const subLimitsTemp = subLimits.find(sublimit => sublimit.title === label)

      if (!subLimitsTemp) {
        const subLimitsTemp = [...subLimits]
        setSubLimits([
          ...subLimitsTemp,
          {
            ...initialValues,
            title: label,
            idCCoverage: value,
            idAccount: account ? account?.id : idAccountCache
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

  //Evento que controla el evento de continuar
  const handleNextStep = async () => {
    const existError = formErrors.find(error => error)
    if (!existError && subLimits.length > 0) {
      handleSubmit()
      onStepChange(5)
    } else {
      setShowErrors(true)
    }
  }

  const handleSubmit = async () => {
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
    if (accountDataRedux.formsData.form1?.id && !endorsementData.initialized) {
      setAccountId(accountDataRedux.formsData.form1.id)
    } else {
      setAccount({
        id: Number(endorsementData.idAccount),
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
  }, [accountDataRedux, setAccountId])

  useEffect(() => {
    if (account && account.sublimits.length > 0) {
      setSubLimits([...account.sublimits])

      formErrors.push(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h5'>Sublimits</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <form noValidate autoComplete='on'>
            <DisableForm isDisabled={disableSectionCtrl}>
              {/* campos header */}
              <Grid container spacing={5}>
                <InputLimit account={account} />
                <SelectCoverage
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
      </NextContainer>
    </CardContent>
  )
}

export default Sublimits
