import GenericCard from '@/layouts/components/SublimitsCards/GenericCard'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { useAppSelector } from '@/store'
import CustomAlert, { IAlert } from '@/views/custom/alerts'
import CheckIcon from '@mui/icons-material/Check'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SaveIcon from '@mui/icons-material/Save'
import * as yup from 'yup'
import { ValidationError } from 'yup'

import { Box, Button, Checkbox, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import {
  ContainerTitleSublimits,
  GeneralContainerSublimits,
  InputsContainerSublimits,
  NextContainer
} from 'src/styles/Forms/Sublimits'

import { useGetAccountById } from '@/hooks/accounts/forms'
import { useUpdateAccountsStatus } from '@/hooks/accounts/status'
import { useAddSublimits, useDeleteSublimits, useUpdateSublimits } from '@/hooks/accounts/sublimit'
import { useGetAllCoverage } from '@/hooks/catalogs/coverage'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: 8
    }
  }
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

const schema = yup.object().shape({
  sublimit: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('Validate sublimit', 'Sublimit cannot be greater than limit', (value, context) => {
      const val = value || 0
      let limit = 0

      if (context.options.context && context.options.context.informations[0]?.limit) {
        limit = context.options?.context.informations[0]?.limit
      }

      return +val <= +limit
    })
    .required()
    .min(1),
  at100: yup.boolean().notRequired(),
  yes: yup.boolean().notRequired(),
  luc: yup.boolean().notRequired(),
  typeDeductible: yup.string().required().nullable(),
  deductible: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('Validate percentage', 'Field is required', value => {
      const val = value || 0

      return +val <= 100
    })
    .nullable()
    .when('typeDeductible', {
      is: (typeDeductible: string) => {
        return typeDeductible === 'per'
      },
      then: yup.number().required('Field is required').min(1, 'Field is required')
    }),
  amount: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .nullable()
    .when('typeDeductible', {
      is: (typeDeductible: string) => {
        return typeDeductible === 'amount'
      }, //just an e.g. you can return a function
      then: yup.number().required('Field is required').min(1)
    }),
  min: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .nullable()
    .when('typeDeductible', {
      is: (typeDeductible: string) => {
        return typeDeductible === 'per'
      },
      then: yup.number().required('Field is required').min(1)
    }),
  typeBi: yup
    .string()
    .when('title', {
      is: (title: string) => {
        return title != 'Machinery Breakdown' && title != 'AMIT & SRCC' && title === 'Electronic Equipment'
      },
      then: yup.string().notRequired()
    })
    .when('title', {
      is: (title: string) => {
        return title !== 'Machinery Breakdown' && title !== 'AMIT & SRCC' && title !== 'Electronic Equipment'
      },
      then: yup.string().required()
    }),
  daysBi: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .nullable()
    .test('Validate days', 'Days cannot be greater than 999', value => {
      const val = value || 0

      return +val <= 999
    })
    .when(['typeBi', 'title'], {
      is: (typeBi: string, title: string) => {
        return (
          typeBi === 'days' &&
          title !== 'Machinery Breakdown' &&
          title !== 'AMIT & SRCC' &&
          title !== 'Electronic Equipment'
        )
      },
      then: yup.number().required('Field is required').min(1)
    }),
  amountBi: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .nullable()
    .when('typeBi', {
      is: (typeBi: string) => {
        return typeBi === 'money'
      },
      then: yup.number().required('Field is required').min(1)
    }),
  idCDeductiblePer: yup
    .number()
    .transform((_, val) => (val === Number(val) ? val : null))
    .nullable()
    .when('typeDeductible', {
      is: (typeDeductible: string) => {
        return typeDeductible === 'per'
      },
      then: yup.number().required('Field is required').min(1)
    }),
  coinsurance: yup
    .number()
    .required()
    .transform((_, val) => (val === Number(val) ? val : null))
    .test('Validate coinsurance', 'Coinsurance cannot be greater than 100', value => {
      if (value === 0) {
        return true
      }
      const val = value || 0

      return +val <= 100
    })
})

