
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto';
import { useAppDispatch } from '@/store';
import { stepForms_updateStep, stepForms_updateSublimitsSublimits } from '@/store/apps/accounts/stepFormsSlice';

import { useEffect, useRef } from 'react';


interface UseStepUpdateSublimitsProps {
  idAccount: number | null;
  sublimits: SublimitDto[];

}

const useFormStep_updateSublimits = ({ idAccount, sublimits }: UseStepUpdateSublimitsProps) => {

  const dispatch = useAppDispatch()

  const sublimitsRef = useRef<SublimitDto[]>([]);
  const isStepUpdatedRef = useRef<boolean>(false);
  const canUpdateSublimitsDataRef = useRef<boolean>(false);

  const handleCanUpdateSublimitsData = () => {
    canUpdateSublimitsDataRef.current = true;
  }




  // * Actualizar el step del account actual en Redux
  useEffect(() => {
    if (!idAccount) return;
    if (isStepUpdatedRef.current) return;

    dispatch(stepForms_updateStep({ id: idAccount, data: 3 }))

    isStepUpdatedRef.current = true;

  }, [dispatch, idAccount])

  // * Actualiza la información de sublimits del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(sublimitsRef.current) !== JSON.stringify(sublimits)) {
      if (sublimitsRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdateSublimitsDataRef.current) {
          //canUpdateSublimitsDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateSublimitsSublimits({
          id: idAccount,
          data: sublimits,
        }));
      }
    }

    return () => {
      sublimitsRef.current = sublimits;
    };
  }, [dispatch, idAccount, sublimits]);


  return {
    handleCanUpdateSublimitsData,
  }
};

export default useFormStep_updateSublimits;
