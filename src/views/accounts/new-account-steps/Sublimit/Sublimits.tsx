import { useGetAccountById } from '@/hooks/accounts/forms'
import { useDeleteSublimits } from '@/hooks/accounts/sublimit'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'
import { useAppSelector } from '@/store'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import { CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import InputLimit from './components/InputLimit/InputLimit'
import SelectCoverage from './components/SelectCoverage/SelectCoverage'
import { GenericCard } from './components/SublimitsCards'

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
  active: null,
  idCCoverage: null,
  idEndorsement: null,
  title: '',
  idAccount: 0
}

interface FormErrors {
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

const Sublimits = () => {
  const [badgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })
  const [formErrors, setFormErrors] = useState<FormErrors[]>([])
  const [, setFormInformationData] = useState<any>({})
  const [subLimits, setSubLimits] = useState<SublimitDto[]>([])
  const { account, setAccountId } = useGetAccountById()
  const [coverageSelected, setCoverageSelected] = useState<CoverageDto[]>([])
  const { deleteSublimits } = useDeleteSublimits()

  //** REDUX
  const accountData = useAppSelector(state => state.accounts)

  const handleSelectedCoverage = (coverageSelect: CoverageDto) => {
    setCoverageSelected([...coverageSelected, coverageSelect])
  }
  const handleToggle = (value: number, label: string) => {
    try {
      const idAccountCache = Number(localStorage.getItem('idAccount'))
      const subLimitsTemp = subLimits.find(sublimit => sublimit.title === label)

      if (!subLimitsTemp) {
        setSubLimits(statePreview => {
          const statePreviewTemp = [...statePreview]
          statePreviewTemp.push({
            ...initialValues,
            title: label,
            idCCoverage: value,
            idAccount: account ? account?.id : idAccountCache
          })

          return statePreviewTemp
        })
      }
      setFormErrors([...formErrors, initialErrorValues])
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

  // const handleOnChangeByInputForm = (index: number, { name, value }: { name: keyof SublimitDto; value: any }) => {
  //   console.log(index, { name, value })
  // }
  useEffect(() => {
    if (accountData.formsData.form1?.id) {
      setAccountId(accountData.formsData.form1.id)
      setFormInformationData(accountData.formsData.form1)
    }
  }, [accountData, setAccountId])

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h5'>Sublimits</Typography>
          <div style={{ width: 'fit-content', float: 'right', alignSelf: 'end' }}>
            <CustomAlert {...badgeData} />
          </div>
        </Grid>
        {/* campos header */}
        <InputLimit account={account} />
        <SelectCoverage
          onChangeSelected={handleSelectedCoverage}
          coverageSelected={coverageSelected}
          onClickToggle={handleToggle}
        />
        <Grid container spacing={5} sx={{ m: '1%' }}>
          {account?.informations &&
            subLimits.map((subLimit, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <GenericCard
                  subLimit={subLimit}
                  setSubLimits={setSubLimits}
                  subLimits={subLimits}
                  index={index}
                  limit={account.informations[0].limit}
                  formErrors={formErrors[index]}
                  handleOnDeleteForm={handleDeleteSublimit}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default Sublimits
