

import { ReactNode, useState } from "react";
import { CreateSecondViewProps, SecondViewContext, SwitchViewProps } from "./SecondViewContext";

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModalSecondView = () => {
    setIsOpenModal(true);
  }
  const closeModalSecondView = () => {
    setIsOpenModal(false);
  }


  const createSecondView = ({ formIndex, securities, calculateSecurities }: CreateSecondViewProps) => {
    const tempSecurities = [...securities];
    tempSecurities[formIndex].activeView = 1;
    const secondSecurity = { ...tempSecurities[formIndex] };
    secondSecurity.view = 2;
    secondSecurity.activeView = 1;
    const start = formIndex + 1; // <-- posición donde se insertará el elemento
    const deleteCount = 0; // <-- no se eliminará ningún elemento
    tempSecurities.splice(start, deleteCount, secondSecurity); // <-- insertamos el elemento

    // const hasSecondViewTemp = { ...hasSecondView, [formIndex]: true, [formIndex + 1]: true }
    // setHasSecondView(hasSecondViewTemp)
    calculateSecurities(tempSecurities);
  }

  const switchView = ({ formIndex, securities, calculateSecurities, view }: SwitchViewProps) => {
    const tempSecurities = [...securities];
    console.log({ tempSecurities, formIndex, quiero: view })
    if (view === 1) {
      tempSecurities[formIndex - 1].activeView = 1;
      tempSecurities[formIndex].activeView = 1;
    } else if (view === 2) {
      tempSecurities[formIndex].activeView = 2;

      // * Cada vez que se cambie a vista 2 se clona lo que se trabajó en la vista 1
      // * a excepción del netPremiumAt100
      // Todo verificar las validaciones que sean correctas con el netPremiumAt100 fijo
      tempSecurities[formIndex + 1] = {
        ...tempSecurities[formIndex],
        netPremiumAt100: tempSecurities[formIndex + 1].netPremiumAt100,
        view: 2,
        activeView: 2,
      }

    }

    calculateSecurities(tempSecurities);
  }

  return (
    <SecondViewContext.Provider value={{
      isOpenModal,
      openModalSecondView,
      closeModalSecondView,
      createSecondView,
      switchView
    }}>
      {children}
    </SecondViewContext.Provider>
  )
}
