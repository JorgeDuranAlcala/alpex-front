

import { SecurityDto } from "@/services/accounts/dtos/security.dto";
import { ReactNode, useRef, useState } from "react";
import { CreateSecondViewProps, DeleteSecondViewProps, SecondViewContext, SwitchViewProps } from "./SecondViewContext";

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {

  const [isOpenModal, setIsOpenModal] = useState<{ [key: number]: boolean }>({});
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<{ [key: number]: boolean }>({});
  const [securitiesAtMoment, setSecuritiesAtMoment] = useState<{ [key: number]: SecurityDto }>({})

  const isFormHasSecondView = useRef<{ [key: number]: boolean }>({});
  const isFormDeletedSecondView = useRef<{ [key: number]: boolean }>({});
  const $inputRef = useRef<{ [key: number]: HTMLInputElement }>({});



  const openModalSecondView = (formIndex: number) => {
    console.log('open modal second view', formIndex)
    setIsOpenModal({ ...isOpenModal, [formIndex]: true });
  }
  const closeModalSecondView = (formIndex: number) => {
    setIsOpenModal({ ...isOpenModal, [formIndex]: false });
  }

  const openModalUndo = (formIndex: number) => {
    setIsOpenModalUndo({ ...isOpenModalUndo, [formIndex]: true });
  }
  const closeModalUndo = (formIndex: number) => {
    setIsOpenModalUndo({ ...isOpenModalUndo, [formIndex]: false });
  }

  const createSecondView = ({ formIndex, securities, calculateSecurities }: CreateSecondViewProps) => {
    const tempSecurities = [...securities];
    tempSecurities[formIndex].activeView = 1;
    setSecuritiesAtMoment({
      ...securitiesAtMoment,
      [formIndex]: { ...tempSecurities[formIndex] }
    });
    const secondSecurity = { ...tempSecurities[formIndex] };
    secondSecurity.view = 2;
    secondSecurity.activeView = 1;
    const start = formIndex + 1; // <-- posición donde se insertará el elemento
    const deleteCount = 0; // <-- no se eliminará ningún elemento
    tempSecurities.splice(start, deleteCount, secondSecurity); // <-- insertamos el elemento

    isFormHasSecondView.current = { ...isFormHasSecondView.current, [formIndex]: true };
    isFormDeletedSecondView.current = { ...isFormDeletedSecondView.current, [formIndex]: false };
    console.log('create')
    console.log({
      securities,
      tempSecurities,
      formIndex,
      securitiesAtMoment,
      isFormHasSecondView: isFormHasSecondView.current,
      isFormDeletedSecondView: isFormDeletedSecondView.current
    })
    console.log('end create')


    calculateSecurities(tempSecurities);
  }

  const deleteSecondView = ({ formIndex, securities, calculateSecurities }: DeleteSecondViewProps) => {
    const tempSecurities = [...securities];
    tempSecurities[formIndex - 1] = { ...securitiesAtMoment[formIndex - 1] };
    tempSecurities[formIndex - 1].activeView = 1;

    tempSecurities.splice(formIndex, 1);
    isFormHasSecondView.current = { ...isFormHasSecondView.current, [formIndex - 1]: false };
    isFormDeletedSecondView.current = { ...isFormDeletedSecondView.current, [formIndex - 1]: true };

    console.log('delete')
    console.log({
      securities,
      tempSecurities,
      formIndex,
      securitiesAtMoment,
      isFormHasSecondView: isFormHasSecondView.current,
      isFormDeletedSecondView: isFormDeletedSecondView.current

    })
    calculateSecurities(tempSecurities);
    console.log('end delete')
  }

  const switchView = ({ formIndex, securities, calculateSecurities, view }: SwitchViewProps) => {
    const tempSecurities = [...securities];

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
      $inputRef: $inputRef.current,
      isFormHasSecondView: isFormHasSecondView.current,
      isFormDeletedSecondView: isFormDeletedSecondView.current,
      isOpenModal,
      isOpenModalUndo,
      openModalSecondView,
      closeModalSecondView,
      openModalUndo,
      closeModalUndo,
      createSecondView,
      deleteSecondView,
      switchView
    }}>
      {children}
    </SecondViewContext.Provider>
  )
}
