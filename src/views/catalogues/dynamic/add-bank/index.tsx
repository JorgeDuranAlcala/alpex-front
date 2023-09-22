import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledTitle } from 'src/views/custom/typography'
import BankForm from './Form'

interface IAddBank {
  title: string;
  subTitle: string;
}

const AddBank = ({ title }: IAddBank) => {

  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>
        <div className='form-wrapper'>
          <BankForm/>
        </div>
      </div>
    </>
  )
}

export default AddBank
