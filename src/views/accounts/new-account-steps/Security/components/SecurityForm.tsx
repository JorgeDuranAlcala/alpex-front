import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'

import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Grid,
  Icon
} from '@mui/material'


import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { SecurityContext } from '../SecurityView'
import { CalculateSecurity } from '../utils/calculates-securities'
import { ButtonAddDiscount } from './discounts/ButtonAddDiscount'
import { DiscountsProvider } from './discounts/DiscountsProvider'
import { ListDiscounts } from './discounts/ListDiscounts'
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
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(security.frontingFeeActive || false);
  const [isShowToggleFrontingFee, setIsShowToggleFrontingFee] = useState(false);
  const [isTaxesEnabled, setIsTaxesEnabled] = useState(false);
  const [isShowToggleTaxes, setIsShowToggleTaxes] = useState(false);
  const [isShowRetroCedant, setIsShowRetroCedant] = useState(false);
  const [binders, setBinders] = useState<ReinsuranceCompanyBinderDto[]>([]);


  console.log(errorsSecurity)


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


    combinedSchema = yup.object().shape({
      ...schema.fields,
      ...schemaRetrocedant.fields
    })

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

  // useEffect(() => {
  //   validateForm(security)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  // ? USE EFFECT AL INICIAR EL FORMULARIO ---> PARA TAXES
  useEffect(() => {
    // ? Si formulario 1 tiene taxes y utiliza netpremium como base:
    // ? entonces no mostrar campos taxes ni botón toggleTaxes
    // ? por default el botton toggleTaxes esta en false (no se muestra)

    // ? else
    // ? Si formulario 1 tiene taxes y utiliza grosspremium como base:
    // ? entonces:
    // ?  1. - mostrar campos taxes y botón toggleTaxes con estado activado
    // ?  2. - copiar el valor de taxes que se colocó en el formulario 1
    if (security.taxesActive && security.isGross) {
      setIsShowToggleTaxes(true);
      setIsTaxesEnabled(true);
    }

    // ? else
    // ? Si formulario 1 NO tiene taxes:
    // ? entonces:
    // ?  1. - mostrar campos taxes y botón toggleTaxes
    else if (!security.taxesActive) {
      setIsShowToggleTaxes(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ? USE EFFECT AL INICIAR EL FORMULARIO ---> PARA FRONTING FEE
  useEffect(() => {
    // ? Si formulario 1 tiene fronting y utiliza netpremium como base:
    // ? entonces:
    // ?  1. - no mostrar campos frontingFee ni botón toggleFrontingFee
    // ?  2. - no mostrar campos Retro cedant
    // ? por default el botón toggleFrontingFee esta en false (no se muestra)
    // ? por default el estado showRetroCedant esta en false (no se muestra)

    // ? else
    // ? Si formulario 1 tiene fronting y utiliza grosspremium como base:
    // ? entonces:
    // ?  1. - mostrar campos frontingFee y botón toggleFrontingFee con estado activado
    // ?  2. - copiar el valor de frontingFee que se colocó en el formulario 1
    // !  3. - mostrar los campos de retro cedant
    if (security.frontingFeeActive && security.isGross) {
      setIsShowToggleFrontingFee(true);
      setFrontingFeeEnabled(true);
      setIsShowRetroCedant(true);
    }

    // ? else
    // ? Si formulario 1 NO tiene frontingFee:
    // ? entonces:
    // ?  1. - mostrar campos frontingFee y botón toggleFrontingFee
    // !  2. - mostrar los campos de retro cedant
    else if (!security.frontingFeeActive) {
      setFrontingFeeEnabled(true);
      setIsShowRetroCedant(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DiscountsProvider>
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
              errorMessage={errorsSecurity.netPremiumAt100}
              isGross={isGross}
              index={index}
              validateForm={validateForm}
            />

            <SharePercent
              value={security.share}
              errorMessage={errorsSecurity.share}
              index={index}
              validateForm={validateForm}
            />

            <GrossPremiumPerShareAmount
              value={security.grossPremiumPerShare}
              errorMessage={errorsSecurity.premiumPerShareAmount}
              validateForm={validateForm}
              index={index}
              operationSecurity={operationSecurity}
            />


            {isGross && (
              <ReinsuranceBrokeragePercent
                value={security.reinsuranceBrokerage}
                errorMessage={errorsSecurity.reinsuranceBrokerage}
                index={index}
                validateForm={validateForm}
              />
            )}

            <DynamicComissionPercent
              value={security.dynamicCommission}
              errorMessage={errorsSecurity.dynamicCommission}
              index={index}
              validateForm={validateForm}
            />



          </Grid>
          {/* Col-2 */}
          <Grid item xs={12} sm={4}>

            <ReinsuranceCompany
              value={security.idCReinsuranceCompany?.id ? String(security.idCReinsuranceCompany?.id) : ''}
              errorMessage={errorsSecurity.idCReinsuranceCompany}
              index={index}
              validateForm={validateForm}
              avaliableReinsurers={avaliableReinsurers}
              companiesSelect={companiesSelect}
              security={security}
              setIsGross={setIsGross}
              setFrontingFeeEnabled={setFrontingFeeEnabled}
              setBinders={setBinders}
            />

            {/* // Todo - New Component */}
            <ShareAmount
              value={security.shareAmount}
              errorMessage={errorsSecurity.shareAmount}
              index={index}
              validateForm={validateForm}
            />

            <PremiumPerShareAmount
              value={security.premiumPerShareAmount}
              errorMessage={errorsSecurity.premiumPerShareAmount}
              index={index}
              validateForm={validateForm}
              operationSecurity={operationSecurity}
            />


            {isGross && (

              <ReinsuranceBrokerageAmount
                value={security.brokerAgeAmount}
                errorMessage={errorsSecurity.brokerAgeAmount}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
              />

            )}

            <DynamicComissionAmount
              value={security.dynamicCommissionAmount}
              errorMessage={errorsSecurity.dynamicCommissionAmount}
              index={index}
              validateForm={validateForm}
              operationSecurity={operationSecurity}
            />


          </Grid>
          {/* Col-3 */}
          <Grid item xs={12} sm={4}>


            <Binder
              value={''}
              binders={binders}
            />

            <Consecutive
              value={1}
            />

            <NetReinsurancePremium
              value={security.netReinsurancePremium}
              errorMessage={errorsSecurity.netReinsurancePremium}
            />


            {isShowRetroCedant ?
              <>
                <SelectRetroCedant
                  value={security.idCRetroCedant?.id ? String(security.idCRetroCedant.id) : ''}
                  errorMessage={errorsSecurity.idCRetroCedant}
                  index={index}
                  validateForm={validateForm}
                  retroCedants={retroCedants}
                  setIdRetroCedant={setIdRetroCedant}
                />
                <SelectRetroCedantContact
                  value={security.idCRetroCedantContact?.id ? String(security.idCRetroCedantContact?.id) : ''}
                  errorMessage={errorsSecurity.idCRetroCedantContact}
                  index={index}
                  validateForm={validateForm}
                  retroCedantContacts={retroCedantContacts}
                />
              </>
              : null}


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

        <Grid container spacing={5} sx={{

          ...(!isShowRetroCedant ? { mt: 8 } : null)
        }}>


          {isShowToggleTaxes ?
            <Grid item xs={12} sm={4}>
              <SwitchTaxes
                index={index}
                validateForm={validateForm}
                security={security}
                isChecked={isTaxesEnabled}
                setIsTaxesEnabled={setIsTaxesEnabled}
              />
              {isTaxesEnabled && (
                <>
                  <TaxesPercent
                    value={security.taxes}
                    errorMessage={errorsSecurity.taxes}
                    index={index}
                    validateForm={validateForm}
                  />

                  <TaxesAmount
                    value={security.taxesAmount}
                    errorMessage={errorsSecurity.taxesAmount}
                    index={index}
                    validateForm={validateForm}
                    operationSecurity={operationSecurity}
                  />
                </>

              )}
            </Grid>
            : null}

          {isShowToggleFrontingFee ?
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
                    errorMessage={errorsSecurity.frontingFee}
                    index={index}
                    validateForm={validateForm}
                  />

                  <FrontingFeeAmount
                    value={security.frontingFeeAmount}
                    errorMessage={errorsSecurity.frontingFeeAmount}
                    index={index}
                    validateForm={validateForm}
                    operationSecurity={operationSecurity}
                  />
                </>

              )}
            </Grid>
            : null}

          <ListDiscounts
            formIndex={index} operationSecurity={operationSecurity} validateForm={validateForm} />
        </Grid>

        <ButtonAddDiscount />

      </div>
    </DiscountsProvider>
  )
}
