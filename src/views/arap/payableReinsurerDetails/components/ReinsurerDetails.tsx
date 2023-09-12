import { CollapsibleContent } from '@/@core-custom/collapsibles/CollapsibleContent'
import { DetailsContainer } from '../../_commons/styles/DetailsContainer'

export const ReinsurerDetails = () => {
  return (
    <DetailsContainer>
      <CollapsibleContent title='Accounting Structure'>
        <div>contenido</div>
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