const initialValues: Partial<SublimitDto> = {
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
  idCDeductiblePer: 0

  // typeDeductibleRadio: 'default'
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
  const [checked] = useState<number[]>([])
  const [formErrors, setFormErrors] = useState<FormErrors[]>([])
  const [coverageSelect, setCoverageSelect] = useState<CoverageDto>()
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  const [formInformationData, setFormInformationData] = useState<any>({})

  const { coverages } = useGetAllCoverage()
  const [availableOptions, setAvailableOptions] = useState<CoverageDto[]>([])

  //hooks para información general de la cuenta
  const accountData = useAppSelector(state => state.accounts)
  const { account, setAccountId, getAccountById } = useGetAccountById()

  //hooks para sublimits
  const { saveSublimits } = useAddSublimits()
  const { updateSublimits } = useUpdateSublimits()
  const { deleteSublimits } = useDeleteSublimits()

  //state para lo botones
  const [disableBoundBtn, setDisableBoundBtn] = useState<boolean>(true)
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
  const [, setHasError] = useState<boolean>(true)

  const [sublimts, setSublimits] = useState<Partial<SublimitDto>[]>([])
  const [badgeData, setBadgeData] = useState<IAlert>({
    message: '',
    theme: 'success',
    open: false,
    status: 'error'
  })

  // ** Custom hooks
  const { updateAccountsStatus } = useUpdateAccountsStatus()

  const handleOnChangeByInputForm = (index: number, { name, value }: { name: keyof SublimitDto; value: any }) => {
    let sublimit = { ...sublimts[index], [name]: value }

    if (name === 'at100' && value === true) {
      sublimit = { ...sublimit, sublimit: account?.informations[0]?.limit }
    }
    if (name === 'yes') {
      sublimit = { ...sublimit, luc: false }
    } else if (name === 'luc') {
      sublimit = { ...sublimit, yes: false }
    }

    switch (sublimit.typeDeductible) {
      case 'none':
        sublimit = { ...sublimit, deductible: 0, min: 0, amount: 0, idCDeductiblePer: null }
        break
      case 'per':
        sublimit = { ...sublimit, amount: 0 }
        break
      case 'amount':
        sublimit = { ...sublimit, deductible: 0, min: 0, idCDeductiblePer: null }
        break
    }

    switch (sublimit.typeBi) {
      case 'days':
        sublimit = { ...sublimit, amountBi: 0 }
        break
      case 'money':
        sublimit = { ...sublimit, daysBi: 0 }
        break
    }
    validateInput(sublimit, index)
    setSublimits(state => {
      const newState = [...state]
      newState[index] = sublimit

      return newState
    })
  }

  const handleDeleteSublimit = async (index: number) => {
    const sublimit = sublimts[index]
    const coverage = coverages.find(cov => cov.coverage === sublimit.title)
    setCoverageSelect(undefined)

    await deleteSublimits([sublimit])
    setSublimits(state => {
      const newState = state.filter((sub, i) => index !== i)

      return newState
    })

    setFormErrors(state => {
      const newState = state.filter((errors, i) => index !== i)

      return newState
    })

    if (coverage) {
      setAvailableOptions(state => {
        const newState = [...state, coverage]

        return newState
      })
    }
  }

  const validateInput = (form: Partial<SublimitDto>, index: number) => {
    const errors = [...formErrors]
    const data = { ...form }

    try {
      schema.validateSync(data, { abortEarly: false, context: account })
      errors[index] = { ...initialErrorValues }
      setFormErrors(errors)
      setHasError(false)
    } catch (err) {
      if (err instanceof ValidationError) {
        errors[index] = { ...initialErrorValues }
        for (const result of err.inner) {
          const property = result.path as keyof FormErrors
          errors[index][property] = result.message
        }
        setHasError(true)

        setFormErrors(errors)
      }
    }
  }

  const validateForm = () => {
    const forms = [...sublimts]
    const errors = [...formErrors]
    let tempIndex = 0
    let hasErrors = true
    for (const [index, form] of forms.entries()) {
      try {
        schema.validateSync(form, { abortEarly: false, context: account })
        hasErrors = false
        errors[tempIndex] = { ...initialErrorValues }
      } catch (err) {
        if (err instanceof ValidationError) {
          errors[index] = { ...initialErrorValues }
          for (const result of err.inner) {
            const property = result.path as keyof FormErrors
            errors[index][property] = result.message
          }
          setHasError(true)
          setFormErrors(errors)
          hasErrors = true
          break
        }
      }
      tempIndex = index
    }
    console.log(formErrors, sublimts)

    if (!hasErrors) {
      setFormErrors(errors)
      setHasError(false)
    }

    return hasErrors
  }

  const handleToggle = (value: number, label: string) => () => {
    const idAccountCache = Number(localStorage.getItem('idAccount'))

    setFormErrors(state => {
      const tempError = [...state]
      tempError.push(initialErrorValues)

      return tempError
    })

    setSublimits(state => {
      const tempSublimits = [...state]
      tempSublimits.push({
        ...initialValues,
        title: label,
        idCCoverage: value,
        idAccount: idAccountCache || account?.id
      })

      return tempSublimits
    })
  }

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    const coverage = coverages.filter(cov => cov.coverage === selectedValue)[0]
    setCoverageSelect(coverage)
    setAvailableOptions(state => {
      const newState = state.filter(cov => cov.coverage !== selectedValue)

      return newState
    })
    const filter = availableOptions.filter(option => option.coverage === selectedValue)
    if (!filteredOptions.some(item => item.label === filter[0]?.coverage)) {
      setFilteredOptions(current => current.concat(filter))
    } else return
  }

  const handleClickSave = () => {
    const errors = validateForm()
    if (!errors && sublimts.length > 0) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setDisableBoundBtn(true)
    setDisableSaveBtn(true)
    const save: Partial<SublimitDto>[] = []
    const update: Partial<SublimitDto>[] = []

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const { title, ...sublimit } of sublimts) {
      sublimit.typeBi = sublimit.typeBi === '' ? 'days' : sublimit.typeBi
      if (sublimit.id) {
        update.push(sublimit)
      } else {
        save.push(sublimit)
      }
    }

    try {
      await updateSublimits(update)
      await saveSublimits(save)
      await getAccountData()

      setDisableBoundBtn(false)
      setDisableSaveBtn(false)
      setHasError(true)

      setBadgeData({
        message: 'The information has been updated',
        theme: 'success',
        open: true,
        status: 'error'
      })
      setTimeout(() => {
        setBadgeData({
          message: '',
          theme: 'success',
          open: false,
          status: 'error'
        })
      }, 1000)
    } catch (error) {
      setDisableBoundBtn(false)
      setDisableSaveBtn(false)
    }
  }

  const handleUpdateStatus = async () => {
    await updateAccountsStatus({
      updateStatus: [
        {
          idAccount: formInformationData.id,
          status: 5
        }
      ]
    })
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

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  const getAccountData = async () => {
    const errors: FormErrors[] = []
    const idAccountCache = Number(localStorage.getItem('idAccount'))
    setAccountId(idAccountCache)
    const accountData = await getAccountById(idAccountCache)

    if (accountData && accountData.sublimits.length > 0) {
      setSublimits([...accountData.sublimits])
      accountData.sublimits.forEach(() => {
        errors.push(initialErrorValues)
      })
      setFormErrors([...errors])
    }
  }

  useEffect(() => {
    getAccountData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (account && account?.sublimits?.length > 0) {
      const tempSublimits = [...account.sublimits]
      let temp = [...availableOptions]
      tempSublimits.forEach(sublimit => {
        temp = temp.filter(item => item.coverage !== sublimit.title)
      })
      setAvailableOptions([...temp])
    } else {
      setAvailableOptions([...coverages])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverages, account])

  useEffect(() => {
    if (accountData.formsData.form1?.id) {
      setAccountId(accountData.formsData.form1.id)
      setFormInformationData(accountData.formsData.form1)
    }
  }, [accountData, setAccountId])

  return (
    <>
      <GeneralContainerSublimits>
        <ContainerTitleSublimits>
          <Typography variant='h5'>Sublimits</Typography>
          <div style={{ width: 'fit-content', float: 'right', alignSelf: 'end' }}>
            <CustomAlert {...badgeData} />
          </div>

          <InputsContainerSublimits>
            <NumericFormat
              value={account?.informations[0].limit || 'Limit'}
              prefix='$'
              allowLeadingZeros
              thousandSeparator=','
              customInput={TextField}
              disabled
              name='Limit'
              label='Limit'
              multiline
              variant='outlined'
              decimalScale={2}
              sx={{ width: '48.5%' }}
            />
            <FormControl fullWidth>
              <Select
                sx={{ width: '48.5%', outline: 'none', borderColor: texButtonColor }}
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={MenuProps}
                value={coverageSelect?.coverage || ''}
                displayEmpty
                onChange={handleChangeSelect}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return (
                      <Typography
                        sx={{
                          color: texButtonColor,
                          fontSize: userThemeConfig.typography?.size.px15,
                          fontWeight: 500,
                          letterSpacing: '0.46px'
                        }}
                      >
                        ADD COVERAGE
                      </Typography>
                    )
                  }

                  return selected as unknown as string[]
                }}
              >
                {coverages &&
                  availableOptions.map((item, index) => (
                    <MenuItem
                      value={item.coverage}
                      role={undefined}
                      onClick={handleToggle(item.id, item.coverage)}
                      key={index}
                      sx={{
                        height: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '4px 20px'
                      }}
                    >
                      <Checkbox
                        sx={{
                          width: '24px',
                          height: '24px',
                          color: '#2535A8',
                          '&.Mui-checked': {
                            color: '#2535A8'
                          }
                        }}
                        checked={checked.indexOf(item.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                      <Typography sx={{ ml: 5 }}>{item.coverage}</Typography>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </InputsContainerSublimits>
        </ContainerTitleSublimits>
        <Box sx={{ flexGrow: 1, mt: 6, width: '100%' }}>
          <Grid container spacing={{ xs: 2, sm: 5.3, md: 5.3 }} rowSpacing={12} columns={{ xs: 4, sm: 8, md: 12 }}>
            {sublimts &&
              sublimts.length > 0 &&
              sublimts.map((item, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <GenericCard
                    data={item}
                    title={item.title}
                    index={index}
                    handleOnChangeByInputForm={handleOnChangeByInputForm}
                    formInformation={account}
                    formErrors={formErrors[index]}
                    handleOnDeleteForm={handleDeleteSublimit}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </GeneralContainerSublimits>
      <NextContainer>
        <Button
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
          disabled={disableSaveBtn}
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
      </NextContainer>
    </>
  )
}

export default Sublimits
