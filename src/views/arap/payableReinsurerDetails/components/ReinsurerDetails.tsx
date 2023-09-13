import { CollapsibleContent } from '@/@core-custom/collapsibles/CollapsibleContent'
import { FormAccountingStructure } from '../../_commons/components/forms/accountingStructure/FormAccountingStructure'
import { DetailsContainer } from '../../_commons/styles/DetailsContainer'

export const ReinsurerDetails = () => {
  return (
    <DetailsContainer>
      <CollapsibleContent title='Accounting Structure' isExpanded={true}>
        <FormAccountingStructure by='reinsurer' />
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
