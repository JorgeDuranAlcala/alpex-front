import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  prefix: string
  suffix: string
}
export const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, prefix, suffix, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ? prefix : suffix ? '' : '$'}
      suffix={suffix ? suffix : ''}
    />
  )
})
