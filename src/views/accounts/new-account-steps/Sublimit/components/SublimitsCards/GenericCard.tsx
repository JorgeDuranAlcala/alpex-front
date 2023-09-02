import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { ContainerCard, ContentCard, HeaderCard } from 'src/styles/Forms/Sublimits'

import * as yup from 'yup'
import { FormErrors, initialErrorValues } from '../../Sublimits'
import BusinessInterruption from './components/BusinessInterruption/BusinessInterruption'
import Coinsurance, { validateCoinsurance } from './components/Coinsurance/Coinsurance'
import { DeductibleMaterialDamage } from './components/DeductibleMaterialDamage'
import { validateDeductibleMaterialDamage } from './components/DeductibleMaterialDamage/DeductibleMaterialDamage'
import { InputSubLimitCoverage } from './components/InputSubLimitCoverage'
import { inputSublimit_validations } from './components/InputSubLimitCoverage/InputSubLimitCoverage'
import { RenderFormGeneric } from './types'

// const DONT_SHOW_YES_LUC = [
//   'Wind',
//   'Flood',
//   'Earthquake',
//   'Fire',
//   'Machinery Breakdown',
//   'AMIT & SRCC',
//   'Electronic Equipment'
// ]

// const DONT_SHOW_BUSSINES_INTERRUPTION = ['Machinery Breakdown', 'AMIT & SRCC', 'Electronic Equipment']
// const DONT_SHOW_DEDUCTIBLE_MATERIAL_DAMAGE = ['Business  Interruption  Machinery Breakdown', 'Business  Interruption']

const coverageTypes = {
  standard: 'Standard',
  special: 'Special',
  businessInterruption: 'Business Interruption'
}

const GenericCard: React.FC<RenderFormGeneric> = ({
  subLimit,
  handleOnDeleteForm,
  limit,
  index = 0,
  formErrors,
  setSubLimits,
  subLimits,
  setErrors,
  showErrors,
  selectedCoverages,
  setIsUpdatedInfoByUser
}: RenderFormGeneric) => {
  const [subLimitCard, setSublimitCard] = useState<SublimitDto>(subLimit)
  const [errorCard, setErrorCard] = useState<FormErrors>(initialErrorValues)

  const handleChangeSubLimit = (subLimitParam: SublimitDto) => {
    const subLimitsTemp = [...subLimits]

    subLimitsTemp[index] = {
      ...subLimitsTemp[index],
      ...subLimitParam
    }
    setSubLimits(subLimitsTemp)
    validateForm(subLimitsTemp[index])
    setIsUpdatedInfoByUser(true);
  }

  const onDeleteItem = async () => {
    await handleOnDeleteForm(index)
  }

  const validateForm = (subLimitParam: SublimitDto) => {
    let data = { ...initialErrorValues }

    // console.log('no se ejecuta', subLimitParam)

    const schema = yup.object().shape({
      ...inputSublimit_validations({
        limit,
        isNotYesLuc: !getCoverageTypeByTitle(subLimitParam.title)?.yesAndLuc || false,

        // isNotYesLuc: DONT_SHOW_YES_LUC.includes(subLimitParam.title),
        luc: subLimitParam.luc
      }).fields,
      ...validateDeductibleMaterialDamage({ typeDeductible: subLimitParam.typeDeductible }).fields,
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

        // console.log({ data })
        errorsTemp[index] = true
        setErrorCard(data)
      })
      .finally(() => {
        setErrors(() => [...errorsTemp])
      })
  }


  const getCoverageTypeByTitle = (title: string) => {
    return selectedCoverages.find(coverage => coverage.coverage === title);
  }


  useEffect(() => {
    subLimit && setSublimitCard(subLimit)
    validateForm(subLimit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subLimit])

  // console.log("->", subLimitCard, selectedCoverages);

  return (
    <ContainerCard>
      <HeaderCard className='sublimits-generic-card-header' sx={{ padding: '5px 10px 5px 26px' }}>
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
            className='sublimits-generic-card-header-text'
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
          isNotYesLuc={!getCoverageTypeByTitle(subLimitCard.title)?.yesAndLuc || false}
          errorCard={errorCard}
          showErrors={showErrors}
          subLimits={subLimits}
        />

        {getCoverageTypeByTitle(subLimitCard.title)?.coverageTypeName === coverageTypes.special || getCoverageTypeByTitle(subLimitCard.title)?.coverageTypeName === coverageTypes.businessInterruption ? (
          <DeductibleMaterialDamage
            subLimit={subLimitCard}
            onHandleChangeSubLimit={handleChangeSubLimit}
            errorCard={errorCard}
            showErrors={showErrors}
          />
        ) : null}

        {getCoverageTypeByTitle(subLimitCard.title)?.coverageTypeName === coverageTypes.standard || getCoverageTypeByTitle(subLimitCard.title)?.coverageTypeName === coverageTypes.businessInterruption ? (
          <BusinessInterruption
            subLimit={subLimitCard}
            onHandleChangeSubLimit={handleChangeSubLimit}
            errorCard={errorCard}
            showErrors={showErrors}
          />
        ) : null}

        {/* {!DONT_SHOW_DEDUCTIBLE_MATERIAL_DAMAGE.includes(subLimitCard.title) && (
          <DeductibleMaterialDamage
            subLimit={subLimitCard}
            onHandleChangeSubLimit={handleChangeSubLimit}
            errorCard={errorCard}
            showErrors={showErrors}
          />
        )}

        {!DONT_SHOW_BUSSINES_INTERRUPTION.includes(subLimitCard.title) && (
          <BusinessInterruption
            subLimit={subLimitCard}
            onHandleChangeSubLimit={handleChangeSubLimit}
            errorCard={errorCard}
            showErrors={showErrors}
          />
        )} */}
        <Coinsurance
          subLimit={subLimitCard}
          onHandleChangeSubLimit={handleChangeSubLimit}
          errorCard={errorCard}
          showErrors={showErrors}
        />
      </ContentCard>
    </ContainerCard>
  )
}

export default GenericCard
