import { styled } from '@mui/material/styles'

const HeaderTitle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px 20px 0px',
  width: '100%',
  height: '73px'
})

const ContainerTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '53px'
})

const ContainerFrame = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '200px',
  paddingLeft: '20px',
  paddingRight: '25px',
  justifyContent: 'space-between'
})

const ContainerCircularProgress = styled('div')({
  display: 'flex',
  width: '200px',
  height: '200px',
  justifyContent: 'center',
  alignItems: 'center'
})

const ContainerPayments = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'flex-end',
  width: '54%',
  height: '50%',
  justifyContent: 'space-between'
})

const ContainerAccounts = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '24px'
})

const ContentTextAccounts = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '75%',
  height: '100%',
  alignItems: 'center',
  gap: '10px',
  marginRight: '10%'

  // border: '1px solid black'
})
const ContainerTotal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 'auto',
  height: '19px',
  gap: '12%'
})
export {
  HeaderTitle,
  ContainerTitle,
  ContainerFrame,
  ContainerCircularProgress,
  ContainerPayments,
  ContainerAccounts,
  ContainerTotal,
  ContentTextAccounts
}
