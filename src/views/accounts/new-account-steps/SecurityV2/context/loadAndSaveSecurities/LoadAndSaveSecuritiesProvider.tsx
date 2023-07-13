import { ResponseGetAccount, useGetAccountById } from "@/hooks/accounts/forms";
import { useAddSecurityTotal, useUpdateSecurityTotalById } from "@/hooks/accounts/securityTotal";
import { FormInformation, SecurityDto } from "@/services/accounts/dtos/security.dto";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAlertBadgeSecurity } from "../../store/alertBadgeSecuritySlice";

import { useAddSecurities } from "@/hooks/accounts/security";
import { ReactNode, useEffect, useRef, useState } from "react";
import Icon from 'src/@core/components/icon';
import { useGetDatas } from "../../hooks/useGetDatas";
import { SecurityMapper } from "../../mappers/SecurityForm.mapper";
import type { Information, Security } from "../../store/securitySlice";
import { updateAllSecurities, updateAllSecuritiesAndAllFormData, updateInformation } from "../../store/securitySlice";
import { LoadAndSaveSecuritiesContext } from './LoadAndSaveSecuritiesContext';


export const LoadAndSaveSecuritiesProvider = ({ children }: { children: ReactNode }) => {

  const dispatch = useAppDispatch();
  const accountData = useAppSelector(state => state.accounts);
  const { allFormData, information, securities, } = useAppSelector(state => state.securitySlice);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // * + + + + + INIT ON GET DATAS + + + + +
  // * Obtiene la data de los catálogos
  // * de countries, retrocedants y reinsuranceCompanies
  useGetDatas();

  // * + + + + + END ON GET DATAS + + + + +

  const { account, setAccountId, getAccountById, accountId } = useGetAccountById()
  const { saveSecurityTotal } = useAddSecurityTotal()
  const { updateSecurityTotal } = useUpdateSecurityTotalById()
  const { saveSecurities } = useAddSecurities();

  const isLoadedInformation = useRef(false);
  const isLoadedSecurities = useRef(false);

  const saveData = async () => {
    // const isError = allErrors.find(error => error)



    // if (!isError) {
    const update: Partial<SecurityDto>[] = []
    const save: Partial<SecurityDto>[] = []

    for (const security of securities) {
      // * Con esta validación no se guardarán los datos de la vista 2
      // if (security.view === 2) return

      // Todo quitar el as any
      const mapper = SecurityMapper.securityToSecurityForm(security, accountData as any)

      // save.push({ ...mapper, view: 1 })
      save.push({ ...mapper })
    }

    if (!allFormData.id) {
      await saveSecurityTotal([
        {
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id,
          view: 1
        }
      ])
        .then(response => {
          console.log('saveSecurityTotal', { response })
        })
        .catch(e => {
          console.log('saveSecurityTotal', e)
        })
    } else {
      await updateSecurityTotal([
        {
          id: +allFormData.id,
          receivedNetPremium: +allFormData.recievedNetPremium,
          distributedNetPremium: +allFormData.distribuitedNetPremium,
          difference: +allFormData.diference,
          idAccount: +accountData.formsData.form1.id,
          view: 1
        }
      ])
        .then(response => {
          console.log('updateSecurityTotal', { response })
        })
        .catch(e => {
          console.log('updateSecurityTotal', e)
        })
    }

    if (save.length > 0) {
      await saveSecurities({ idAccount: +accountData.formsData.form1.id, securities: save })
        .then(async res => {
          console.log('saveSecurities', { res })
          const accountById: Partial<ResponseGetAccount> = await getAccountById(Number(accountId))
            .then(account => {
              if (account) {
                account.securities =
                  account.securities.length === 0
                    ? [{ frontingFeeActive: false, isGross: false } as SecurityDto]
                    : account.securities
              }

              return account
            })
            .catch((error: Error) => {
              console.log(error)

              return {}
            })

          const accountSecurities = accountById?.securities as SecurityDto[]

          if (accountSecurities && information) {


            if (accountById.securitiesTotal) {
              dispatch(updateAllSecuritiesAndAllFormData({
                securities: accountSecurities as Security[],
                allFormData: {
                  ...allFormData,
                  recievedNetPremium: Number(accountById.securitiesTotal[0].receivedNetPremium),
                  distribuitedNetPremium: Number(accountById.securitiesTotal[0].distributedNetPremium),
                  diference: Number(accountById.securitiesTotal[0].difference),
                  id: Number(accountById.securitiesTotal[0].id)
                }
              }))
            } else {
              dispatch(updateAllSecurities({ securities: accountSecurities as Security[] }))

            }
          }

          update.length === 0 &&
            dispatch(setAlertBadgeSecurity({
              message: 'THE INFORMATION HAS BEEN SAVED',
              theme: 'success',
              open: true,
              status: 'error'
            }));
        })
        .catch(e => {
          console.log('ERROR saveSecurities', e)
          dispatch(setAlertBadgeSecurity({
            message: 'Error saving data',
            theme: 'error',
            open: true,
            status: 'error',
            icon: <Icon style={{ color: '#FF4D49' }} icon='icon-park-outline:error' />
          }));
        })

      setTimeout(() => {
        dispatch(setAlertBadgeSecurity({
          message: '',
          theme: 'info',
          status: 'secondary',
          open: false
        }));
      }, 2000)
    }
  }

  useEffect(() => {
    isLoadedInformation.current = false
    isLoadedSecurities.current = false
  }, [])

  useEffect(() => {

    if (isLoadedInformation.current) return;

    if (accountData.formsData.form1.id) {
      console.log('LOAD INFORMATION ACCOUNT DATA')
      const idAccountCache = Number(localStorage.getItem('idAccount'))
      setAccountId(accountData.formsData.form1.id || idAccountCache)
      const data = accountData.formsData.form1.placementStructure as FormInformation

      // console.log('data', data)
      // debugger;
      dispatch(updateInformation(data as Information))
      isLoadedInformation.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.formsData?.form1?.id])

  useEffect(() => {

    if (isLoadedSecurities.current) return;

    if (account && information) {

      if (account.securitiesTotal.length > 0) {
        dispatch(updateAllSecuritiesAndAllFormData({
          securities: account.securities as Security[],
          allFormData: {
            ...allFormData,
            recievedNetPremium: Number(account.securitiesTotal[0].receivedNetPremium),
            distribuitedNetPremium: Number(account.securitiesTotal[0].distributedNetPremium),
            diference: Number(account.securitiesTotal[0].difference),
            id: Number(account.securitiesTotal[0].id)
          }
        }))
      } else {

        dispatch(updateAllSecurities({ securities: account.securities as Security[] }))
      }
      isLoadedSecurities.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, information])

  useEffect(() => {
    if (isLoadedSecurities.current && isLoadedInformation.current && securities.length > 0) {

      setIsDataLoaded(true);
    };

  }, [isLoadedSecurities, isLoadedInformation, securities]);

  return (
    <LoadAndSaveSecuritiesContext.Provider value={{ saveData, isDataLoaded }}>
      {children}
    </LoadAndSaveSecuritiesContext.Provider>
  )

}
