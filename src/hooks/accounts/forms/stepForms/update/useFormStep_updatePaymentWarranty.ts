import { InstallmentDto } from '@/services/accounts/dtos/installments.dto';
import { useAppDispatch, useAppSelector } from '@/store';
import { stepForms_updatePaymentWarrantyInstallments, stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice';

import { useEffect, useRef } from 'react';


interface UseStepUpdatePaymentWarrantyProps {
  idAccount: number | null;
  installments: InstallmentDto[];

}

const useFormStep_updatePaymentWarranty = ({ idAccount, installments }: UseStepUpdatePaymentWarrantyProps) => {

  const dispatch = useAppDispatch();
  const { tabButtons } = useAppSelector(state => state.multiTabButtonsSlice);

  const installmentRef = useRef<InstallmentDto[]>([]);
  const isStepUpdatedRef = useRef<boolean>(false);
  const canUpdateInstallmentsDataRef = useRef<boolean>(false);

  const handleCanUpdateInstallmentsData = () => {
    canUpdateInstallmentsDataRef.current = true;
  }




  // * Actualizar el step del account actual en Redux
  useEffect(() => {
    if (!idAccount) return;
    if (isStepUpdatedRef.current) return;

    const activeTab = tabButtons.find(tab => tab.isActive);
    if (!activeTab) return;

    if (Number(activeTab.text) !== idAccount) return;

    dispatch(stepForms_updateStep({ id: idAccount, data: 3 }))

    isStepUpdatedRef.current = true;


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idAccount])

  // * Actualiza la información de installments del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(installmentRef.current) !== JSON.stringify(installments)) {
      if (installmentRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdateInstallmentsDataRef.current) {
          //canUpdateInstallmentsDataRef.current = true;

          return;
        };

        dispatch(stepForms_updatePaymentWarrantyInstallments({
          id: idAccount,
          data: installments,
        }));
      }
    }

    return () => {
      installmentRef.current = installments;
    };
  }, [dispatch, idAccount, installments]);


  return {
    handleCanUpdateInstallmentsData,
  }
};

export default useFormStep_updatePaymentWarranty;
