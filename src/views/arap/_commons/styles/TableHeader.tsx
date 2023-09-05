import { Box, styled, Typography } from "@mui/material";

export const TableHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',

  padding: '20px 20px 16px 20px',
  width: '100%',
  height: 'auto'
}));

export const RightTextsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',
}))

export const TitleH5 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '133.4%',
})) as typeof Typography;

export const TitleH6 = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '160%',
  letterSpacing: '0.15px',
})) as typeof Typography;

export const Subtitle = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '142.857%',
  letterSpacing: '0.15px',
})) as typeof Typography;

export const Caption = styled(Typography)(() => ({
  fontFeatureSettings: '"clig" off, "liga" off',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '125%',
  letterSpacing: '0.4px',
})) as typeof Typography;

