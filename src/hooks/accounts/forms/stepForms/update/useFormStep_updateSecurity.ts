import type { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { useAppDispatch, useAppSelector } from '@/store';
import { stepForms_updateSecuritySecondViewSecurities, stepForms_updateSecuritySecurities, stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice';

import { useEffect, useRef } from 'react';


interface UseStepUpdateSecurityProps {
  idAccount: number | null;
  securities: SecurityDto[];
  secondViewSecurities: SecurityDto[];

}

const useFormStep_updateSecurity = ({ idAccount, securities, secondViewSecurities }: UseStepUpdateSecurityProps) => {

  const dispatch = useAppDispatch();
  const { tabButtons } = useAppSelector(state => state.multiTabButtonsSlice);

  const securitiesRef = useRef<SecurityDto[]>([]);
  const secondViewSecuritiesRef = useRef<SecurityDto[]>([]);
  const isStepUpdatedRef = useRef<boolean>(false);
  const canUpdateSecuritiesDataRef = useRef<boolean>(false);

  const handleCanUpdateSecuritiesData = () => {
    canUpdateSecuritiesDataRef.current = true;
  }




  // * Actualizar el step del account actual en Redux
  useEffect(() => {
    if (!idAccount) return;
    if (isStepUpdatedRef.current) return;

    const activeTab = tabButtons.find(tab => tab.isActive);
    if (!activeTab) return;

    if (Number(activeTab.text) !== idAccount) return;

    // console.log('update step', idAccount, 'activeTabId', activeTab.text)

    dispatch(stepForms_updateStep({ id: idAccount, data: 2 }))

    isStepUpdatedRef.current = true;


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idAccount])

  // * Actualiza la información de securities del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(securitiesRef.current) !== JSON.stringify(securities)) {
      if (securitiesRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdateSecuritiesDataRef.current) {
          //canUpdateBasicInfoDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateSecuritySecurities({
          id: idAccount,
          data: securities,
        }));
      }
    }

    return () => {
      securitiesRef.current = securities;
    };
  }, [dispatch, idAccount, securities]);

  // * Actualiza la información de securities de la segunda vista
  // * del account actual en Redux
  // * cada vez que se actualiza la segunda vista
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(secondViewSecuritiesRef.current) !== JSON.stringify(secondViewSecurities)) {
      if (securitiesRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdateSecuritiesDataRef.current) {
          //canUpdateSecuritiesDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateSecuritySecondViewSecurities({
          id: idAccount,
          data: secondViewSecurities,
        }));
      }
    }

    return () => {
      secondViewSecuritiesRef.current = secondViewSecurities;
    };
  }, [dispatch, idAccount, secondViewSecurities]);



  return {
    handleCanUpdateSecuritiesData,
  }
};

export default useFormStep_updateSecurity;
