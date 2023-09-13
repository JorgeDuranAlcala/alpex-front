import { ActionButton } from '../../_commons/components/buttons/ActionButton'
import { InfoCardHeader } from '../../_commons/components/cards/InfoCardHeader'
import { InputDate } from '../../_commons/components/inputs/InputDate'
import { SelectPaymentSchedule } from '../../_commons/components/inputs/SelecPaymentSchedule'
import { usePaymentSchedule } from '../../_commons/hooks/usePaymentSchedule'
import { PaymentScheduleOption } from '../../_commons/interfaces/PaymentScheduleOption'
import { useBrokerDetails } from '../hooks/useBrokerDetails'

export const BrokerCardHeader = () => {
  const { isLoading, brokerDetails } = useBrokerDetails()

  const { selectedPaymentSchedule, nextPaymentDate, handlePaymentScheduleChange } = usePaymentSchedule()

  if (!selectedPaymentSchedule) {
    if (brokerDetails) {
      handlePaymentScheduleChange(brokerDetails.selected_payment_schedule || 'monthly', 'broker')
      console.log('changePaymentSheduleOption!')
    }

    return null
  }

  return (
    <InfoCardHeader
      isLoading={isLoading}
      logo={brokerDetails?.logo_url}
      name={brokerDetails?.name || 'Unknown Broker Name'}
      addressString={brokerDetails?.address_string}
      phone={brokerDetails?.phone}
      email={brokerDetails?.email}
      inputsComponents={
        <>
          <SelectPaymentSchedule
            selectedValue={selectedPaymentSchedule}
            onChange={value => handlePaymentScheduleChange(value.target.value as PaymentScheduleOption, 'broker')}
          />

          {nextPaymentDate ? <InputDate value={nextPaymentDate} onChange={() => null} isDisabled={true} /> : null}
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
