import { useAppSelector } from '@/store'
import { ModalActivateSecondView } from '../secondView/ModalActivateSecondView'
import { ModalUndoSecondView } from '../secondView/ModalUndoSecondView'
import { SwitchSecondView } from '../secondView/SwitchSecondView'
import { UndoSecondView } from '../secondView/UndoSecondView'
import { FormSection } from './FormSection'
import { TotalInputs } from './TotalInputs'

export const FormList = () => {

  const { securities, allFormData, activeView, } = useAppSelector(state => state.securitySlice)

  return (
    <>
      <ModalUndoSecondView />
      <ModalActivateSecondView />
      {activeView === 2 ?
        <UndoSecondView />
        : null}
      <SwitchSecondView activeView={activeView} />



      {securities.map((security, index) => {
        return (
          <FormSection
            key={`${index}-${security?.id}`}
            security={security}
            index={index}
          />
        )
      })}

      <TotalInputs
        recievedNetPremium={allFormData.recievedNetPremium}
        distribuitedNetPremium={allFormData.distribuitedNetPremium}
        difference={allFormData.diference}
      />
    </>
  )
}
