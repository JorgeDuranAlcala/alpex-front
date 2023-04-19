import { styled } from '@mui/material/styles'

const Container = styled('div')({
  height: '100%',
  width: '100%',
  marginTop: '-23px'
})

const ContainerHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '12px 10px',
  width: '100%',
  height: '80px'
})

const Body = styled('div')({
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px 16px 40px',
  gap: '16px',
  width: '100%',
  height: '100%'
})

const Frame = styled('div')({
  // border: '1px solid black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '16px',
  width: '100%',
  height: '393px',
  justifyContent: 'space-between',
  marginBottom: '16px'
})
export { Container, ContainerHeader, Body, Frame }
