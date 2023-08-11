/* eslint-disable react-hooks/exhaustive-deps */
import { useGetAllCountries } from '@/hooks/catalogs/country'
import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany'
import { useGetAllRetroCedants } from '@/hooks/catalogs/retroCedant'
import { useGetAllByIdRetroCedant } from '@/hooks/catalogs/retroCedantContact'

import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'

import { FormSectionProps, SecurityDto, errorsSecurity } from '@/services/accounts/dtos/security.dto'
import DialogCustomAlpex from '@/views/components/dialogs/DialogCustomAlpex'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Grid, Icon } from '@mui/material'
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
import { ModalUndoSecondView } from './secondView/ModalUndoSecondView'
import { SecondViewContext } from './secondView/SecondViewContext'
import { SwitchSecondView } from './secondView/SwitchSecondView'
import { UndoSecondView } from './secondView/UndoSecondView'

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

//este estate se utilizara cuando se necesite actualizar el estado hasta que este completo
let localSecuritiesTemp: SecurityDto[] = []
export const FormSection = ({ index, security, onDeleteItemList }: FormSectionProps) => {
  const [isGross, setIsGross] = useState<boolean>(security.isGross)
  const [errorsSecurity, setErrorsSecurity] = useState<errorsSecurity>(initialErrorValues)
  const [isShowToggleFrontingFee, setIsShowToggleFrontingFee] = useState(security.frontingFeeActive || false)
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState<boolean>(security.frontingFeeActive || false)
  const [isTaxesEnabled, setIsTaxesEnabled] = useState<boolean>(security.taxesActive || false)
  const [, setIsShowToggleTaxes] = useState<boolean>(security.taxesActive || false)
  const [isShowRetroCedant, setIsShowRetroCedant] = useState<boolean>(true)

  const [openDialog, setOpenDialog] = useState(false)

  //CUSTOM HOOK
  const [avaliableReinsurers, setAvaliableReinsurers] = useState<ReinsuranceCompanyDto[]>([])
  const { reinsuranceCompany } = useGetAllReinsuranceCompanies()
  const { retroCedants } = useGetAllRetroCedants()
  const { retroCedantContacts, setIdRetroCedant } = useGetAllByIdRetroCedant()
  const { countries } = useGetAllCountries()

  //** Context
  const { allErrors, setAllErrors, information, companiesSelect, securities, calculateSecurities, setCurrentView } =
    useContext(SecurityContext)

  const { activeView, createSecondView } = useContext(SecondViewContext)

  const operationSecurity: CalculateSecurity = new CalculateSecurity().setInformation(information).setSecurity(security)

  const validateForm = (securityParam: SecurityDto) => {
    let data = { ...initialErrorValues }
    const schemaRetrocedant = yup.object().shape({
      ...selectRetroCedant_validations({
        frontingFeeEnabled: securityParam.frontingFeeActive,
        isGross: securityParam.isGross
      }).fields,
      ...frontingFeePercent_validations({ frontingFeeEnabled: securityParam.frontingFeeActive }).fields,
      ...frontingFeeAmount_validations({ frontingFeeEnabled: securityParam.frontingFeeActive }).fields
    })

    const schema = yup.object().shape({
      ...grossOrNetPremiumAt100_validations().fields,
      ...sharePercent_validations().fields,
      ...shareAmount_validations().fields,
      ...premiumPerShareAmount_validations().fields,
      ...reinsuranceBrokeragePercent_validations({ isGross: securityParam.isGross }).fields,
      ...reinsuranceBrokerageAmount_validations({ isGross: securityParam.isGross }).fields,
      ...dynamicComissionPercent_validations().fields,
      ...dynamicComissionAmount_validations().fields,
      ...taxesAmount_validations({ isGross: securityParam.isGross, isTaxesEnabled: securityParam?.taxesActive }).fields,
      ...taxesPercent_validations({ isGross: securityParam.isGross, isTaxesEnabled: securityParam?.taxesActive })
        .fields,
      ...netReinsurancePremium_validations().fields
    })

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
        console.log({ data, index })
        errorsTemp[index] = true
        setErrorsSecurity(data)
      })
      .finally(() => {
        setAllErrors(() => [...errorsTemp])
      })
  }
  const isShowFrontingFeeAndTaxes = (idCompany = 0) => {
    const informationForm1 = information as any
    const tempSecurities = [...securities]

    if (information)
      if (isGross) {
        setIsShowToggleTaxes(true)
        setIsShowToggleFrontingFee(true)
        setIsTaxesEnabled(security.taxes > 0)
        setFrontingFeeEnabled(security.frontingFee > 0)
        if (security.taxes === 0 && informationForm1.taxesP > 0 && !security?.id) {
          setIsTaxesEnabled(true)
          tempSecurities[index] = {
            ...tempSecurities[index],
            taxes: informationForm1.taxesP,
            taxesAmount: 0
          }
        }
        if (security.frontingFee === 0 && informationForm1.frontingFeeP > 0 && !security?.id) {
          setIsShowRetroCedant(true)
          setFrontingFeeEnabled(true)
          tempSecurities[index] = {
            ...tempSecurities[index],
            frontingFee: informationForm1.frontingFeeP,
            frontingFeeAmount: 0
          }
        }
      } else {
        setIsShowToggleTaxes(informationForm1.taxesP || security.taxes > 0)
        setIsShowToggleFrontingFee(security.frontingFee > 0)
        setIsTaxesEnabled((informationForm1.taxesP && idCompany !== 0) || security.taxes > 0)
        setFrontingFeeEnabled(security.frontingFee > 0)

        // if (security.taxes === 0 && informationForm1.taxesP === 0) {
        setIsShowToggleTaxes(true)
        if (!security.id) {
          tempSecurities[index] = {
            ...tempSecurities[index],
            taxes: informationForm1.taxesP ?? 0,
            taxesAmount: 0
          }
        }

        // }
        if (security.frontingFee === 0 && informationForm1.frontingFeeP === 0) {
          setIsShowToggleFrontingFee(true)
          if (!security.id) {
            tempSecurities[index] = {
              ...tempSecurities[index],
              frontingFee: 0,
              frontingFeeAmount: 0
            }
          }
        }
      }

    localSecuritiesTemp.push(tempSecurities[index])

    // todo: regresar esta validacion si hay error al mostrar el fronting fee y taxes
    //
    if (localSecuritiesTemp.length === tempSecurities.length || idCompany !== 0) {
      calculateSecurities(tempSecurities)

      localSecuritiesTemp = []
    }
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
    securities[index].idCReinsuranceCompany?.id &&
      isShowFrontingFeeAndTaxes(securities[index].idCReinsuranceCompany?.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGross, securities[index].idCReinsuranceCompany?.id])

  useEffect(() => {
    isShowFrontingFeeAndTaxes()
    const tempSecurities = [...securities]

    const isDifferent = isGross
      ? information.grossPremium !== tempSecurities[index].netPremiumAt100
      : information.netPremium !== tempSecurities[index].netPremiumAt100

    // index === tempSecurities.length - 1 &&
    if (information && activeView === 0 && isDifferent && securities[index].idCReinsuranceCompany?.id) {
      createSecondView({
        securities: tempSecurities,
        calculateSecurities,
        information
      })
    }
  }, [])

  useEffect(() => {
    setCurrentView(activeView)
  }, [activeView])

  useEffect(() => {
    if (security.idCReinsuranceCompany?.id) setIsGross(() => security.idCReinsuranceCompany.special)
  }, [security.idCReinsuranceCompany])

  useEffect(() => {
    validateForm(security)
  }, [security])

  /*
  !NOTE: en los componentes de porcentajes no es necesario calcular los otros valores ya que todos los calculos se hacen en el calculate securities a exception de las modificaciones de montos */
  return (
    <DiscountsProvider>
      <ModalActivateSecondView
        information={information}
        securities={securities}
        calculateSecurities={calculateSecurities}
      />

      <ModalUndoSecondView
        information={information}
        securities={securities}
        calculateSecurities={calculateSecurities}
      />

      <div style={{ position: 'relative' }}>
        {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
        <Grid container item xs={12} sm={12}>
          <Grid item xs={12} sm={12}>
            {index === 0 && activeView > 0 && activeView < 3 ? (
              <>
                {activeView === 2 && (
                  <UndoSecondView securities={securities} calculateSecurities={calculateSecurities} />
                )}
                <SwitchSecondView
                  information={information}
                  view={activeView}
                  securities={securities}
                  calculateSecurities={calculateSecurities}
                />
              </>
            ) : null}
            {/* eliminacion de securities */}
            {index > 0 && activeView !== 2 && (
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
                  onClick={() => setOpenDialog(true)}
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
              view={security.view}
            />

            <SharePercent
              value={security.share}
              errorMessage={errorsSecurity.share}
              index={index}
              validateForm={validateForm}
              view={security.view}
            />

            <GrossPremiumPerShareAmount
              value={security.grossPremiumPerShare}
              errorMessage={errorsSecurity.premiumPerShareAmount}
              validateForm={validateForm}
              index={index}
              operationSecurity={operationSecurity}
              view={security.view}
            />

            {isGross && (
              <ReinsuranceBrokeragePercent
                value={security.reinsuranceBrokerage}
                errorMessage={errorsSecurity.reinsuranceBrokerage}
                index={index}
                validateForm={validateForm}
                view={security.view}
              />
            )}

            <DynamicComissionPercent
              value={security.dynamicCommission}
              errorMessage={errorsSecurity.dynamicCommission}
              index={index}
              validateForm={validateForm}
              view={security.view}
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
              view={security.view}
            />

            <ShareAmount
              value={security.shareAmount}
              errorMessage={errorsSecurity.shareAmount}
              index={index}
              validateForm={validateForm}
              view={security.view}
            />

            <PremiumPerShareAmount
              value={security.premiumPerShareAmount}
              errorMessage={errorsSecurity.premiumPerShareAmount}
              index={index}
              validateForm={validateForm}
              view={security.view}
            />

            {isGross && (
              <ReinsuranceBrokerageAmount
                value={security.brokerAgeAmount}
                errorMessage={errorsSecurity.brokerAgeAmount}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
                view={security.view}
              />
            )}

            <DynamicComissionAmount
              value={security.dynamicCommissionAmount}
              errorMessage={errorsSecurity.dynamicCommissionAmount}
              index={index}
              validateForm={validateForm}
              operationSecurity={operationSecurity}
              view={security.view}
            />
          </Grid>
          {/* Col-3 */}
          <Grid item xs={12} sm={4}>
            <Binder
              value={security.idCReinsuranceCompanyBinder ? String(security.idCReinsuranceCompanyBinder?.id) : ''}
              index={index}
              view={security.view}
              companyId={security.idCReinsuranceCompany?.id ? String(security.idCReinsuranceCompany?.id) : ''}
            />

            <Consecutive value={security.consecutive ? security.consecutive : ''} view={security.view} />

            <NetReinsurancePremium
              value={security.netReinsurancePremium}
              errorMessage={errorsSecurity.netReinsurancePremium}
              view={security.view}
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
                  view={security.view}
                />
                <SelectRetroCedantContact
                  value={security.idCRetroCedantContact?.id ? String(security.idCRetroCedantContact?.id) : ''}
                  errorMessage={errorsSecurity.idCRetroCedantContact}
                  index={index}
                  validateForm={validateForm}
                  retroCedantContacts={retroCedantContacts}
                  view={security.view}
                />
              </>
            ) : null}

            {security.idCRetroCedantContact && security.idCRetroCedantContact.id && (
              <>
                <ContactEmail value={security.idCRetroCedantContact?.email} view={security.view} />

                <ContactPhone value={security.idCRetroCedantContact?.phone} view={security.view} />

                <ContactCountry
                  value={
                    security.idCRetroCedantContact.__idCCountry__
                      ? security.idCRetroCedantContact?.__idCCountry__.id
                      : security.idCRetroCedantContact.idCCountry ?? ''
                  }
                  countries={countries}
                  view={security.view}
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
          {/* {isShowToggleTaxes ? ( */}
          <Grid item xs={12} sm={4}>
            <SwitchTaxes
              index={index}
              validateForm={validateForm}
              security={security}
              isChecked={isTaxesEnabled}
              setIsTaxesEnabled={setIsTaxesEnabled}
              view={security.view}
            />

            <TaxesPercent
              value={security.taxes}
              errorMessage={errorsSecurity.taxes}
              index={index}
              validateForm={validateForm}
              isDisabled={!isTaxesEnabled}
              view={security.view}
            />

            <TaxesAmount
              value={security.taxesAmount}
              errorMessage={errorsSecurity.taxesAmount}
              index={index}
              validateForm={validateForm}
              operationSecurity={operationSecurity}
              isDisabled={!isTaxesEnabled}
              view={security.view}
            />
          </Grid>
          {/* ) : null} */}

          {isShowToggleFrontingFee ? (
            <Grid item xs={12} sm={4}>
              <SwitchFrontingFee
                index={index}
                validateForm={validateForm}
                isChecked={frontingFeeEnabled}
                setFrontingFeeEnabled={setFrontingFeeEnabled}
                view={security.view}
              />

              <FrontingFeePercent
                value={security.frontingFee}
                errorMessage={errorsSecurity.frontingFee}
                index={index}
                validateForm={validateForm}
                isDisabled={!frontingFeeEnabled}
                view={security.view}
              />

              <FrontingFeeAmount
                value={security.frontingFeeAmount}
                errorMessage={errorsSecurity.frontingFeeAmount}
                index={index}
                validateForm={validateForm}
                operationSecurity={operationSecurity}
                isDisabled={!frontingFeeEnabled}
                view={security.view}
              />
            </Grid>
          ) : null}

          <ListDiscounts
            view={security.view}
            discounts={security.discounts}
            formIndex={index}
            operationSecurity={operationSecurity}
            validateForm={validateForm}
          />
        </Grid>

        <ButtonAddDiscount view={security.view} formIndex={index} />
      </div>
      <DialogCustomAlpex
        openDialog={openDialog}
        body={`This action will not delete the Reinsurer from Catalogs, only for this section.`}
        title={'Remove Reinsurer from this account'}
        resolve={() => onDeleteItemList(index)}
        reject={() => setOpenDialog(false)}
      />
    </DiscountsProvider>
  )
}
