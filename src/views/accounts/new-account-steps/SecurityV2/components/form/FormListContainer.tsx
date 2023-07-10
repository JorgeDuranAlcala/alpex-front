import { useAppSelector } from '@/store'
import { SecondViewProvider } from '../../../Security/components/secondView/SecondViewProvider'
import { ModalActivateSecondView } from '../secondView/ModalActivateSecondView'
import { ModalUndoSecondView } from '../secondView/ModalUndoSecondView'
import { SwitchSecondView } from '../secondView/SwitchSecondView'
import { UndoSecondView } from '../secondView/UndoSecondView'
import { FormSectionList } from './FormSectionList'
import { TotalInputs } from './TotalInputs'


export const FormListContainer = () => {

  const { securities, allFormData, activeView, } = useAppSelector(state => state.securitySlice)

  return (
    <SecondViewProvider>
      <ModalUndoSecondView />
      <ModalActivateSecondView />
      {activeView === 2 ?
        <UndoSecondView />
        : null}
      <SwitchSecondView activeView={activeView} />


      <FormSectionList securities={securities} />


      <TotalInputs
        recievedNetPremium={allFormData.recievedNetPremium}
        distribuitedNetPremium={allFormData.distribuitedNetPremium}
        difference={allFormData.diference}
      />
    </SecondViewProvider>
  )
}

