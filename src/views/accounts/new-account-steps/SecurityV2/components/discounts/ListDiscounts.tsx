import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { useAppDispatch, useAppSelector } from '@/store'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import Icon from 'src/@core/components/icon'
import { DiscountsContext } from '../../context/discounts/DiscountsContext'
import { updateSecuritiesAtIndex } from '../../store/securitySlice'
import { CalculateSecurity } from '../../utils/calculates-securities'
import { DiscountAmount } from '../form/inputs/DiscountAmount'
import { DiscountPercent } from '../form/inputs/DiscountPercent'

interface ListDiscountsProps {
  formIndex: number

}
export const ListDiscounts = ({ formIndex, }: ListDiscountsProps) => {

  const dispatch = useAppDispatch();

  const { information, securities } = useAppSelector(state => state.securitySlice);

  const operationSecurity: CalculateSecurity = new CalculateSecurity()
    .setInformation(information)
    .setSecurity({ ...securities[formIndex] })

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

    if (!securities[formIndex].totalAmountOfDiscounts && totalAmountOfDiscounts === 0) {
      return
    }

    dispatch(updateSecuritiesAtIndex({
      index: formIndex,
      security: {
        discounts: discountsList,
        totalAmountOfDiscounts
      } as SecurityDto
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsList, formIndex])

  // useEffect(() => {
  //   if (firstTimeSecurities.length > 0) {
  //     if (formIndex > firstTimeSecurities.length - 1) return
  //     if (securities[formIndex].discounts.length > firstTimeSecurities[formIndex].discounts.length) {
  //       updateAllDiscounts(securities[formIndex].discounts)

  //       return
  //     }

  //     if (firstTimeSecurities[formIndex].discounts.length > 0) {
  //       updateAllDiscounts(firstTimeSecurities[formIndex].discounts)
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [firstTimeSecurities, formIndex])

  return (
    <>
      {discountsList.map((discountItem, index) => (
        <Grid item xs={12} sm={4} key={`discount_${formIndex}_${index}`}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography>Discount {index + 1}</Typography>
            <IconButton disabled={securities[formIndex].view === 2} onClick={() => removeDiscountByIndex(index)}>
              <Icon icon='clarity:remove-line' />
            </IconButton>
          </Box>

          <DiscountPercent
            discountsList={discountsList}
            index={formIndex}
            discountIndex={index}
            value={discountItem.percentage}
            operationSecurity={operationSecurity}
            securities={securities}
            isDisabled={securities[formIndex].view === 2}
          />
          <DiscountAmount
            index={formIndex}
            discountIndex={index}
            value={discountItem.amount}
            isDisabled={securities[formIndex].view === 2}

          // operationSecurity={operationSecurity}
          />
        </Grid>
      ))}
    </>
  )
}
