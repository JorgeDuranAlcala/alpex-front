import { Grid } from '@mui/material';
import { ReactNode, useContext, useEffect } from 'react';
import { errorsSecurity } from '../../../../../../services/accounts/dtos/security.dto';
import { FormSectionProvider } from '../../context/formSection/FormSectionProvider';
import { FormValidationsContext } from '../../context/formValidations/FormValidationsContext';
import { Security } from '../../store/securitySlice';

import { useAppSelector } from '@/store';
import { CalculateSecurity } from '../../utils/calculates-securities';
import { ButtonAddDiscount } from '../discounts/ButtonAddDiscount';
import { DiscountsProvider } from '../discounts/DiscountsProvider';
import { ListDiscounts } from '../discounts/ListDiscounts';
import { Binder, Consecutive, ContactCountry, ContactEmail, ContactPhone, DynamicComissionAmount, DynamicComissionPercent, FrontingFeeAmount, FrontingFeePercent, GrossOrNetPremiumAt100, GrossPremiumPerShareAmount, NetReinsurancePremium, PremiumPerShareAmount, ReinsuranceBrokerageAmount, ReinsuranceBrokeragePercent, ReinsuranceCompany, SelectRetroCedant, SelectRetroCedantContact, ShareAmount, SharePercent, TaxesAmount, TaxesPercent } from './inputs';
import { SwitchFrontingFee } from './inputs/SwitchFrontingFee';
import { SwitchTaxes } from './inputs/SwitchTaxes';

export type UpdateAllErrors = (allErrors: boolean[]) => void;
interface FormSectionProps {
  security: Security;
  index: number;
  children: ({ allErrors, updateAllErrors }: {
    allErrors: boolean[], updateAllErrors: UpdateAllErrors
  }) => ReactNode;

}

interface ColumnInputs extends Omit<FormSectionProps, 'children'> {
  isActiveErrors: boolean,
  errorsSecurity: errorsSecurity
}

export const FormSection = ({ security, index, children }: FormSectionProps) => {

  const {
    isActiveErrors,
    errorsSecurity,
    allErrors,
    validateForm,
    updateAllErrors
  } = useContext(FormValidationsContext)


  useEffect(() => {
    validateForm({ securityParam: security, index })
  }, [index, security, validateForm])

  return (
    <FormSectionProvider>
      <DiscountsProvider>

        {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}

        <Grid container item xs={12} sm={12}>
          <Grid item xs={12} sm={12}>

            {/** FormButtonDelete */}
            {index > 0 && security.view === 1 &&
              children({ allErrors, updateAllErrors })
            }
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          {/* Col-1 */}
          <Grid item xs={12} sm={4}>
            <ColumnInputs_1
              index={index}
              security={security}
              isActiveErrors={isActiveErrors}
              errorsSecurity={errorsSecurity[index]}
            />
          </Grid>

          {/* Col-2 */}
          <Grid item xs={12} sm={4}>
            <ColumnInputs_2
              index={index}
              security={security}
              isActiveErrors={isActiveErrors}
              errorsSecurity={errorsSecurity[index]}
            />
          </Grid>

          {/* Col-3 */}
          <Grid item xs={12} sm={4}>
            <ColumnInputs_3
              index={index}
              security={security}
              isActiveErrors={isActiveErrors}
              errorsSecurity={errorsSecurity[index]}
            />
          </Grid>

        </Grid>

        <Grid
          container
          spacing={5}
          sx={{
            ...(!security.isShowRetroCedant ? { mt: 8 } : null)
          }}
        >
          {security.isShowToggleTaxes ? (
            <Grid item xs={12} sm={4}>
              <ColumnTaxes
                index={index}
                security={security}
                isActiveErrors={isActiveErrors}
                errorsSecurity={errorsSecurity[index]}
              />
            </Grid>
          ) : null}

          {security.isShowToggleFrontingFee ? (
            <Grid item xs={12} sm={4}>
              <ColumnFrontingFee
                index={index}
                security={security}
                isActiveErrors={isActiveErrors}
                errorsSecurity={errorsSecurity[index]}
              />
            </Grid>
          ) : null}

          <ListDiscounts formIndex={index} />
        </Grid>

        <ButtonAddDiscount formIndex={index} isDisabled={security.view === 2} />
      </DiscountsProvider>
    </FormSectionProvider>
  )
}

function ColumnInputs_1({ index, security, isActiveErrors, errorsSecurity }: ColumnInputs) {
  return (
    <>
      <GrossOrNetPremiumAt100
        value={security.netPremiumAt100}
        errorMessage={errorsSecurity.netPremiumAt100}
        isGross={security.isGross}
        activeView={security.view}
        index={index}
        isActiveErrors={isActiveErrors}
      />

      <SharePercent
        value={security.share}
        errorMessage={errorsSecurity.share}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
      />

      <GrossPremiumPerShareAmount
        value={security.grossPremiumPerShare}
        errorMessage={errorsSecurity.premiumPerShareAmount}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
      />

      {security.isGross && (
        <ReinsuranceBrokeragePercent
          value={security.reinsuranceBrokerage}
          errorMessage={errorsSecurity.reinsuranceBrokerage}
          index={index}
          isActiveErrors={isActiveErrors}
          isDisabled={security.view === 2}
        />
      )}

      <DynamicComissionPercent
        value={security.dynamicCommission}
        errorMessage={errorsSecurity.dynamicCommission}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
      />
    </>
  )
}

