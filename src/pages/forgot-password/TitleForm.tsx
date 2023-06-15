
import { Box, styled } from '@mui/material';

const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex', alignItems: 'base-line', gap: '8px',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    fontSize: '20px',
    'img': {
      paddingBottom: '2px',
      width: '20px',
      height: '22px',
    }
  }
}))

interface TitleFormProps {
  step: number;

  // variantStep: 'email' | 'whatsapp' | '';
  variantStep: string;
}


const TitleForm = ({ step, variantStep }: TitleFormProps) => {
  return (
    <BoxStyled >
      {(variantStep === 'email' || variantStep === '') && step === 2 ?
        <>
          <span>
            Check your email
          </span>
          <img src="/svg/envelope-arrow-big.svg" alt="envelope" width={28} height={28} />
        </>
        :
        <>
          <span>
            Forgot Password
          </span>
          <img src="/svg/lock-big.svg" alt="lock-icon" width={28} height={28} />
        </>
      }

    </BoxStyled>
  )
}

export default TitleForm
