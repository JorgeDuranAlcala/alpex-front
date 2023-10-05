import React from 'react'
import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledTitle } from 'src/views/custom/typography'
import UpdateExpertForm from './Form'
import { CataloguesClaimsContext, expertByIdSelector } from 'src/context/catalogues-claims/reducer';
import { useRouter } from 'next/router'

const UpdateExpert = () => {

    const router = useRouter()

    const id = Number(router.query.id && router.query.id.toString()) as number;
  
    const { state } = React.useContext(CataloguesClaimsContext);
    const expertData = expertByIdSelector(state, id as number);
    if(!expertData) router.back();
    const title = expertData && `Edit ${expertData.businessName} Account`


  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>
        <div className='form-wrapper'>
          <UpdateExpertForm id={id}/>
        </div>
      </div>
    </>
  )
}

export default UpdateExpert