function ColumnInputs_2({ index, security, isActiveErrors, errorsSecurity }: ColumnInputs) {

  const { information } = useAppSelector(state => state.securitySlice);

  const operationSecurity: CalculateSecurity = new CalculateSecurity()
    .setInformation(information)
    .setSecurity(security)

  return (
    <>
      <ReinsuranceCompany
        value={security.idCReinsuranceCompany?.id ? String(security.idCReinsuranceCompany?.id) : ''}
        errorMessage={errorsSecurity.idCReinsuranceCompany}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
        security={security}
      />

      <ShareAmount
        value={security.shareAmount}
        errorMessage={errorsSecurity.shareAmount}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
      />

      <PremiumPerShareAmount
        value={security.premiumPerShareAmount}
        errorMessage={errorsSecurity.premiumPerShareAmount}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
        operationSecurity={operationSecurity}
      />

      {security.isGross && (
        <ReinsuranceBrokerageAmount
          value={security.brokerAgeAmount}
          errorMessage={errorsSecurity.brokerAgeAmount}
          index={index}
          isActiveErrors={isActiveErrors}
          isDisabled={security.view === 2}
          operationSecurity={operationSecurity}
        />
      )}

      <DynamicComissionAmount
        value={security.dynamicCommissionAmount}
        errorMessage={errorsSecurity.dynamicCommissionAmount}
        index={index}
        isActiveErrors={isActiveErrors}
        isDisabled={security.view === 2}
        operationSecurity={operationSecurity}
      />
    </>
  )
}

function ColumnInputs_3({ index, security, isActiveErrors, errorsSecurity }: ColumnInputs) {

  return (
    <>
      <Binder
        value={security.idCReinsuranceCompanyBinder ? String(security.idCReinsuranceCompanyBinder?.id) : ''}
        index={index}
        isDisabled={security.view === 2}
      />

      <Consecutive value={0} />

      <NetReinsurancePremium
        value={security.netReinsurancePremium}
        errorMessage={errorsSecurity.netReinsurancePremium}
        isActiveErrors={isActiveErrors}
      />

      {security.isShowRetroCedant ? (
        <>
          <SelectRetroCedant
            value={security.idCRetroCedant?.id ? String(security.idCRetroCedant.id) : ''}
            index={index}
            errorMessage={errorsSecurity.idCRetroCedant}
            isActiveErrors={isActiveErrors}
            isDisabled={security.view === 2}
          />
          <SelectRetroCedantContact
            value={security.idCRetroCedantContact?.id ? String(security.idCRetroCedantContact?.id) : ''}
            index={index}
            errorMessage={errorsSecurity.idCRetroCedantContact}
            isActiveErrors={isActiveErrors}
            isDisabled={security.view === 2}
          />
        </>
      ) : null}

      {security.isFrontingFeeEnabled && security.idCRetroCedantContact?.id && (
        <>
          <ContactEmail value={security.idCRetroCedantContact?.email} />

          <ContactPhone value={security.idCRetroCedantContact?.phone} />

          <ContactCountry
            value={
              security.idCRetroCedantContact.__idCCountry__
                ? security.idCRetroCedantContact?.__idCCountry__.id
                : security.idCRetroCedantContact.idCCountry ?? ''
            }
          />
        </>
      )}
    </>
  )
}

function ColumnTaxes({ index, security, isActiveErrors, errorsSecurity }: ColumnInputs) {

  const { information } = useAppSelector(state => state.securitySlice);

  const operationSecurity: CalculateSecurity = new CalculateSecurity()
    .setInformation(information)
    .setSecurity(security)

  return (
    <>
      <SwitchTaxes
        index={index}
        isChecked={security.isTaxesEnabled || false}
        isDisabled={security.view === 2}
      />

      <TaxesPercent
        value={security.taxes}
        errorMessage={errorsSecurity.taxes}
        index={index}
        operationSecurity={operationSecurity}
        isDisabled={!security.isTaxesEnabled || security.view === 2}
        isActiveErrors={isActiveErrors}
        security={security}
      />

      <TaxesAmount
        value={security.taxesAmount}
        errorMessage={errorsSecurity.taxesAmount}
        index={index}
        operationSecurity={operationSecurity}
        isDisabled={!security.isTaxesEnabled || security.view === 2}
        isActiveErrors={isActiveErrors}
      />
    </>
  )
}

function ColumnFrontingFee({ index, security, isActiveErrors, errorsSecurity }: ColumnInputs) {

  const { information } = useAppSelector(state => state.securitySlice);

  const operationSecurity: CalculateSecurity = new CalculateSecurity()
    .setInformation(information)
    .setSecurity(security)

  return (
    <>
      <SwitchFrontingFee
        index={index}
        isChecked={security.isFrontingFeeEnabled || false}
        isDisabled={security.view === 2}
        security={security}
      />

      <FrontingFeePercent
        value={security.frontingFee}
        errorMessage={errorsSecurity.frontingFee}
        index={index}
        operationSecurity={operationSecurity}
        isDisabled={!security.isFrontingFeeEnabled || security.view == 2}
        security={security}
        isActiveError={isActiveErrors}
      />

      <FrontingFeeAmount
        value={security.frontingFeeAmount}
        errorMessage={errorsSecurity.frontingFeeAmount}
        index={index}
        operationSecurity={operationSecurity}
        isDisabled={!security.isFrontingFeeEnabled || security.view == 2}
        isActiveErrors={isActiveErrors}
      />
    </>
  )
}
