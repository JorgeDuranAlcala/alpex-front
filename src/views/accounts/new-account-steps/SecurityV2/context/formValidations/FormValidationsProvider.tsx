import { errorsSecurity } from "@/services/accounts/dtos/security.dto";
import { ReactNode, useState } from "react";
import * as yup from 'yup';
import { FormValidationsContext, FormValidationsContextProps, ValidateFormProps } from './FormValidationsContext';

import {
  dynamicComissionAmount_validations,
  dynamicComissionPercent_validations,
  frontingFeeAmount_validations,
  frontingFeePercent_validations,
  grossOrNetPremiumAt100_validations,
  netReinsurancePremium_validations,
  premiumPerShareAmount_validations,
  reinsuranceBrokerageAmount_validations,
  reinsuranceBrokeragePercent_validations,

  // selectRetroCedantContact_validations,
  selectRetroCedant_validations,
  shareAmount_validations,
  sharePercent_validations,
  taxesAmount_validations,
  taxesPercent_validations
} from '../../components/form/inputs';
import { Security } from "../../store/securitySlice";

export const initialErrorValues: errorsSecurity = {
  netPremiumAt100: '',
  share: '',
  shareAmount: '',
  premiumPerShareAmount: '',
  grossPremiumPerShareAmount: '',
  reinsuranceBrokerage: '',
  brokerAgeAmount: '',
  dynamicCommission: '',
  dynamicCommissionAmount: '',
  frontingFee: '',
  frontingFeeAmount: '',
  taxes: '',
  taxesAmount: '',
  netReinsurancePremium: '',
  idCReinsuranceCompany: '',
  idCRetroCedantContact: '',
  idCRetroCedant: ''
}

export const FormValidationsProvider = ({ children }: { children: ReactNode }) => {

  const [errorsSecurity, setErrorsSecurity] = useState<FormValidationsContextProps['errorsSecurity']>({});
  const [allErrors, setAllErrors] = useState<boolean[]>([]);
  const [isActiveErrors, setIsActiveErrors] = useState(false);

  const setActiveErrors = (value: boolean) => {
    setIsActiveErrors(value);
  }

  const updateAllErrors = (errors: boolean[]) => {
    setAllErrors(errors);
  }

  const getSchema = (security: Security) => {

    const isGross = security.isGross;
    const isTaxesEnabled = security.isTaxesEnabled || false;

    return yup.object().shape({
      ...grossOrNetPremiumAt100_validations().fields,
      ...sharePercent_validations().fields,
      ...shareAmount_validations().fields,
      ...premiumPerShareAmount_validations().fields,
      ...reinsuranceBrokeragePercent_validations({ isGross }).fields,
      ...reinsuranceBrokerageAmount_validations({ isGross }).fields,
      ...dynamicComissionPercent_validations().fields,
      ...dynamicComissionAmount_validations().fields,
      ...taxesAmount_validations({ isGross, isTaxesEnabled }).fields,
      ...taxesPercent_validations({ isGross, isTaxesEnabled }).fields,
      ...netReinsurancePremium_validations().fields
    })

  }

  const getSchemaRetroCedant = (security: Security) => {

    const frontingFeeEnabled = security.isFrontingFeeEnabled || false;
    const isGross = security.isGross;

    return yup.object().shape({
      ...selectRetroCedant_validations({ frontingFeeEnabled, isGross }).fields,

      // ...selectRetroCedantContact_validations({ frontingFeeEnabled }).fields,
      ...frontingFeePercent_validations({ frontingFeeEnabled }).fields,
      ...frontingFeeAmount_validations({ frontingFeeEnabled }).fields
    })
  }

  const validateForm = ({ securityParam, index }: ValidateFormProps) => {
    let data = { ...initialErrorValues }

    const errorsTemp = [...allErrors]

    let combinedSchema = yup.object().shape({
      ...getSchema(securityParam).fields
    })

    combinedSchema = yup.object().shape({
      ...getSchema(securityParam).fields,
      ...getSchemaRetroCedant(securityParam).fields
    })

    errorsTemp[index] = false
    combinedSchema
      .validate(securityParam, { abortEarly: false })
      .then(function () {
        errorsTemp[index] = false
        setErrorsSecurity({
          ...errorsSecurity,
          [index]: initialErrorValues
        })
      })
      .catch(function (err) {
        for (const error of err?.inner) {
          data = {
            ...data,
            [error.path]: error.message
          }
        }
        errorsTemp[index] = true
        setErrorsSecurity({
          ...errorsSecurity,
          [index]: data
        })
      })
      .finally(() => {
        setAllErrors(() => [...errorsTemp])
      })
  }


  return (
    <FormValidationsContext.Provider value={{
      isActiveErrors,
      errorsSecurity,
      allErrors,
      updateAllErrors,
      validateForm,
      setActiveErrors,
    }}>
      {children}
    </FormValidationsContext.Provider>
  )

}
