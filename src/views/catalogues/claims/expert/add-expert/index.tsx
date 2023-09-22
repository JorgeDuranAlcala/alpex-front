import { FormSection } from 'src/styles/Forms/FormSection'
import { StyledTitle } from 'src/views/custom/typography'
import ExpertForm from './Form'

interface IAddExpert {
  title: string;
  subTitle: string;
}

const AddExpert = ({ title }: IAddExpert) => {

  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>
        <div className='form-wrapper'>
          <ExpertForm/>
        </div>
      </div>
    </>
  )
}

export default AddExpert
