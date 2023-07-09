import { ReactNode, useState } from "react";
import UserThemeOptions from 'src/layouts/UserThemeOptions';
import { LayoutSecurityContext } from "./LayoutSecurityContext";

interface NextStep {
  isOpenModal: boolean;
  isNextStep: boolean;
}

export const LayoutSecurityProvider = ({ children }: { children: ReactNode }) => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter;

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

    // SaveData()
    setNextStep({
      isOpenModal: false,
      isNextStep: true,
    })
  }




  return (
    <LayoutSecurityContext.Provider value={{
      // variables
      fontFamily: inter,

      // states
      isOpenNextModal: nextStep.isOpenModal,
      isNextStep: nextStep.isNextStep,

      // methods
      handleCloseNextModal,
      handleNextStep
    }}>
      {children}
    </LayoutSecurityContext.Provider>
  )
}
