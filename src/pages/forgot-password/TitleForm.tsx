
import { Box } from '@mui/material';
import Img from 'next/image';



interface TitleFormProps {
  step: number;

  // variantStep: 'email' | 'whatsapp' | '';
  variantStep: string;
}


const TitleForm = ({ step, variantStep }: TitleFormProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'base-line', gap: '8px' }}>
      {(variantStep === 'email' || variantStep === '') && step === 2 ?
        <>
          <span>
            Check your email
          </span>
          <Img src="/svg/envelope-arrow.svg" alt="envelope" width={28} height={28} />
        </>
        :
        <>
          <span>
            Forgot Password
          </span>
          <Img src="/images/misc/lock-icon.png" alt="lock-icon" width={28} height={28} />
        </>
      }

    </Box>
  )
}

export default TitleForm
