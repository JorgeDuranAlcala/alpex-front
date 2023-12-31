// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useNotificationPassword } from '@/hooks/recoverPassword/recoveryPassword'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const schema = yup.object().shape({
  email: yup.string().email().required()
})

type FormData = {
  email: string
}
interface EmailStep1 {
  handleVariant: (variant: string, step: number) => void
}
const EmailStep1 = ({ handleVariant }: EmailStep1) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { recoveryPassword } = useNotificationPassword()

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email } = data
    if (email) handleVariant('email', 2)
    recoveryPassword({ email: email })
  }

  return (
    <div className='buttons'>
      <div className='form-row form-inputs'>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label='Email'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2535A8'
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                  }}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>Invalid email</FormHelperText>}
          </FormControl>

          <Button type='submit' variant='contained' color='primary' size='large' style={{ backgroundColor: '#2535A8' }}>
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  )
}

EmailStep1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

EmailStep1.guestGuard = true

export default EmailStep1
