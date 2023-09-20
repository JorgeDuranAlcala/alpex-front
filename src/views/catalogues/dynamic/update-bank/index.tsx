import { useEffect, useState, useContext } from 'react';
import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledDescription, StyledSubtitle, StyledTitle } from 'src/views/custom/typography'
import BankForm from './Form'
import { DynamicContext, bankByIdSelector } from 'src/context/dynamic/reducer';
import { useRouter } from 'next/router'


const UpdateBank = () => {

    const router = useRouter()
    const [bank, setBank] = useState<any>(null)
    const { state } = useContext(DynamicContext);
    const id = router.query.id && (parseInt(router.query.id.toString()))
    const bankData = state.banks.find(b => b.id == id);
    if(!bankData) router.back();

    const title = `Edit ${bankData?.bank} Account`;


  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>

        <div className='form-wrapper'>
          {id && <BankForm  id={id} /> }
        </div>
      </div>
    </>
  )
}

export default UpdateBank
