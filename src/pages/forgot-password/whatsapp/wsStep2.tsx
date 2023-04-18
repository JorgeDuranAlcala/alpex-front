// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, FormHelperText, Grid, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Layout Import
import { Icon } from '@iconify/react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const schema = yup.object().shape({
  number1: yup.number().required(),
  number2: yup.number().required(),
  number3: yup.number().required(),
  number4: yup.number().required(),
  number5: yup.number().required(),
  number6: yup.number().required()
})

type FormData = {
  number1: string
  number2: string
  number3: string
  number4: string
  number5: string
  number6: string
}

const WSStep2 = ({ handleVariant }) => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    const { number1 } = data
    router.push('/reset-password')
  }

  const [counter, setCounter] = useState(59)
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setInterval(() => {
      setCounter((counter: any) => counter - 1)
    }, 1000)
  }, [])
  useEffect(() => {
    const inputs = document.querySelectorAll('#inputs-code input')
    inputs.forEach((input, index) => {
      input.dataset.index = index
    })
    const handlePaste = (e: ClipboardEvent) => {
      const data = e.clipboardData.getData('text')
      const value = data.split('')

      inputs.forEach((input, index) => {
        try {
          input.value = value[index] || ''
        } catch (error) {}
      })
      submit()
    }
    const handleKeyDown = e => {
      if (e.key === 'Control') {
        return false
      }
      const input = e.target
      const value = input.value
      input.value = ''
      input.value = value ? value[0] : ''

      const fieldIndex = +input.dataset.index

      if (value.length > 0 && fieldIndex < inputs.length - 1) {
        inputs[fieldIndex + 1].focus()
      }

      if (e.key === 'Backspace' && fieldIndex > 0) {
        inputs[fieldIndex - 1].focus()
      }
      submit()
    }
    inputs.forEach(input => {
      input.addEventListener('paste', handlePaste)
      input.addEventListener('keyup', handleKeyDown)
    })
    const submit = () => {
      let code = ''
      inputs.forEach(input => {
        code += input.value
      })
      if (code.length == 6) {
        setEnabled(true)
      } else {
        setEnabled(false)
      }
    }
  }, [])

  return (
    <div className='buttons'>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid id='inputs-code' container spacing={3}>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number1'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number1)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number1 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number2'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number2)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number2 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number3'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number3)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number3 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number4'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number4)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number4 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number5'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number5)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number5 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <Controller
                name='number6'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number6)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0D567B'
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                    }}
                  />
                )}
              />
              {errors.number6 && <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>}
            </FormControl>
          </Grid>
          <Button type='submit' disabled={!enabled} variant='contained' color='primary' size='large'>
            CONTINUE
          </Button>
        </Grid>
        {counter > 0 ? (
          <div className='timer'>
            <Icon icon='mdi:clock-outline' fontSize={20} />
            {`0:${counter.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`}
          </div>
        ) : (
          <Button
            onClick={() => {
              setCounter(59)
            }}
            variant='text'
            color='primary'
            size='large'
          >
            DID NOT RECEIVED THE CODE
          </Button>
        )}
      </form>
    </div>
  )
}

WSStep2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

WSStep2.guestGuard = true

export default WSStep2
