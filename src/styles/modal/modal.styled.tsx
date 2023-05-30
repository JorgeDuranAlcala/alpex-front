import { styled } from '@mui/material/styles'

const HeaderTitleModal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: '0px',
  paddingRight: '0px',
  gap: '10px',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: '26px'
})


const ButtonClose = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  cursor: 'pointer'
})

export { HeaderTitleModal, ButtonClose }
