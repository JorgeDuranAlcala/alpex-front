
import { SecurityProps } from '@/services/accounts/dtos/security.dto';
import { Title } from '@/styled-components/accounts/Security.styled';
import { CardHeader } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { AlertOnSave } from './components/modals/AlertOnSave';
import { NextModal } from './components/modals/NextModal';
import { LayoutSecurityContext } from './context/layoutSecurity/LayoutSecurityContext';

export const LayoutSecurity = ({ onStepChange }: SecurityProps) => {
  console.log(onStepChange);

  const { fontFamily, isNextStep } = useContext(LayoutSecurityContext);

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

  return (
    <div style={{ fontFamily }}>
      <CardHeader title={<Title>Security</Title>} />
      <AlertOnSave />


      <NextModal />
    </div>
  )
}
