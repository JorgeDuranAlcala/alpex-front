// ** React Imports
import Link from 'next/link';
import { ReactNode } from 'react';

// ** MUI Components
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';

import BlankLayout from 'src/@core/layouts/BlankLayout';

interface EmailStep2 {
  handleVariant: (variant: string, step: number) => void
}
const EmailStep2 = () => {
  return (
    <div className='buttons'>
      <Link href="/login">
        <Button
          variant='text'
          color='primary'
          size='large'
          startIcon={<Icon icon='ant-design:arrow-left-outlined' fontSize={15} />}
          style={{ color: '#0D567B' }}
        >
          BACK TO LOGIN
        </Button>
      </Link>
    </div>
  )
}

EmailStep2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

EmailStep2.guestGuard = true

export default EmailStep2
