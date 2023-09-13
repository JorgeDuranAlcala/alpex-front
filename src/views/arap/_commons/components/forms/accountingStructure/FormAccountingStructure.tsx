import { Grid } from '@mui/material'
import { useAccountingStructure } from '../../../hooks/useAccountingStructure'
import { InsuredBy } from '../../../interfaces/InsuredBy.type'
import { FormDetailsContainer } from '../../../styles/FormsDetails'
import { DisabledTextField } from '../../inputs/DisabledTextField'
import { InputDate } from '../../inputs/InputDate'
import { SelectInsuredBy } from '../../inputs/SelectInsuredBy'
import { AnimatedLoadingCenter } from '../../loadings/AnimatedLoadingCenter'
import { AmountColumnInputs } from './AmountColumnInputs'

interface FormAccountingStructureProps {
  by: InsuredBy
}

export const FormAccountingStructure = ({ by }: FormAccountingStructureProps) => {
  const { isLoading, accountingStructure, getDataByInsuredId } = useAccountingStructure()

  return (
    <FormDetailsContainer>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={4}>
          <SelectInsuredBy by={by} onSelectInsuredId={getDataByInsuredId} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <InputDate value={accountingStructure.date} isDisabled={true} onChange={() => null} sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {by === 'reinsurer' ? (
            <DisabledTextField
              label='Net Reinsurance Premium'
              value={accountingStructure.netPremiumReinsurance.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
            />
          ) : by === 'broker' ? (
            <DisabledTextField
              label='Net Premium'
              value={accountingStructure.netPremium.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AmountColumnInputs
            label='Taxes'
            amountValue={accountingStructure.taxesAmount}
            percentValue={accountingStructure.taxesPercent}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AmountColumnInputs
            label='Reinsurance Brokerage'
            amountValue={accountingStructure.reinsuranceBrokerageAmount}
            percentValue={accountingStructure.reinsuranceBrokeragePercent}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <AmountColumnInputs
            label='Fronting Fee'
            amountValue={accountingStructure.frontingFeeAmount}
            percentValue={accountingStructure.frontingFeePercent}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={4}>
          <AmountColumnInputs
            label='Discounts'
            amountValue={accountingStructure.discountsAmount}
            percentValue={accountingStructure.discountsPercent}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <AmountColumnInputs
            label='Dynamic Commission'
            amountValue={accountingStructure.dynamicCommissionAmount}
            percentValue={accountingStructure.dynamicCommissionPercent}
          />
        </Grid>
      </Grid>

      <AnimatedLoadingCenter isLoading={isLoading} />
    </FormDetailsContainer>
  )
}
