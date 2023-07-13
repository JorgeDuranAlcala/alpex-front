
import { SecurityProps } from '@/services/accounts/dtos/security.dto';
import { Title } from '@/styled-components/accounts/Security.styled';
import { Box, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { FormBottomButtons } from './components/form/FormBottomButtons';
import { FormListContainer } from './components/form/FormListContainer';
import { AlertOnSave } from './components/modals/AlertOnSave';
import { NextModal } from './components/modals/NextModal';
import { LayoutSecurityContext } from './context/layoutSecurity/LayoutSecurityContext';

export const LayoutSecurity = ({ onStepChange }: SecurityProps) => {

  const {
    fontFamily,
    isNextStep,
    handleBeforeNextStep,
    handleAddNewForm,
    handleSaveData,
    isDataLoaded,
  } = useContext(LayoutSecurityContext);




  // * + + + + + INIT ON STEP CHANGE + + + + +
  // * Después de guardar correctamente la data, se ejecuta el onStepChange
  // const memoizedOnStepChange = useCallback(
  //   () => {
  //     onStepChange(3);
  //   },
  //   [onStepChange],
  // )
  // useEffect(() => {

  //   if (isNextStep) {
  //     memoizedOnStepChange();
  //   }

  // }, [isNextStep, memoizedOnStepChange])

  useEffect(() => {

    if (isNextStep) {
      onStepChange(3);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextStep])

  // * + + + + + END ON STEP CHANGE + + + + +

  return (
    <div style={{ fontFamily }}>
      <CardHeader title={<Title>Security</Title>} />
      <AlertOnSave />
      <NextModal />

      {isDataLoaded ? (
        <CardContent sx={{ position: 'relative' }}>

          <FormListContainer />

          <FormBottomButtons
            onClickAddReinsurer={handleAddNewForm}
            onClickSave={handleSaveData}
            onClickNextStep={handleBeforeNextStep}
          />
        </CardContent>

      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 24 }}>

          <CircularProgress size={50} />
        </Box>
      )}


    </div>
  )
}
