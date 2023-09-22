import { CollapsibleContent } from '@/@core-custom/collapsibles/CollapsibleContent'
import { FormAccountingStructure } from '../../_commons/components/forms/accountingStructure/FormAccountingStructure'
import { FormPaymentInstallment } from '../../_commons/components/forms/paymentInstallment/FormPaymentInstallment'
import { DetailsContainer } from '../../_commons/styles/DetailsContainer'

export const BrokerDetails = () => {
  return (
    <DetailsContainer>
      <CollapsibleContent title='Accounting Structure' isExpanded={true}>
        <FormAccountingStructure by='broker' />
      </CollapsibleContent>

      <CollapsibleContent title='Payments'>
        <FormPaymentInstallment />
      </CollapsibleContent>

      <CollapsibleContent title='Endorsements'>
        <div>component to be defined</div>
      </CollapsibleContent>

      <CollapsibleContent title='Claims'>
        <div>component to be defined</div>
      </CollapsibleContent>
    </DetailsContainer>
  )
}
