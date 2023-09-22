import { Theme, styled } from '@mui/material/styles'

interface FormSectionProps {
  maxWidth?: string
  margin?: string
  theme?: Theme
  otherProps?: React.CSSProperties
}

export const FormSection = styled('div')<FormSectionProps>(({ maxWidth, margin, otherProps }) => ({
  marginTop: '-20px',
  margin: margin ? margin : '',
  maxWidth: maxWidth ? maxWidth : '100%',
  ...otherProps
}))
