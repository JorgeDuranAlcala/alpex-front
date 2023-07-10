
import { SecurityProps } from '@/services/accounts/dtos/security.dto';
import { Title } from '@/styled-components/accounts/Security.styled';
import { CardContent, CardHeader } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { FormBottomButtons } from './components/form/FormBottomButtons';
import { FormListContainer } from './components/form/FormListContainer';
import { AlertOnSave } from './components/modals/AlertOnSave';
import { NextModal } from './components/modals/NextModal';
import { LayoutSecurityContext } from './context/layoutSecurity/LayoutSecurityContext';
import { useGetDatas } from './hooks/useGetDatas';

export const LayoutSecurity = ({ onStepChange }: SecurityProps) => {
  console.log(onStepChange);

  const {
    fontFamily,
    isNextStep,
    handleBeforeNextStep,
    handleAddNewForm,
    handleSaveData
  } = useContext(LayoutSecurityContext);

  // * + + + + + INIT ON GET DATAS + + + + +
  // * Obtiene la data de los catálogos
  // * de countries, retrocedants y reinsuranceCompanies  
  useGetDatas();

  // * + + + + + END ON GET DATAS + + + + +


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

        <FormListContainer />

        <FormBottomButtons
          onClickAddReinsurer={handleAddNewForm}
          onClickSave={handleSaveData}
          onClickNextStep={handleBeforeNextStep}
        />
      </CardContent>


    </div>
  )
}
