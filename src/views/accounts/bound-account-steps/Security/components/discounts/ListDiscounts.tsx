import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import { SecurityContext } from '../../SecurityViewBound'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountAmount } from '../inputs/DiscountAmount'
import { DiscountPercent } from '../inputs/DiscountPercent'
import { IDiscountInputs } from './DiscountsContext'

interface ListDiscountsProps {
  formIndex: number
  operationSecurity: CalculateSecurity
  view: number
  discounts: IDiscountInputs[]
  validateForm: (securityParam: SecurityDto) => void
}
export const ListDiscounts = ({ formIndex, operationSecurity, validateForm, discounts, view }: ListDiscountsProps) => {
  const {
    securities,

    calculateSecurities
  } = useContext(SecurityContext)

  const removeDiscountByIndex = (removeIndex: number) => {
    const securitiesTemp = [...securities]
    const newDiscounts = discounts.filter((discount, index) => removeIndex !== index)
    securitiesTemp[formIndex].discounts = newDiscounts
    calculateSecurities(securitiesTemp)
    validateForm(securitiesTemp[formIndex])
  }

  return (
    <>
      {discounts.map((discountItem, index) => (
        <Grid item xs={12} sm={4} key={`discount_${formIndex}_${index}`}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>Discount {index + 1}</Typography>
            <IconButton disabled={view === 2} onClick={() => removeDiscountByIndex(index)}>
              <Icon icon='clarity:remove-line' />
            </IconButton>
          </Box>

          <DiscountPercent
            discounts={discounts}
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
