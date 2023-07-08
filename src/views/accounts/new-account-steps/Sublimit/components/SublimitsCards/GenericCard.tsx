import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard } from 'src/styles/Forms/Sublimits'

import * as yup from 'yup'
import { FormErrors, initialErrorValues } from '../../Sublimits'
import BusinessInterruption from './components/BusinessInterruption/BusinessInterruption'
import Coinsurance from './components/Coinsurance/Coinsurance'
import { DeductibleMaterialDamage } from './components/DeductibleMaterialDamage'
import { InputSubLimitCoverage } from './components/InputSubLimitCoverage'
import { inputSublimit_validations } from './components/InputSubLimitCoverage/InputSubLimitCoverage'
import Loss from './components/Loss/Loss'
import { RenderFormGeneric } from './types'

const DONT_SHOW_YES_LUC = ['Wind', 'Flood', 'Earthquake']
const DONT_SHOW_DEDUCTIBLE_MATERIAL_DAMAGE = ['Business  Interruption  Machinery Breakdown', 'Business  Interruption']

const GenericCard: React.FC<RenderFormGeneric> = ({
  subLimit,
  handleOnDeleteForm,
  limit,
  index = 0,
  formErrors,
  setSubLimits,
  subLimits,
  setErrors
}: RenderFormGeneric) => {
  const [subLimitCard, setSublimitCard] = useState<SublimitDto>(subLimit)
  const [errorCard, setErrorCard] = useState<FormErrors>(initialErrorValues)

  const handleChangeSubLimit = (subLimitAmount: number) => {
    const subLimitsTemp = [...subLimits]
    subLimitsTemp[index] = {
      ...subLimitCard,
      sublimit: subLimitAmount
    }
    setSubLimits(subLimitsTemp)
  }
  const handleChangeYesLuc = (yesOrLuc: string) => {
    const subLimitsTemp = [...subLimits]
    subLimitsTemp[index] = {
      ...subLimitCard,
      luc: yesOrLuc === 'luc',
      yes: yesOrLuc === 'yes'
    }
    setSubLimits(subLimitsTemp)
  }

  const handleChangeDeductibleDamage = (subLimitParam: SublimitDto) => {
    const subLimitsTemp = [...subLimits]
    subLimitsTemp[index] = {
      ...subLimitsTemp[index],
      ...subLimitParam
    }

    setSubLimits(subLimitsTemp)
  }

  const onDeleteItem = async () => {
    await handleOnDeleteForm(index)
  }
  const schema = yup.object().shape({
    ...inputSublimit_validations({ limit }).fields
  })
  const validateForm = (subLimitParam: SublimitDto) => {
    let data = { ...initialErrorValues }

    const errorsTemp = [...formErrors]

    errorsTemp[index] = false
    schema
      .validate(subLimitParam, { abortEarly: false })
      .then(function () {
        errorsTemp[index] = false
        setErrorCard(initialErrorValues)
      })
      .catch(function (err) {
        for (const error of err?.inner) {
          data = {
            ...data,
            [error.path]: error.message
          }
        }
        console.log({ data })
        errorsTemp[index] = true
        setErrorCard(data)
      })
      .finally(() => {
        setErrors(() => [...errorsTemp])
      })
  }
  useEffect(() => {
    subLimit && setSublimitCard(subLimit)

    validateForm(subLimit)
  }, [subLimit])

  return (
    <ContainerCard>
      <HeaderCard sx={{ padding: '5px 10px 5px 26px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alingItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography
            className='ÑACÑASE'
            textTransform={'uppercase'}
            sx={{ color: '#FFF', display: 'flex', alignItems: 'center' }}
          >
            {subLimit?.title}
          </Typography>
          <IconButton onClick={onDeleteItem}>
            <Icon icon='mdi:delete-outline' fontSize={22} color='#FFF' />
          </IconButton>
        </Box>
      </HeaderCard>
      <ContentCard>
        <InputSubLimitCoverage
          limit={limit}
          subLimit={subLimitCard}
          onChangeInput={handleChangeSubLimit}
          onChangeYesOrLuc={handleChangeYesLuc}
          isNotYesLuc={DONT_SHOW_YES_LUC.includes(subLimitCard.title)}
          errorCard={errorCard}
        />
        {!DONT_SHOW_DEDUCTIBLE_MATERIAL_DAMAGE.includes(subLimitCard.title) && (
          <DeductibleMaterialDamage
            subLimit={subLimitCard}
            onHandleChangeDeductibleDamage={handleChangeDeductibleDamage}
          />
        )}
        <Loss subLimit={subLimitCard} onHandleChangeDeductibleDamage={handleChangeDeductibleDamage} />
        <BusinessInterruption subLimit={subLimitCard} onHandleChangeDeductibleDamage={handleChangeDeductibleDamage} />
        <Coinsurance subLimit={subLimitCard} onHandleChangeDeductibleDamage={handleChangeDeductibleDamage} />
      </ContentCard>
    </ContainerCard>
  )
}

export default GenericCard
