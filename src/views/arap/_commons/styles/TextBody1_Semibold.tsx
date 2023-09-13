import { styled, Typography } from '@mui/material'

export const TextBody1_Semibold = styled(Typography)(() => ({
  color: 'rgba(77, 80, 98, 0.87)',
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '150%',
  letterSpacing: '0.15px'
})) as typeof Typography
