import { useAppSelector } from '@/store'

import { ModalActivateSecondView } from '../secondView/ModalActivateSecondView'
import { ModalUndoSecondView } from '../secondView/ModalUndoSecondView'
import { SwitchSecondView } from '../secondView/SwitchSecondView'
import { UndoSecondView } from '../secondView/UndoSecondView'
import { MemoizedFormSectionList } from './FormSectionList'
import { TotalInputs } from './TotalInputs'


export const FormListContainer = () => {

  const { securities, allFormData, activeView, hasSecondView } = useAppSelector(state => state.securitySlice)

  // console.log('ListContainer - render')

  return (
    <>
      <ModalUndoSecondView />
      <ModalActivateSecondView />
      <UndoSecondView activeView={activeView} hasSecondView={hasSecondView} />
      <SwitchSecondView activeView={activeView} hasSecondView={hasSecondView} />


      <MemoizedFormSectionList securities={securities} />


      <TotalInputs
        recievedNetPremium={allFormData.recievedNetPremium}
        distribuitedNetPremium={allFormData.distribuitedNetPremium}
        difference={allFormData.diference}
      />
    </>
  )
}

