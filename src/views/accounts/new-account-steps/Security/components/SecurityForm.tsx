import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'

import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Grid, Icon } from '@mui/material'

import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { SecurityContext } from '../SecurityView'
import { useDataFirstTime } from '../hooks/useDataFirstTime'
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

  // selectRetroCedantContact_validations,
  selectRetroCedant_validations,
  shareAmount_validations,
  sharePercent_validations,
  taxesAmount_validations,
  taxesPercent_validations
} from './inputs'
import { SwitchFrontingFee } from './inputs/SwitchFrontingFee'
import { SwitchTaxes } from './inputs/SwitchTaxes'
import { ModalActivateSecondView } from './secondView/ModalActivateSecondView'
import { SecondViewProvider } from './secondView/SecondViewProvider'
import { SwitchSecondView } from './secondView/SwitchSecondView'

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
  const [isShowToggleFrontingFee, setIsShowToggleFrontingFee] = useState(false)
  const [isTaxesEnabled, setIsTaxesEnabled] = useState(false)
  const [isShowToggleTaxes, setIsShowToggleTaxes] = useState(false)
  const [isShowRetroCedant, setIsShowRetroCedant] = useState(false)
  const [binders, setBinders] = useState<ReinsuranceCompanyBinderDto[]>([])

  const [avaliableReinsurers, setAvaliableReinsurers] = useState<ReinsuranceCompanyDto[]>([])

  const { allErrors, setAllErrors, information, companiesSelect, securities, calculateSecurities } =
    useContext(SecurityContext)

  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { retroCedants } = useGetAllRetroCedants()
  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()
  const { countries } = useGetAllCountries()

  const operationSecurity: CalculateSecurity = new CalculateSecurity().setInformation(information).setSecurity(security)

  const schemaRetrocedant = yup.object().shape({
    ...selectRetroCedant_validations({ frontingFeeEnabled, isGross }).fields,

    // ...selectRetroCedantContact_validations({ frontingFeeEnabled }).fields,
    ...frontingFeePercent_validations({ frontingFeeEnabled }).fields,
    ...frontingFeeAmount_validations({ frontingFeeEnabled }).fields
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
    ...taxesAmount_validations({ isGross, isTaxesEnabled }).fields,
    ...taxesPercent_validations({ isGross, isTaxesEnabled }).fields,
    ...netReinsurancePremium_validations().fields
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
        setErrorsSecurity(data)
        console.log({ error: data, index })

        //setEnableNextStep(false)
      })
      .finally(() => {
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
    if (security?.id && security?.idCRetroCedant) {
      setIdRetroCedant(security.idCRetroCedant?.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security])

  useEffect(() => {
    validateForm(security)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGross, frontingFeeEnabled])

  useEffect(() => {
    const informationForm1 = information as any
    const tempSecurities = [...securities]

    //validacion taxes

    if (informationForm1.taxes === 0 || isGross) {
      setIsShowToggleTaxes(true)
      setIsTaxesEnabled(informationForm1.taxes > 0)

      tempSecurities[index] = {
        ...tempSecurities[index],
        taxes: informationForm1.taxes === 0 ? 0 : informationForm1.taxesP,
        taxesAmount: 0
      }
    } else {
      setIsShowToggleTaxes(false)
      setIsTaxesEnabled(false)

      tempSecurities[index] = {
        ...tempSecurities[index],
        taxes: 0,
        taxesAmount: 0
      }
    }

    if (informationForm1.frontingFee === 0 || isGross) {
      setIsShowToggleFrontingFee(true)
      setFrontingFeeEnabled(informationForm1.frontingFee > 0)
      setIsShowRetroCedant(true)

      tempSecurities[index] = {
        ...tempSecurities[index],
        frontingFee: informationForm1.frontingFee === 0 ? 0 : informationForm1.frontingFeeP,
        frontingFeeAmount: 0
      }
    } else {
      setIsShowToggleFrontingFee(false)
      setFrontingFeeEnabled(false)
      setIsShowRetroCedant(false)

      tempSecurities[index] = {
        ...tempSecurities[index],
        frontingFee: 0,
        frontingFeeAmount: 0
      }
    }
    validateForm(tempSecurities[index])
    calculateSecurities(tempSecurities)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGross, security.idCReinsuranceCompany?.id])
  useEffect(() => {
    const tempSecurities = [...securities]

    if (!frontingFeeEnabled) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        frontingFee: 0,
        frontingFeeAmount: 0
      }
      validateForm(tempSecurities[index])
      calculateSecurities(tempSecurities)
    }
    if (!isTaxesEnabled) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        taxes: 0,
        taxesAmount: 0
      }
      validateForm(tempSecurities[index])
      calculateSecurities(tempSecurities)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontingFeeEnabled, isTaxesEnabled])

  /**
   * * Las validaciones actuales resetean los porcentages de taxes y frontingFee
   * * aún cuando ya hay valores desde bdd.
   * * Para no reestructuras las validaciones actuales,
   * * se crea este hook que comprueba si existen valores desde bdd
   * * si es así, los setea en el formulario después de las validaciones actuales.
   */
  const { forTaxes, forFrontingFee, checkValues } = useDataFirstTime({ formIndex: index, operationSecurity })

  useEffect(() => {
    checkValues({
      taxes: securities[index].taxes,
      frontingFee: securities[index].taxes
    })
    if (securities[index].taxes > 0) {
      setIsTaxesEnabled(true)
    }
    if (securities[index].frontingFee > 0) {
      setFrontingFeeEnabled(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securities[index].taxes, securities[index].frontingFee])

  return (
    <SecondViewProvider>
      <DiscountsProvider>
        <div style={{ position: 'relative' }}>
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
                operationSecurity={operationSecurity}
              />

              <SharePercent
                value={security.share}
                errorMessage={errorsSecurity.share}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
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
                value={security.idCReinsuranceCompanyBinder ? String(security.idCReinsuranceCompanyBinder?.id) : ''}
                binders={binders}
                index={index}
              />

              <Consecutive value={0} />

              <NetReinsurancePremium
                value={security.netReinsurancePremium}
                errorMessage={errorsSecurity.netReinsurancePremium}
              />

              {isShowRetroCedant ? (
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
              ) : null}

              {frontingFeeEnabled && security.idCRetroCedantContact?.id && (
                <>
                  <ContactEmail value={security.idCRetroCedantContact?.email} />

                  <ContactPhone value={security.idCRetroCedantContact?.phone} />

                  <ContactCountry
                    value={
                      security.idCRetroCedantContact.__idCCountry__
                        ? security.idCRetroCedantContact?.__idCCountry__.id
                        : security.idCRetroCedantContact.idCCountry ?? ''
                    }
                    countries={countries}
                  />
                </>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={5}
            sx={{
              ...(!isShowRetroCedant ? { mt: 8 } : null)
            }}
          >
            {isShowToggleTaxes ? (
              <Grid item xs={12} sm={4}>
                <SwitchTaxes
                  index={index}
                  validateForm={validateForm}
                  security={security}
                  isChecked={isTaxesEnabled}
                  setIsTaxesEnabled={setIsTaxesEnabled}
                  fieldRef={forTaxes}
                />

                <TaxesPercent
                  value={security.taxes}
                  errorMessage={errorsSecurity.taxes}
                  index={index}
                  validateForm={validateForm}
                  operationSecurity={operationSecurity}
                  isDisabled={!isTaxesEnabled}
                  fieldRef={forTaxes}
                />

                <TaxesAmount
                  value={security.taxesAmount}
                  errorMessage={errorsSecurity.taxesAmount}
                  index={index}
                  validateForm={validateForm}
                  operationSecurity={operationSecurity}
                  isDisabled={!isTaxesEnabled}
                  fieldRef={forTaxes}
                />
              </Grid>
            ) : null}

            {isShowToggleFrontingFee ? (
              <Grid item xs={12} sm={4}>
                <SwitchFrontingFee
                  index={index}
                  validateForm={validateForm}
                  security={security}
                  isChecked={frontingFeeEnabled}
                  setFrontingFeeEnabled={setFrontingFeeEnabled}
                  fieldRef={forFrontingFee}
                />

                <FrontingFeePercent
                  value={security.frontingFee}
                  errorMessage={errorsSecurity.frontingFee}
                  index={index}
                  validateForm={validateForm}
                  operationSecurity={operationSecurity}
                  isDisabled={!frontingFeeEnabled}
                  fieldRef={forFrontingFee}
                />

                <FrontingFeeAmount
                  value={security.frontingFeeAmount}
                  errorMessage={errorsSecurity.frontingFeeAmount}
                  index={index}
                  validateForm={validateForm}
                  operationSecurity={operationSecurity}
                  isDisabled={!frontingFeeEnabled}
                  fieldRef={forFrontingFee}
                />
              </Grid>
            ) : null}

            <ListDiscounts formIndex={index} operationSecurity={operationSecurity} validateForm={validateForm} />
          </Grid>

          <ButtonAddDiscount />

          <ModalActivateSecondView
            formIndex={index}
            securities={securities}
            calculateSecurities={calculateSecurities}
          />


          <SwitchSecondView
            formIndex={index}
            securities={securities}
            calculateSecurities={calculateSecurities}
          />

        </div>
      </DiscountsProvider>
    </SecondViewProvider>
  )
}
