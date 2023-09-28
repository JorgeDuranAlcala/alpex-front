import { styled, Typography } from "@mui/material";


export const TextBody2 = styled(Typography)(() => ({
  color: 'rgba(77, 80, 98, 0.87)',
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '142.857%',
  letterSpacing: '0.15px',

  whiteSpace: 'nowrap',
})) as typeof Typography;