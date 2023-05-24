import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'
import { countries } from 'src/@fake-db/autocomplete/index'

interface CountrySelect {
  setSelectedCountry: React.Dispatch<React.SetStateAction<any>>
  otherProps?: React.CSSProperties
  size?: 'small' | 'medium'
  whatsApp?: boolean
}

export interface ICountry {
  label: string
  code: string
  phone: string
}
export default function CountrySelect({ setSelectedCountry, size = 'small', otherProps, whatsApp }: CountrySelect) {
  const [value, setValue] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const options = [...countries.map(country => country.label)]

  useEffect(() => {
    setSelectedCountry(countries.find(country => country.label === value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id='controllable-states-demo'
        options={options}
        sx={{ width: 200 }}
        style={{ ...otherProps }}
        size={size}
        renderInput={params => <TextField {...params} label={whatsApp ? 'Country' : 'Select Country Code'} />}
      />
    </div>
  )
}
