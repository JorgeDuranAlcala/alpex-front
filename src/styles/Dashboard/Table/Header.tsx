import { styled } from '@mui/material/styles'

const ContainerHeader = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  padding: '20px 20px 16px',

  height: 'auto',
  width: '100%',
  borderRadius: '6px'
})

const ContainerTitle = styled('div')({
  width: 'auto',
  height: 'auto'
})

const ContainerAmounts = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  justifyContent: 'start',
  gap: '7%'
})
const ContainerFilters = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingLeft: '160px',
  width: '49%',
  height: '100%'
})
export { ContainerHeader, ContainerTitle, ContainerAmounts, ContainerFilters }
