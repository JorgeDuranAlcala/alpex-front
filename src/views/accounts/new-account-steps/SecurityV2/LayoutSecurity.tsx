
import { SecurityProps } from '@/services/accounts/dtos/security.dto';
import { Title } from '@/styled-components/accounts/Security.styled';
import { CardContent, CardHeader } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { FormBottomButtons } from './components/form/FormBottonButtons';
import { AlertOnSave } from './components/modals/AlertOnSave';
import { NextModal } from './components/modals/NextModal';
import { LayoutSecurityContext } from './context/layoutSecurity/LayoutSecurityContext';

export const LayoutSecurity = ({ onStepChange }: SecurityProps) => {
  console.log(onStepChange);

  const {
    fontFamily,
    isNextStep,
    handleBeforeNextStep,
    handleAddNewForm,
    handleSaveData
  } = useContext(LayoutSecurityContext);


  // * + + + + + INIT ON STEP CHANGE + + + + +
  // * Después de guardar correctamente la data, se ejecuta el onStepChange
  const memoizedOnStepChange = useCallback(
    () => {
      onStepChange(3);
    },
    [onStepChange],
  )
  useEffect(() => {

    if (isNextStep) {
      memoizedOnStepChange();
    }

  }, [isNextStep, memoizedOnStepChange])

  // * + + + + + END ON STEP CHANGE + + + + +

  return (
    <div style={{ fontFamily }}>
      <CardHeader title={<Title>Security</Title>} />
      <AlertOnSave />
      <NextModal />

      <CardContent sx={{ position: 'relative' }}>


        <FormBottomButtons
          onClickAddReinsurer={handleAddNewForm}
          onClickSave={handleSaveData}
          onClickNextStep={handleBeforeNextStep}
        />
      </CardContent>


    </div>
  )
}
