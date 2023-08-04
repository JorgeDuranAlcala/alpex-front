import { Box, CircularProgress } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";

import useFormStep_recuperateStep from "@/hooks/accounts/forms/stepForms/recuperate/useFormStep_recuperateStep";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateFormId, updateFormsData } from "@/store/apps/accounts";



interface ChangeStepFormProps {
  accountId: number | string | null;
  changeAccountId: Dispatch<SetStateAction<number | null>>
  step: number;
  children: ReactNode;
  changeStep: (step: number) => void;
}

const ChangeStepForm = ({ accountId, step, changeStep, changeAccountId, children }: ChangeStepFormProps) => {

  const dispatch = useAppDispatch();

  const { tabButtons } = useAppSelector(state => state.multiTabButtonsSlice);

  const { getLastStep } = useFormStep_recuperateStep();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const isHandledAccountIdFromQuery = useRef<boolean>(false);

  // console.log(setActiveStep, changeStep)

  // const isEffectedSameSteps = useRef<boolean>(false);

  // console.log('ChangeStepForm render with: ', {
  //   step,
  //   activeStep,
  //   accountId,
  // })

  useEffect(() => {

    if (!accountId) return;

    const activeTab = tabButtons.find(tab => tab.isActive);
    if (activeTab) {

      if (activeTab.text.toString().toLocaleLowerCase().includes('new')) {
        handleNewAccount();

        return;

      }

      const idTab = Number(activeTab.text);

      if (idTab > 0 && idTab !== accountId) {

        handleSetAccountId(idTab);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabButtons, accountId])

  useEffect(() => {
    const { lastStep, idAccountFromQuery } = getLastStep(
      accountId ? Number(accountId) : null
    );


    if (!accountId && idAccountFromQuery) {

      if (isHandledAccountIdFromQuery.current) return;

      isHandledAccountIdFromQuery.current = true;


      handleSetAccountId(idAccountFromQuery)

      return;
    }

    // debugger;

    if (lastStep) {
      if (lastStep !== step) {

        // debugger;

        changeStep(lastStep);
      } else {
        setActiveStep(step);
      }
    } else {
      setActiveStep(step);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);


  const handleNewAccount = () => {

    localStorage.removeItem('idAccount')

    dispatch(updateFormsData({ form1: { id: null } }));
    const { lastStep, } = getLastStep(null, true)

    if (lastStep) {
      if (lastStep !== step) {

        changeStep(lastStep);
      } else {
        setActiveStep(step);
      }
    } else {
      setActiveStep(step);
    }
  }

  const handleSetAccountId = (idAccount: number) => {

    localStorage.setItem('idAccount', String(idAccount))
    changeAccountId(idAccount)

    setActiveStep(null);

    dispatch(
      updateFormId({
        id: idAccount
      })
    )
  }



  return <>
    {activeStep ?
      children
      :
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '400px'
      }}>
        <CircularProgress size={75} />
      </Box>
    }
  </>

}

export default ChangeStepForm;
