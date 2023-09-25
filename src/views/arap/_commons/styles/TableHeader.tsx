import { Box, styled, Typography } from '@mui/material'

export const TableHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',

  padding: '20px 20px 16px 20px',
  width: '100%',
  height: 'auto'
}))

export const RightTextsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',

  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    width: '100%'
  }
}))

export const TableHeaderTitleAndInputs = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '16px'
  }
}))

export const TitleH5 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '133.4%'
})) as typeof Typography

export const TitleH6 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '160%',
  letterSpacing: '0.15px'
})) as typeof Typography

export const Subtitle = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '142.857%',
  letterSpacing: '0.15px'
})) as typeof Typography

export const Subtitle_1 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '175%',
  letterSpacing: '0.15px'
})) as typeof Typography

export const Caption = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '125%',
  letterSpacing: '0.4px'
})) as typeof Typography
