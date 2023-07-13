import { useAppDispatch } from "@/store";
import { ReactNode, useContext, useState } from "react";
import UserThemeOptions from 'src/layouts/UserThemeOptions';
import { Security, createNewSecurity } from "../../store/securitySlice";
import { FormValidationsContext } from "../formValidations/FormValidationsContext";
import { LoadAndSaveSecuritiesContext } from "../loadAndSaveSecurities/LoadAndSaveSecuritiesContext";
import { LayoutSecurityContext } from "./LayoutSecurityContext";

interface NextStep {
  isOpenModal: boolean;
  isNextStep: boolean;
}

export const LayoutSecurityProvider = ({ children }: { children: ReactNode }) => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter;

  const dispatch = useAppDispatch();

  const { allErrors, setActiveErrors } = useContext(FormValidationsContext);
  const { saveData, isDataLoaded } = useContext(LoadAndSaveSecuritiesContext);

  const [nextStep, setNextStep] = useState<NextStep>({
    isOpenModal: false,
    isNextStep: false
  })


  const handleCloseNextModal = () => {
    setNextStep((prev) => ({
      ...prev,
      isOpenModal: false
    }))
  }

  const handleNextStep = () => {
    saveData();
    setNextStep({
      isOpenModal: false,
      isNextStep: true,
    })
  }

  const handleBeforeNextStep = () => {
    const isError = allErrors.find(error => error)
    setActiveErrors(isError || false)
    if (!isError) {
      setNextStep((prev) => ({
        ...prev,
        isOpenModal: false
      }))
    }
  }

  const handleAddNewForm = () => {
    const securityNew = {} as Security;
    dispatch(createNewSecurity({
      ...securityNew,
      frontingFeeActive: false,
      view: 1
    }))
  }



  const handleSaveData = () => {
    saveData();
  }

  return (
    <LayoutSecurityContext.Provider value={{
      // variables
      fontFamily: inter,

      // states
      isOpenNextModal: nextStep.isOpenModal,
      isNextStep: nextStep.isNextStep,
      isDataLoaded,

      // methods
      handleCloseNextModal,
      handleBeforeNextStep,
      handleNextStep,
      handleAddNewForm,
      handleSaveData
    }}>
      {children}
    </LayoutSecurityContext.Provider>
  )
}
