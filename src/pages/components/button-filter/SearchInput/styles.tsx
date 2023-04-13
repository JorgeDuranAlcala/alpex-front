import { styled } from '@mui/material/styles'

const ContainerSearch = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

const ContainerIcon = styled('div')({
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const Input = styled('input')({
  width: '323px',
  border: 'none',
  height: '32px',
  outline: 'none'
})
export { ContainerSearch, ContainerIcon, Input }
