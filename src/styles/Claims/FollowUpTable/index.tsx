import { Box, Typography, styled } from '@mui/material/'

const TableHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '20px 20px 16px 20px',
  width: '100%',
  height: 'auto'
}))

const Title = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '133.4%'
})) as typeof Typography

export { TableHeaderContainer, Title }
