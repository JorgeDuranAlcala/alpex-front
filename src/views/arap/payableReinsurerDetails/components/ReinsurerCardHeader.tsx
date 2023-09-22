import { ActionButton } from '../../_commons/components/buttons/ActionButton'
import { InfoCardHeader } from '../../_commons/components/cards/InfoCardHeader'
import { InputDate } from '../../_commons/components/inputs/InputDate'
import { SelectPaymentSchedule } from '../../_commons/components/inputs/SelecPaymentSchedule'
import { usePaymentSchedule } from '../../_commons/hooks/usePaymentSchedule'
import { PaymentScheduleOption } from '../../_commons/interfaces/PaymentScheduleOption'
import { useReinsurerDetails } from '../hooks/useReinsurerDetails'

export const ReinsurerCardHeader = () => {
  const { isLoading, reinsurerDetails } = useReinsurerDetails()

  const { selectedPaymentSchedule, nextPaymentDate, handlePaymentScheduleChange } = usePaymentSchedule()

  if (!selectedPaymentSchedule) {
    if (reinsurerDetails) {
      handlePaymentScheduleChange(reinsurerDetails.selected_payment_schedule || 'monthly', 'reinsurance')

      console.log('changePaymentSheduleOption!')
    }

    return null
  }

  return (
    <InfoCardHeader
      isLoading={isLoading}
      logo={reinsurerDetails?.logo_url}
      name={reinsurerDetails?.name || 'Unknown Reinsurer Name'}
      addressString={reinsurerDetails?.address_string}
      phone={reinsurerDetails?.phone}
      email={reinsurerDetails?.email}
      inputsComponents={
        <>
          {selectedPaymentSchedule ? (
            <SelectPaymentSchedule
              selectedValue={selectedPaymentSchedule}
              onChange={value =>
                handlePaymentScheduleChange(value.target.value as PaymentScheduleOption, 'reinsurance')
              }
            />
          ) : null}

          {nextPaymentDate ? <InputDate label="Next Payment Date" value={nextPaymentDate} onChange={() => null} isDisabled={true} /> : null}
        </>
      }
      actionButtonsComponent={
        <>
          <ActionButton icon='ic:sharp-download' onClick={() => null} />
          <ActionButton icon='material-symbols:print' onClick={() => null} />
          <ActionButton icon='ic:outline-mail' onClick={() => null} />
          <ActionButton icon='ic:baseline-whatsapp' onClick={() => null} />
          <ActionButton icon='mdi:message-outline' onClick={() => null} />
        </>
      }
    />
  )
}
