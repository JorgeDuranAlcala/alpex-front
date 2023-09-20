import React, { useEffect, useState } from 'react'
import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledDescription, StyledSubtitle, StyledTitle } from 'src/views/custom/typography'
import UpdateAdjusterForm from './Form'
import { CataloguesClaimsContext, adjusterByIdSelector } from 'src/context/catalogues-claims/reducer';
import { useRouter } from 'next/router'

const UpdateAdjuster = () => {

    const router = useRouter()
    const id = router.query.id && parseInt(router.query.id.toString())
  
    const { state } = React.useContext(CataloguesClaimsContext);
    const adjusterData = adjusterByIdSelector(state, id);
    if(!adjusterData) router.back();

    const title = `Edit ${adjusterData.siglas} Account`

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
