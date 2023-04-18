// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, FormHelperText, InputAdornment, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CountrySelect from 'src/pages/components/select/CountrySelect'

// ** Import Data
const schema = yup.object().shape({
  number: yup.number().min(10).required()
})

type FormData = {
  number: string
}
interface WSStep1 {
  handleVariant: (variant: string, step: number) => void
}
const WSStep1 = ({ handleVariant }: WSStep1) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const [enabled, setEnabled] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<any>(null)

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data)
    handleVariant('whatsapp', 2)
  }

  useEffect(() => {
    if (selectedCountry) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [selectedCountry])

  return (
    <div className='buttons2'>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CountrySelect setSelectedCountry={setSelectedCountry}></CountrySelect>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <Controller
            name='number'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: <InputAdornment position='start'>+{selectedCountry?.phone}</InputAdornment>
                }}
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

        <Button type='submit' variant='contained' color='primary' size='large' fullWidth sx={{ mt: 4 }}>
          CONTINUE
        </Button>
      </form>
    </div>
  )
}

WSStep1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

WSStep1.guestGuard = true

export default WSStep1
