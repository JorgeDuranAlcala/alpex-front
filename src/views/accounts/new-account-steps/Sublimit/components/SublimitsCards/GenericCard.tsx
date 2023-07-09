import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard } from 'src/styles/Forms/Sublimits'

import * as yup from 'yup'
import { FormErrors, initialErrorValues } from '../../Sublimits'
import BusinessInterruption, {
  validateBusinessInterruption
} from './components/BusinessInterruption/BusinessInterruption'
import Coinsurance, { validateCoinsurance } from './components/Coinsurance/Coinsurance'
import { DeductibleMaterialDamage } from './components/DeductibleMaterialDamage'
import { validateDeductibleMaterialDamage } from './components/DeductibleMaterialDamage/DeductibleMaterialDamage'
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

  const handleChangeSubLimit = (subLimitParam: SublimitDto) => {
    const subLimitsTemp = [...subLimits]
    subLimitsTemp[index] = {
      ...subLimitsTemp[index],
      ...subLimitParam
    }

    validateForm(subLimitsTemp[index])
    setSubLimits(subLimitsTemp)
  }

  const onDeleteItem = async () => {
    await handleOnDeleteForm(index)
  }

  const validateForm = (subLimitParam: SublimitDto) => {
    let data = { ...initialErrorValues }
    const schema = yup.object().shape({
      ...inputSublimit_validations({ limit, isNotYesLuc: DONT_SHOW_YES_LUC.includes(subLimitParam.title) }).fields,
      ...validateDeductibleMaterialDamage({ typeDeductible: subLimitParam.typeDeductible }).fields,
      ...validateBusinessInterruption({ typeBi: subLimitParam.typeBi }).fields,
      ...validateCoinsurance().fields
    })

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
          onHandleChangeSubLimit={handleChangeSubLimit}
          isNotYesLuc={DONT_SHOW_YES_LUC.includes(subLimitCard.title)}
          errorCard={errorCard}
        />
        {!DONT_SHOW_DEDUCTIBLE_MATERIAL_DAMAGE.includes(subLimitCard.title) && (
          <DeductibleMaterialDamage
            subLimit={subLimitCard}
            onHandleChangeSubLimit={handleChangeSubLimit}
            errorCard={errorCard}
          />
        )}
        <Loss subLimit={subLimitCard} onHandleChangeSubLimit={handleChangeSubLimit} errorCard={errorCard} />
        <BusinessInterruption
          subLimit={subLimitCard}
          onHandleChangeSubLimit={handleChangeSubLimit}
          errorCard={errorCard}
        />
        <Coinsurance subLimit={subLimitCard} onHandleChangeSubLimit={handleChangeSubLimit} errorCard={errorCard} />
      </ContentCard>
    </ContainerCard>
  )
}

export default GenericCard
