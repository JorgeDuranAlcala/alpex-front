// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const schema = yup.object().shape({
  number: yup.number().min(10).required(),
  country: yup.string().required()
})

type FormData = {
  country: string
  number: string
}

const WSStep1 = ({ handleVariant }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [enabled, setEnabled] = useState(false)
  const onSubmit: SubmitHandler<FormData> = data => {
    const { number, country } = data
    handleVariant('whatsapp', 2)
  }
  useEffect(() => {
    if (watch('country') !== undefined) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [watch('country')])

  return (
    <div className='buttons'>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size='small' className='custom-select'>
          <Controller
            name='country'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <InputLabel id='form-layouts-tabs-select-label'>Country</InputLabel>
                <Select
                  defaultValue=''
                  autoComplete='on'
                  id='form-layouts-tabs-select'
                  labelId='form-layouts-tabs-select-label'
                  className='custom-select'
                  value={value}
                  name='country'
                  error={Boolean(errors.country)}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </>
            )}
          />
          {errors.country && <FormHelperText sx={{ color: 'error.main' }}>Invalid country</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <Controller
            name='number'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label='WhatsApp'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                disabled={!enabled}
                error={Boolean(errors.number)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0D567B'
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#0D567B' }
                }}
              />
            )}
          />
          {errors.number && <FormHelperText sx={{ color: 'error.main' }}>Invalid number</FormHelperText>}
        </FormControl>

        <Button type='submit' variant='contained' color='primary' size='large'>
          CONTINUE
        </Button>
      </form>
    </div>
  )
}

WSStep1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

WSStep1.guestGuard = true

export default WSStep1
