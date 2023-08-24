import { Box, Button, Typography, styled } from '@mui/material';
import Link from 'next/link';

interface CardDetailProps {
  title: string;
  amount: number;
  currency: string;
  footerDescription: string;
  href: string;
}

export const CardDetail = ({ title, amount, currency, footerDescription, href }: CardDetailProps) => {
  return (
    <CardDetailContainer>
      <TitleContainer>
        <TitleText>{title}</TitleText>
        <Link href={href}>
          <Button color="primary" variant="text">DETAILS</Button>
        </Link>
      </TitleContainer>
      <AmountText>$ {amount} {currency}</AmountText>
      <FooterDescriptionText>{footerDescription}</FooterDescriptionText>
    </CardDetailContainer>
  )
}



const CardDetailContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  backgroundColor: '#F7F7F9',
  borderRadius: '4px',
  padding: '16px 16px',
  width: '100%',
  maxWidth: '304px',
}));

const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TitleText = styled(Typography)(() => ({
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '125%',
  letterSpacing: '0.4px',
  color: 'rgba(77, 80, 98, 0.87)',

  fontFeatureSettings: '"clig" off, "liga" off',
})) as typeof Typography;


const AmountText = styled(Typography)(() => ({
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '160%',
  letterSpacing: '0.15px',
  color: 'rgba(77, 80, 98, 0.87)',

  fontFeatureSettings: '"clig" off, "liga" off',
})) as typeof Typography;


const FooterDescriptionText = styled(Typography)(() => ({
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '125%',
  letterSpacing: '0.15px',
  color: 'rgba(77, 80, 98, 0.68)',

  fontFeatureSettings: '"clig" off, "liga" off',
})) as typeof Typography;
