// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'

// ** Layout Import
import UserThemeOptions from '@/layouts/UserThemeOptions'
import BlankLayout from 'src/@core/layouts/BlankLayout'

interface InitialStep {
  handleVariant: (variant: string, step: number) => void
}
const InitialStep = ({ handleVariant }: InitialStep) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const textButton = userThemeConfig.palette?.buttonText.primary

  return (
    <div className='buttons'>
      <Button
        variant='outlined'
        color='primary'
        size='large'
        endIcon={<Icon icon='material-symbols:arrow-right-alt' fontSize={20} color='#2535A8' />}
        onClick={() => handleVariant('email', 1)}
        sx={{ color: textButton }}
      >
        CONTINUE WITH EMAIL
      </Button>

      <Button
        variant='outlined'
        color='primary'
        size='large'
        endIcon={<Icon icon='material-symbols:arrow-right-alt' fontSize={20} color='#2535A8' />}
        onClick={() => handleVariant('whatsapp', 1)}
        sx={{ color: textButton }}
      >
        CONTINUE WITH WHATSAPP
      </Button>
    </div>
  )
}

InitialStep.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InitialStep.guestGuard = true

export default InitialStep
