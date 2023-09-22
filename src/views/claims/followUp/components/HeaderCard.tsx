import { Card, Typography, styled } from '@mui/material';
import { ReactNode } from 'react';

interface HeaderCardProps {
  children: ReactNode
}

export const HeaderCard = ({ children }: HeaderCardProps) => {
  return (
    <CardStyled >
      <Title component="h1">ARAP</Title>
      {children}
    </CardStyled>
  )
}


const CardStyled = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  padding: '20px',

}));

const Title = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '133.4%',

  color: 'rgba(77, 80, 98, 0.87)',

  fontFeatureSettings: '"clig" off, "liga" off',
})) as typeof Typography;
