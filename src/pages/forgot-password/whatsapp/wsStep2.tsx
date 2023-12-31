// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, FormHelperText, Grid, TextField, styled } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Layout Import
import { Icon } from '@iconify/react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const TextFieldStyled = styled(TextField)(() => ({

  '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2535A8',
    color: '#2535A8'
  },
  '& .MuiOutlinedInput-input': {
    color: '#2535A8',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }

}));

const schema = yup.object().shape({
  number1: yup.number(),
  number2: yup.number(),
  number3: yup.number(),
  number4: yup.number(),
  number5: yup.number(),
  number6: yup.number()
})

type FormData = {
  number1: string
  number2: string
  number3: string
  number4: string
  number5: string
  number6: string
}
const WSStep2 = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data)
    router.push('/reset-password')
  }

  const [counter, setCounter] = useState(59)
  const [enabled, setEnabled] = useState(false)
  const [codeState, setCodeState] = useState('')
  useEffect(() => {
    setInterval(() => {
      setCounter((counter: any) => counter - 1)
    }, 1000)
  }, [])
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLElement>('#inputs-code input')
    inputs.forEach((input, index) => {
      input.dataset.index = index.toString()
    })
    const handlePaste = (e: ClipboardEvent) => {
      const data = e?.clipboardData?.getData('text')
      const value = data?.split('')
      inputs.forEach((input, index) => {
        try {
          // @ts-ignore
          setValue('number' + (index + 1), value[index] || '')
          submit()
        } catch (error) { }
      })
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        return false
      }
      const input = e.target as HTMLInputElement
      const value = input.value
      input.value = ''
      input.value = value ? value[0] : ''

      // @ts-ignore
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
      inputs.forEach((input: any) => {
        code += input.value
      })
      setCodeState(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (codeState.length == 6) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [codeState])

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
                  <TextFieldStyled
                    autoFocus
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number1)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}
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
                  <TextFieldStyled
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number2)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}

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
                  <TextFieldStyled
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number3)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}

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
                  <TextFieldStyled
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number4)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}

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
                  <TextFieldStyled
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number5)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}

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
                  <TextFieldStyled
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.number6)}
                    className='custom-input'
                    inputProps={{ maxLength: 1 }}

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
