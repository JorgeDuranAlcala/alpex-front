
import { Box } from '@mui/material';
import Img from 'next/image';

interface TitleFormProps {
  step: number;

  // variantStep: 'email' | 'whatsapp' | '';
  variantStep: string;
}


const TitleForm = ({ step, variantStep }: TitleFormProps) => {
  return (
    <>
      {(variantStep === 'email' || variantStep === '') && step === 2 ?
        <Box sx={{ display: 'flex', alignItems: 'base-line', gap: '8px' }}>

          <span>
            Check your email
          </span>
          <Img src="/svg/envelope-arrow.svg" alt="envelope" width={28} height={28} />
        </Box>
        : 'Forgot Password'}

    </>
  )
}

export default TitleForm
