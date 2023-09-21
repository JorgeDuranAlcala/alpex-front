import { FormSection } from 'src/styles/Forms/FormSection'
import {StyledTitle } from 'src/views/custom/typography'
import AdjusterForm from './Form'

interface IAddAdjuster {
  title: string;
  subTitle: string;
}

const AddAdjuster = ({ title  }: IAddAdjuster) => {

  return (
    <>
      <div style={{ padding: '20px 20px 80px' }}>
        <FormSection>
          <StyledTitle sx={{ pb: 2 }}>{title}</StyledTitle>
        </FormSection>
        <div className='form-wrapper'>
          <AdjusterForm/>
        </div>
      </div>
    </>
  )
}

export default AddAdjuster
