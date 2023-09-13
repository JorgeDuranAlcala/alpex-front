import { Box, styled } from '@mui/material'

export const FormDetailsContainer = styled(Box)(() => ({
  // backgroundColor: 'lightcoral',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',

  marginLeft: '44px',

  position: 'relative'
}))

export const FormDetailsRowContainer = styled(Box)(() => ({
  backgroundColor: 'lightblue',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '20px'
}))

export const ColumnInputsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px'
}))
