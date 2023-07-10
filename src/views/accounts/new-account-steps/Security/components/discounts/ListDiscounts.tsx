import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import Icon from 'src/@core/components/icon'
import { SecurityContext } from '../../SecurityView'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountAmount } from '../inputs/DiscountAmount'
import { DiscountPercent } from '../inputs/DiscountPercent'
import { DiscountsContext } from './DiscountsContext'

interface ListDiscountsProps {
  formIndex: number
  operationSecurity: CalculateSecurity
  view: number

  validateForm: (securityParam: SecurityDto) => void
}
export const ListDiscounts = ({ formIndex, operationSecurity, validateForm, view }: ListDiscountsProps) => {
  const {
    firstTimeSecurities,
    securities,

    calculateSecurities
  } = useContext(SecurityContext)

  const { discountsList, removeDiscountByIndex, updateAllDiscounts } = useContext(DiscountsContext)

  useEffect(() => {
    if (discountsList.length === 0 && securities[formIndex].discounts.length > 0) {
      updateAllDiscounts(securities[formIndex].discounts)

      return
    }

    const totalAmountOfDiscounts = discountsList.reduce((value, current) => {
      value += current.amount

      return value
    }, 0)

    const tempSecurities = [...securities]

    if (!tempSecurities[formIndex].totalAmountOfDiscounts && totalAmountOfDiscounts === 0) {
      return
    }

    tempSecurities[formIndex] = {
      ...tempSecurities[formIndex],
      discounts: discountsList,
      totalAmountOfDiscounts
    }

    validateForm(tempSecurities[formIndex])

    calculateSecurities(tempSecurities)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsList, formIndex])

  useEffect(() => {
    if (firstTimeSecurities.length > 0) {
      if (formIndex > firstTimeSecurities.length - 1) return
      if (securities[formIndex].discounts.length > firstTimeSecurities[formIndex].discounts.length) {
        updateAllDiscounts(securities[formIndex].discounts)

        return
      }

      if (firstTimeSecurities[formIndex].discounts.length > 0) {
        updateAllDiscounts(firstTimeSecurities[formIndex].discounts)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeSecurities, formIndex])

  return (
    <>
      {discountsList.map((discountItem, index) => (
        <Grid item xs={12} sm={4} key={`discount_${formIndex}_${index}`}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>Discount {index + 1}</Typography>
            <IconButton disabled={view === 2} onClick={() => removeDiscountByIndex(index)}>
              <Icon icon='clarity:remove-line' />
            </IconButton>
          </Box>

          <DiscountPercent
            discountsList={discountsList}
            index={formIndex}
            discountIndex={index}
            value={discountItem.percentage}
            validateForm={() => null}
            operationSecurity={operationSecurity}
            view={view}
          />
          <DiscountAmount
            index={formIndex}
            discountIndex={index}
            value={discountItem.amount}
            validateForm={() => null}
            operationSecurity={operationSecurity}
            view={view}
          />
        </Grid>
      ))}
    </>
  )
}
