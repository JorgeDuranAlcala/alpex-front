import { styled } from '@mui/material/styles'

const HeaderTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '12px 24px 12px 0px',
  width: '100%',
  height: '80px',
  gap: '4px'
})

const ContainerSelectDowland = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '54%',
  height: '42px',
  gap: '12px'
})

export { HeaderTitle, ContainerSelectDowland }
