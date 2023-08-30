import { styled } from '@mui/material'

const SubContainerReinsurerPaymenData = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const ContainerTotalBalance = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '7%'
})

const FormHeaderMoneyData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',
  '@media (max-width: 599px)': {
    alignItems: 'flex-start'
  }
})

export { SubContainerReinsurerPaymenData, ContainerTotalBalance, FormHeaderMoneyData }

// '@media (max-width: 991px)': {
//   flexDirection: 'column',
//   gap: '20px'
// }
