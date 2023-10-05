import React from 'react'
import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledTitle } from 'src/views/custom/typography'
import UpdateAdjusterForm from './Form'
import { CataloguesClaimsContext, adjusterByIdSelector } from 'src/context/catalogues-claims/reducer';
import { useRouter } from 'next/router'

const UpdateAdjuster = () => {

    const router = useRouter()
    const id = Number(router.query.id && router.query.id.toString()) as number;
  
    const { state } = React.useContext(CataloguesClaimsContext);
    const adjusterData = adjusterByIdSelector(state, id as number);
    if(!adjusterData) router.back();

    const title = adjusterData && `Edit ${adjusterData.businessName} Account`

  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>
        <div className='form-wrapper'>
          <UpdateAdjusterForm id={id}/>
        </div>
      </div>
    </>
  )
}

export default UpdateAdjuster