import { Typography, styled } from '@mui/material'

const TitleContract = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '20px',
  letterSpacing: '0.15px',
  color: '#4D5062DE',
  marginLeft: '8px'
}))

const TitleInputs = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '0.15px',
  color: '#4D5062DE'
}))

const ContainerInputs = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  height: 'auto',
  width: '100%'

  // border: '1px solid black'
})

const ContainerInstallments = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  height: 'auto',
  width: '100%',
  alignItems: 'center'
})

export { ContainerInputs, ContainerInstallments, TitleContract, TitleInputs }
