import { Theme, styled } from '@mui/material/styles'

interface StyledTypografy extends React.HTMLAttributes<HTMLParagraphElement> {
  maxWidth?: string
  theme?: Theme
  otherProps?: React.CSSProperties
}
export const StyledTitle = styled('p')(({ theme }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 24,
  lineHeight: '133.4%',
  color: theme.palette.text.primary,
  flex: 'none',
  order: 0,
  flexGrow: 0
}))

export const StyledDescription = styled('p')<StyledTypografy>(({ maxWidth, theme, otherProps }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '133.4%',
  letterSpacing: '0.15px',
  color: theme.palette.text.secondary,
  flex: 'none',
  order: 1,
  flexGrow: 0,
  maxWidth: `${maxWidth ? maxWidth : '100%'}`,
  ...otherProps
}))

export const StyledSubtitle = styled('p')<StyledTypografy>(({ theme, otherProps }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 20,
  lineHeight: '32px',
  letterSpacing: '0.15px',
  color: theme.palette.text.secondary,
  flex: 'none',
  order: 0,
  flexGrow: 0,
  ...otherProps
}))
