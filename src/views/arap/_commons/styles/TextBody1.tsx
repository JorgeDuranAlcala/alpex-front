import { styled, Typography } from '@mui/material'

export const TextBody1 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '0.15px',

  whiteSpace: 'nowrap'
})) as typeof Typography
