// ** React Imports
import Link from 'next/link';
import { ReactNode } from 'react';

// ** MUI Components
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';

import { Box, styled } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout';


const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  '> a': {
    textDecoration: 'none',
  }

}));
interface EmailStep2 {
  handleVariant: (variant: string, step: number) => void
}
const EmailStep2 = () => {
  return (
    <ButtonContainer >
      <Link href="/login">
        <Button
          variant='text'
          color='primary'
          size='large'
          startIcon={<Icon icon='ant-design:arrow-left-outlined' fontSize={15} />}
          style={{ color: '#2535A8' }}
        >
          BACK TO LOGIN
        </Button>
      </Link>
    </ButtonContainer>
  )
}

EmailStep2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

EmailStep2.guestGuard = true

export default EmailStep2
