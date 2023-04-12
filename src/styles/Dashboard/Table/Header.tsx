import { styled } from '@mui/material/styles'

const ContainerHeader = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  padding: '20px 20px 16px',
  gap: '16px',
  height: '68',
  width: '100%',
  borderRadius: '6px'
})

const ContainerTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',

  // paddingRight: '400px',
  width: '49%',
  height: '100%'
})

const ContainerFilters = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingLeft: '160px',
  width: '49%',
  height: '100%'
})
export { ContainerHeader, ContainerTitle, ContainerFilters }
