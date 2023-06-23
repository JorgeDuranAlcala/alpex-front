import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'
import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Grid,
  Icon
} from '@mui/material'

import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { SecurityContext } from '../SecurityView'
import { CalculateSecurity } from '../utils/calculates-securities'
import {
  Binder,
  Consecutive,
  ContactCountry,
  ContactEmail,
  ContactPhone,
  DynamicComissionAmount,
  DynamicComissionPercent,
  FrontingFeeAmount,
  FrontingFeePercent,
  GrossOrNetPremiumAt100,
  GrossPremiumPerShareAmount,
  NetReinsurancePremium,
  PremiumPerShareAmount,
  ReinsuranceBrokerageAmount,
  ReinsuranceBrokeragePercent,
  ReinsuranceCompany,
  SelectRetroCedant,
  SelectRetroCedantContact,
  ShareAmount,
  SharePercent,
  TaxesAmount,
  TaxesPercent,
  dynamicComissionAmount_validations,
  dynamicComissionPercent_validations,
  frontingFeeAmount_validations,
  frontingFeePercent_validations,
  grossOrNetPremiumAt100_validations,
  netReinsurancePremium_validations,
  premiumPerShareAmount_validations,
  reinsuranceBrokerageAmount_validations,
  reinsuranceBrokeragePercent_validations,
  selectRetroCedantContact_validations,
  selectRetroCedant_validations,
  shareAmount_validations,
  sharePercent_validations,
  taxesAmount_validations,
  taxesPercent_validations
} from './inputs'
import { SwitchFrontingFee } from './inputs/SwitchFrontingFee'
import { SwitchTaxes } from './inputs/SwitchTaxes'

