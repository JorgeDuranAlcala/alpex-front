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

  validateForm: (securityParam: SecurityDto) => void
}
export const ListDiscounts = ({ formIndex, operationSecurity, validateForm }: ListDiscountsProps) => {
  const {
    securities,

    calculateSecurities
  } = useContext(SecurityContext)

  const { discountsList, removeDiscountByIndex } = useContext(DiscountsContext)

  useEffect(() => {
    const totalAmountOfDiscounts = discountsList.reduce((value, current) => {
      value += current.discountAmount

      return value
    }, 0)

    const tempSecurities = [...securities]

    if (!tempSecurities[formIndex].totalAmountOfDiscounts && totalAmountOfDiscounts === 0) {
      // console.log('no actualizar');
      // debugger;

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

  return (
    <>
      {discountsList.map((discountItem, index) => (
        <Grid key={`discount_${formIndex}_${index}`} item xs={12} sm={4}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>Discount {index + 1}</Typography>
            <IconButton onClick={() => removeDiscountByIndex(index)}>
              <Icon icon='clarity:remove-line' />
            </IconButton>
          </Box>

          <DiscountPercent
            discountsList={discountsList}
            index={formIndex}
            discountIndex={index}
            value={discountItem.discountPercent}
            validateForm={() => null}
            operationSecurity={operationSecurity}
          />
          <DiscountAmount
            discountsList={discountsList}
            index={formIndex}
            discountIndex={index}
            value={discountItem.discountAmount}
            validateForm={() => null}
            operationSecurity={operationSecurity}
          />
        </Grid>
      ))}
    </>
  )
}
