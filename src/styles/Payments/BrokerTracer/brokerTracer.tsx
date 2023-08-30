import { styled } from '@mui/material'

const SubContainerAccountBalanceData = styled('div')({
  flexGrow: 1,
  padding: '0px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 991px)': {
    flexDirection: 'column',
    gap: '20px'
  }
})

const SubContainerInstallments = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '60%',
  height: 'auto',
  '@media (max-width: 991px)': {
    width: '100%'
  }
})

const ContainerSelectNameBroker = styled('div')({
  width: '25%',
  '@media (max-width: 991px)': {
    width: '100%'
  }
})

export { SubContainerAccountBalanceData, SubContainerInstallments, ContainerSelectNameBroker }
