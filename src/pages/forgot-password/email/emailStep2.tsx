// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'

import BlankLayout from 'src/@core/layouts/BlankLayout'

interface EmailStep2 {
  handleVariant: (variant: string, step: number) => void
}
const EmailStep2 = ({ handleVariant }: EmailStep2) => {
  return (
    <div className='buttons'>
      <Button
        onClick={() => {
          handleVariant('', 0)
        }}
        variant='text'
        color='primary'
        size='large'
        startIcon={<Icon icon='mdi:arrow-left-thin' fontSize={15} />}
      >
        BACK TO LOGIN
      </Button>
    </div>
  )
}

EmailStep2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

EmailStep2.guestGuard = true

export default EmailStep2
