import IconifyIcon from '@/@core/components/icon';
import { Box, Typography, styled } from '@mui/material';

interface VerticalItem {
  title: string;
  date: string;
  amount?: number;
  currency?: string;
  isChecked: boolean;
}

interface VerticalChecksProps {
  items: VerticalItem[];
}

export const VerticalChecks = ({ items }: VerticalChecksProps) => {
  return (

    <BoxContainer>
      {items.map(({ title, date, amount, currency, isChecked }, index) => (
        <VerticalCheckItemContainer key={`${index}_${title}`}>
          <ChecksContainer>
            {isChecked ?
              <IconifyIcon icon="icon-park-solid:check-one" color="#2535a8" />
              :
              <IconifyIcon icon="fluent-emoji-high-contrast:radio-button" color="#2535a8" />
            }
            {index < items.length - 1 ?
              <RowConnector />
              : null}
          </ChecksContainer>
          <TextsContainer>
            <Title variant="body2">{title}</Title>
            <Subtitle variant="body2">{date}</Subtitle>
            {amount ?
              <Subtitle variant="body2">${amount.toLocaleString('en-US', {

                minimumFractionDigits: 2,
              })} {currency}</Subtitle>
              : null}
          </TextsContainer>
        </VerticalCheckItemContainer>
      ))}
    </BoxContainer>
  )
}

const BoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '8px',

  marginTop: '16px',
  minWidth: '150px',
}))

const VerticalCheckItemContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '8px',

}));

const TextsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '4px',
}));

const ChecksContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '8px',
}));

// const CheckedStyled = styled(Box)() => ({
//   backgroundColor: '#2535A8',
//   width: '20px',
//   height: '20px',
//   borderRadius: '50%',
// })

const RowConnector = styled(Box)(() => ({

  backgroundColor: '#2535A8',
  minHeight: '40px',
  minWidth: '3px',

  // transform: 'rotate(90deg)',
  // width: '72px',

  // [`& .${stepConnectorClasses.line}`]: {
  //   borderColor: '#2535A8',
  //   borderWidth: '3px',
  // },
}));

const Title = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '142.857%',
  textWrap: 'nowrap',
  letterSpacing: '0.15px',

  fontFeatureSettings: '"clig" off, "liga" off',
  color: 'rgba(77, 80, 98, 0.87)',
})) as typeof Typography;


const Subtitle = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '125%',
  letterSpacing: '0.4px',

  fontFeatureSettings: '"clig" off, "liga" off',
  color: 'rgba(77, 80, 98, 0.68)',
})) as typeof Typography;