// type Timer = ReturnType<typeof setInterval>
// let typingTimer: Timer
// const doneTypingInterval = 1000 // Tiempo en milisegundos para considerar que se dejó de escribir
const initialErrorValues: errorsSecurity = {
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
export const FormSection = ({ index, security, onDeleteItemList }: FormSectionProps) => {
  const [isGross, setIsGross] = useState<boolean>(security.isGross)
  const [errorsSecurity, setErrorsSecurity] = useState<errorsSecurity>(initialErrorValues)
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(security.frontingFeeActive || false)
  const [isTaxesEnabled, setIsTaxesEnabled] = useState(false);

  // const [isTaxesEnabled, setIsTaxesEnabled] = useState(security.taxesActive || false);

  const [avaliableReinsurers, setAvaliableReinsurers] = useState<ReinsuranceCompanyDto[]>([])

  const {
    allErrors,
    setAllErrors,
    information,
    companiesSelect,
  } = useContext(SecurityContext)

  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { retroCedants } = useGetAllRetroCedants()
  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()
  const { countries } = useGetAllCountries()
  const operationSecurity: CalculateSecurity = new CalculateSecurity().setInformation(information).setSecurity(security)

  const schemaRetrocedant = yup.object().shape({
    ...selectRetroCedant_validations({ frontingFeeEnabled }).fields,
    ...selectRetroCedantContact_validations({ frontingFeeEnabled }).fields,
    ...frontingFeePercent_validations({ frontingFeeEnabled }).fields,
    ...frontingFeeAmount_validations({ frontingFeeEnabled }).fields,
  })

  const schema = yup.object().shape({
    ...grossOrNetPremiumAt100_validations().fields,
    ...sharePercent_validations().fields,
    ...shareAmount_validations().fields,
    ...premiumPerShareAmount_validations().fields,
    ...reinsuranceBrokeragePercent_validations({ isGross }).fields,
    ...reinsuranceBrokerageAmount_validations({ isGross }).fields,
    ...dynamicComissionPercent_validations().fields,
    ...dynamicComissionAmount_validations().fields,
    ...taxesAmount_validations({ isGross }).fields,
    ...taxesPercent_validations({ isGross }).fields,
    ...netReinsurancePremium_validations().fields,
  })

  const validateForm = (securityParam: SecurityDto) => {
    let data = { ...initialErrorValues }

    const errorsTemp = [...allErrors]

    let combinedSchema = yup.object().shape({
      ...schema.fields
    })

    // Combinar los esquemas
    if (securityParam.frontingFeeActive && (securityParam.share || securityParam.premiumPerShareAmount)) {
      combinedSchema = yup.object().shape({
        ...schema.fields,
        ...schemaRetrocedant.fields
      })
    }

    errorsTemp[index] = false
    combinedSchema
      .validate(securityParam, { abortEarly: false })
      .then(function () {
        errorsTemp[index] = false
        setErrorsSecurity(initialErrorValues)
      })
      .catch(function (err) {
        for (const error of err?.inner) {
          data = {
            ...data,
            [error.path]: error.message
          }
        }
        errorsTemp[index] = true
        console.log({ data, index })
        setErrorsSecurity(data)

        //setEnableNextStep(false)
      })
      .finally(() => {
        console.log({ errorsTemp, index })
        setAllErrors(() => [...errorsTemp])
      })
  }

  useEffect(() => {
    const companies = reinsuranceCompany?.map(company => {
      return {
        id: company.id,
        name: company.name,
        special: company.idSubscriptionType === 1,
        active: true
      }
    })
    setAvaliableReinsurers(companies || [])
  }, [reinsuranceCompany])

  useEffect(() => {
    if (security?.id) {
      setIdRetroCedant(security.idCRetroCedant?.id)
    }

    setFrontingFeeEnabled(() => security.frontingFeeActive)
    setIsGross(() => security.isGross)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security])

  useEffect(() => {
    validateForm(security)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGross, frontingFeeEnabled])

  useEffect(() => {
    validateForm(security)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
      <Grid container item xs={12} sm={12}>

        <Grid item xs={12} sm={12}>
          {!security.id && index > 0 && (
            <div
              className='section action-buttons'
              style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
            >
              <Icon
                component={DeleteOutlineIcon}
                amplitude={10}
                style={{
                  fontSize: '34px',
                  cursor: 'pointer',
                  zIndex: '1000'
                }}
                onClick={() => onDeleteItemList(index)}
              />
            </div>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        {/* Col-1 */}
        <Grid item xs={12} sm={4}>

          <GrossOrNetPremiumAt100
            value={security.netPremiumAt100}
            isError={errorsSecurity.netPremiumAt100 !== ''}
            isGross={isGross}
            index={index}
            validateForm={validateForm}
          />

          <SharePercent
            value={security.share}
            isError={errorsSecurity.share !== ''}
            index={index}
            validateForm={validateForm}
          />

          <GrossPremiumPerShareAmount
            value={security.premiumPerShareAmount}
            isError={errorsSecurity.premiumPerShareAmount !== ''}
            validateForm={validateForm}
            index={index}
            operationSecurity={operationSecurity}
          />


          {isGross && (
            <ReinsuranceBrokeragePercent
              value={security.reinsuranceBrokerage}
              isError={errorsSecurity.reinsuranceBrokerage !== ''}
              index={index}
              validateForm={validateForm}
            />
          )}

          <DynamicComissionPercent
            value={security.dynamicCommission}
            isError={errorsSecurity.dynamicCommission !== ''}
            index={index}
            validateForm={validateForm}
          />



        </Grid>
        {/* Col-2 */}
        <Grid item xs={12} sm={4}>

          <ReinsuranceCompany
            value={String(security.idCReinsuranceCompany?.id) || ''}
            isError={errorsSecurity.idCReinsuranceCompany !== ''}
            index={index}
            validateForm={validateForm}
            avaliableReinsurers={avaliableReinsurers}
            companiesSelect={companiesSelect}
            security={security}
            setIsGross={setIsGross}
            setFrontingFeeEnabled={setFrontingFeeEnabled}
          />

          {/* // Todo - New Component */}
          <ShareAmount
            value={'??'}
            isError={errorsSecurity.shareAmount !== ''}
            index={index}
            validateForm={validateForm}
          />

          <PremiumPerShareAmount
            value={security.premiumPerShareAmount}
            isError={errorsSecurity.premiumPerShareAmount !== ''}
            index={index}
            validateForm={validateForm}
            operationSecurity={operationSecurity}
          />


          {isGross && (

            <ReinsuranceBrokerageAmount
              value={security.brokerAgeAmount}
              isError={errorsSecurity.brokerAgeAmount !== ''}
              index={index}
              validateForm={validateForm}
              operationSecurity={operationSecurity}
            />

          )}

          <DynamicComissionAmount
            value={security.dynamicCommissionAmount}
            isError={errorsSecurity.dynamicCommissionAmount !== ''}
            index={index}
            validateForm={validateForm}
            operationSecurity={operationSecurity}
          />


        </Grid>
        {/* Col-3 */}
        <Grid item xs={12} sm={4}>

          <Binder
            value={1}
            binders={[
              { id: 1, description: '00000001' },
              { id: 2, description: '00000002' },
            ]}
          />

          <Consecutive
            value={1}
          />

          <NetReinsurancePremium
            value={security.netReinsurancePremium}
            isError={errorsSecurity.netReinsurancePremium !== ''}
          />


          {/* {frontingFeeEnabled && (security.share || security.premiumPerShareAmount) ? ( */}
          <>
            <SelectRetroCedant
              value={String(security.idCRetroCedant?.id) || ''}
              isError={errorsSecurity.idCRetroCedant !== ''}
              index={index}
              validateForm={validateForm}
              retroCedants={retroCedants}
              setIdRetroCedant={setIdRetroCedant}
            />
            <SelectRetroCedantContact
              value={String(security.idCRetroCedantContact?.id) || ''}
              isError={errorsSecurity.idCRetroCedantContact !== ''}
              index={index}
              validateForm={validateForm}
              retroCedantContacts={retroCedantContacts}
            />
          </>
          {/* // ) : (
          //   <></>
          // )} */}


          {frontingFeeEnabled && security.idCRetroCedantContact?.id && (
            <>
              <ContactEmail
                value={security.idCRetroCedantContact?.email}
              />

              <ContactPhone
                value={security.idCRetroCedantContact?.phone}
              />

              <ContactCountry
                value={security.idCRetroCedantContact.__idCCountry__
                  ? security.idCRetroCedantContact?.__idCCountry__.id
                  : security.idCRetroCedantContact.idCCountry ?? ''}
                countries={countries}
              />
            </>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={5} sx={{ mb: 16 }}>
        <Grid item xs={12} sm={4}>
          <SwitchTaxes
            index={index}
            validateForm={validateForm}
            security={security}
            isChecked={frontingFeeEnabled}
            setIsTaxesEnabled={setIsTaxesEnabled}
          />
          {isTaxesEnabled && (
            <>
              <TaxesPercent
                value={security.taxes}
                isError={errorsSecurity.taxes !== ''}
                index={index}
                validateForm={validateForm}
              />

              <TaxesAmount
                value={security.taxesAmount}
                isError={errorsSecurity.taxesAmount !== ''}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
              />
            </>

          )}
        </Grid>

        <Grid item xs={12} sm={4} >
          <SwitchFrontingFee
            index={index}
            validateForm={validateForm}
            security={security}
            isChecked={frontingFeeEnabled}
            setFrontingFeeEnabled={setFrontingFeeEnabled}
          />

          {frontingFeeEnabled && (
            <>
              <FrontingFeePercent
                value={security.frontingFee}
                isError={errorsSecurity.frontingFee !== ''}
                index={index}
                validateForm={validateForm}
              />

              <FrontingFeeAmount
                value={security.frontingFeeAmount}
                isError={errorsSecurity.frontingFeeAmount !== ''}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
              />
            </>

          )}
        </Grid>
      </Grid>
    </div>
  )
}
