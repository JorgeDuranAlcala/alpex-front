import { styled } from '@mui/material/styles'

const GeneralContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '20px 20px 60px',
  gap: '40px',
  width: '100%',
  height: '544px'

  // border: '1px solid blue'
})

const TitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '35px',
  width: '100%',
  height: 'auto'
})

const InputsContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'auto'
})
const InstallmentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  height: '70%',
  justifyContent: 'space-between'
})

const NextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  anim: 'center',
  padding: '8px 0px',
  width: '100%',
  height: '58px'
})

/********************************************** Card Installment****************************************************/

const ContainerCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  height: '304px'
})

const ContainerCardInputs = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '87%',
  justifyContent: 'space-between'
})

export {
  GeneralContainer,
  NextContainer,
  TitleContainer,
  InstallmentContainer,
  InputsContainer,
  ContainerCard,
  ContainerCardInputs
}
