import { Box, CircularProgress } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import useFormStep_recuperateStep from "@/hooks/accounts/forms/stepForms/recuperate/useFormStep_recuperateStep";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateFormsData } from "@/store/apps/accounts";

interface CheckStepFormProps {
  step: number;
  children: ({ step }: { step: number }) => ReactNode;
  changeStep: (step: number) => void;
}

export const CheckStepForm = ({ step, changeStep, children }: CheckStepFormProps) => {

  const dispatch = useAppDispatch();
  const { tabButtons } = useAppSelector(state => state.multiTabButtonsSlice);
  const { getStep } = useFormStep_recuperateStep();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // const isEffectedSameSteps = useRef<boolean>(false);

  console.log('CheckStepForm render with: ', {
    step,
    activeStep,
  })

  // useEffect(() => {
  //   setActiveStep(step);
  // }, [step])

  const handleSetAccountId = (idAccount: string | null) => {
    console.log('handleSet AccountId', idAccount)

    if (idAccount) {

      localStorage.setItem('idAccount', idAccount)

      dispatch(
        updateFormsData({
          form1: {
            basicInfo: {},
            placementStructure: {},
            userFile: {},
            id: idAccount
          }
        })
      )

    }
  }

  const handleIsSetLastFormStep = (idAccountFromTab: string | null) => {

    // let isStepChanged = false;
    const { idAccount, step: lastFormStep } = getStep(idAccountFromTab);

    console.log({
      idAccount,
      lastFormStep,
    })

    if (lastFormStep) {

      if (lastFormStep !== step) {

        console.log('step changed effect - set active step LAST STEP')
        handleSetAccountId(idAccount);
        changeStep(lastFormStep);


        setActiveStep(lastFormStep);

        // isStepChanged = true;
      }
    } else {
      console.log('step changed effect - set active step NORMAL')
      handleSetAccountId(idAccount);
      setActiveStep(step);
    }
  }

  useEffect(() => {

    console.log('step changed effect')

    // if (handleIsSetLastFormStep(null)) return;

    const { idAccount } = getStep(null);
    handleSetAccountId(idAccount);


    console.log('step changed effect - set active step NORMAL')
    setActiveStep(step);

    // isEffectedSameSteps.current = false;

    // return () => {
    //   setActiveStep(null);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('tabButtons eFFEcT');

    if (!tabButtons) {
      setActiveStep(step);

      return;
    }

    const activeTabButton = tabButtons.find(tabButton => tabButton.isActive);

    if (!activeTabButton) return;

    const idAccount = activeTabButton.text;

    if (activeStep) {



      if (step !== activeStep) {
        setActiveStep(step)
      }

      // if (!isEffectedSameSteps.current) return;

      if (step === activeStep) {

        // isEffectedSameSteps.current = true;
        console.log('enter same steps')

        const lastAccountId = localStorage.getItem('idAccount');

        console.log({ idAccount, lastAccountId })

        if (idAccount !== lastAccountId) {
          console.log('account Different')

          // handleSetAccountId(idAccount);

          handleIsSetLastFormStep(idAccount);
        }

      }
    } else {
      console.log('activeStep is null', idAccount)
      handleIsSetLastFormStep(idAccount);
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabButtons])



  // useEffect(() => {
  //   console.log('useEffect steps: ', {
  //     step,
  //     activeStep,
  //   })

  //   if (!activeStep) return;

  //   if (step !== activeStep) {
  //     setActiveStep(step)
  //   }

  //   if (!isEffectedSameSteps.current) return;

  //   if (step === activeStep) {
  //     isEffectedSameSteps.current = true;
  //     console.log('enter same steps')

  //     const lastAccountId = localStorage.getItem('idAccount');

  //     console.log({ idAccountRef, lastAccountId })

  //     if (idAccountRef !== lastAccountId) {
  //       console.log('account Different')
  //       handleSetAccountId(idAccountRef);
  //       handleIsSetLastFormStep();
  //     }

  //   }


  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [step, activeStep])


  return <>
    {activeStep ?
      children({ step })
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
