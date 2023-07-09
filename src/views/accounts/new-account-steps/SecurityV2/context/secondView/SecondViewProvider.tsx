
import { ReactNode, useRef, useState } from 'react';


import { useAppDispatch } from '@/store';
import { createSecondView, deleteSecondView, switchView } from '../../store/securitySlice';
import { SecondViewContext, SwitchViewProps } from './SecondViewContext';

export const SecondViewProvider = ({ children }: { children: ReactNode }) => {

  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalUndo, setIsOpenModalUndo] = useState<boolean>(false)

  const $inputRef = useRef<{ [key: number]: HTMLInputElement }>({})

  const openModalSecondView = () => {
    setIsOpenModal(true)
  }
  const closeModalSecondView = () => {
    setIsOpenModal(false)
  }

  const openModalUndo = () => {
    setIsOpenModalUndo(true)
  }
  const closeModalUndo = () => {
    setIsOpenModalUndo(false)
  }
  const handleCreateSecondView = () => {
    dispatch(createSecondView)
  }

  const handleDeleteSecondView = () => {
    dispatch(deleteSecondView)
  }

  const handleSwitchView = ({ toView }: SwitchViewProps) => {
    dispatch(switchView({ toView }));
  }

  return (
    <SecondViewContext.Provider
      value={{
        $inputRef: $inputRef.current,
        isOpenModal,
        isOpenModalUndo,
        openModalSecondView,
        closeModalSecondView,
        openModalUndo,
        closeModalUndo,
        handleCreateSecondView,
        handleDeleteSecondView,
        handleSwitchView,
      }}
    >
      {children}
    </SecondViewContext.Provider>
  )
}
