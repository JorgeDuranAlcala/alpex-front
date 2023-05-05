import { Theme, styled } from '@mui/material/styles'

interface UserSectionProps {
  maxWidth?: string
  margin?: string
  theme?: Theme
  otherProps?: React.CSSProperties
}

export const UserSection = styled('div')<UserSectionProps>(({ maxWidth, margin, otherProps }) => ({
  marginTop: '20px',
  margin: margin ? margin : '',
  maxWidth: maxWidth ? maxWidth : '100%',
  ...otherProps
}))
