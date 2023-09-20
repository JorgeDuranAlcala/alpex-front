import { Box, Grid } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { InsuredSelectorContext } from '../../../context/InsuredSelector/InsuredSelectorContext'
import { usePaymentInstallment } from '../../../hooks/usePaymentInstallment'
import { FormDetailsContainer } from '../../../styles/FormsDetails'
import { TextBody1_Semibold } from '../../../styles/TextBody1_Semibold'
import { DisabledTextField } from '../../inputs/DisabledTextField'
import { InputDate } from '../../inputs/InputDate'
import { AnimatedLoadingCenter } from '../../loadings/AnimatedLoadingCenter'

export const FormPaymentInstallment = () => {
  const { selectedInsuredId } = useContext(InsuredSelectorContext)

  const { isLoading, installments, getDataByInsuredId } = usePaymentInstallment()
  const lastInsuredId = useRef<number | null>(null)

  useEffect(() => {
    if (lastInsuredId.current === selectedInsuredId) return

    if (selectedInsuredId) {
      lastInsuredId.current = selectedInsuredId
      getDataByInsuredId(selectedInsuredId)
    }
  }, [selectedInsuredId, getDataByInsuredId])

  return (
    <FormDetailsContainer>
      <Grid container spacing={5}>
        {installments.map((installment, index) => (
          <Grid key={`${installment.settlementDueDate}_${index}`} item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%'
              }}
            >
              <TextBody1_Semibold>Installment {index + 1}</TextBody1_Semibold>
              <DisabledTextField
                label='Premium payment warranty'
                value={installment.premiumPaymentWarranty.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
              />
              <DisabledTextField label='Payment %' value={`${installment.paymentPercent}%`} />
              <DisabledTextField
                label='Balance due'
                value={`${installment.balanceDue.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}`}
              />
              <InputDate
                label='Settlement due date'
                isDisabled={true}
                value={installment.settlementDueDate}
                onChange={() => null}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <AnimatedLoadingCenter isLoading={isLoading} />
    </FormDetailsContainer>
  )
}
