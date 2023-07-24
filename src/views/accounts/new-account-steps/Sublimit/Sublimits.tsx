import { useGetAccountById } from '@/hooks/accounts/forms'
import { useAddSublimits, useDeleteSublimits, useUpdateSublimits } from '@/hooks/accounts/sublimit'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'
import { useAppSelector } from '@/store'
import { NextContainer } from '@/styles/Forms/Sublimits'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { Button, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import InputLimit from './components/InputLimit/InputLimit'
import SelectCoverage from './components/SelectCoverage/SelectCoverage'
import { GenericCard } from './components/SublimitsCards'

import useFormStep_updateSublimits from '@/hooks/accounts/forms/stepForms/update/useFormStep_updateSublimits'
import UserThemeOptions from '@/layouts/UserThemeOptions'
import SaveIcon from '@mui/icons-material/Save'
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
  getAccountByIdHeader: (idAccount: number) => void
}

const Sublimits = ({ }: SublimitsProps) => {
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  const [, setFormInformationData] = useState<any>({})
  const [subLimits, setSubLimits] = useState<SublimitDto[]>([])
  const [coverageSelected, setCoverageSelected] = useState<CoverageDto[]>([])

  //state para lo botones
  const [, setDisableBoundBtn] = useState<boolean>(true)
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
  const [showErrors, setShowErrors] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<boolean[]>([])
  const { account, setAccountId, getAccountById } = useGetAccountById()

  //** REDUX
  const accountData = useAppSelector(state => state.accounts)

  //theme
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14

  // const texButtonColor = userThemeConfig.palette?.buttonText.primary

  //hooks para sublimits
  const { saveSublimits } = useAddSublimits()
  const { updateSublimits } = useUpdateSublimits()
  const { deleteSublimits } = useDeleteSublimits()

  // ** Custom hooks
  // const { updateAccountsStatus } = useUpdateAccountsStatus()

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

    /**
     * Hace el borrado de la base de datos directamente
     */
    await deleteSublimits([sublimit])

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

  const getAccountData = async () => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    setAccountId(idAccountCache)
    const accountData = await getAccountById(idAccountCache)

    if (accountData && accountData.sublimits.length > 0) {
      setSubLimits([...accountData.sublimits])

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
  console.log({ subLimits })

  // * INIT -  Actualizar los datos del formulario en Redux + + + + + + + + + + + + + +

  const { handleCanUpdateSublimitsData } = useFormStep_updateSublimits({
    idAccount: account?.id || null,
    sublimits: subLimits
  });

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
          <form noValidate autoComplete='on' onClick={handleCanUpdateSublimitsData}>
            <DisableForm isDisabled={account?.status.toLowerCase() === 'bound' ? true : false}>
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
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          disabled={disableSaveBtn || account?.status.toLowerCase() === 'bound' ? true : false}
          onClick={handleClickSave}
        >
          <SaveIcon /> &nbsp; Save changes
        </Button>
      </NextContainer>
    </CardContent>
  )
}

export default Sublimits
