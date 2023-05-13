import { styled } from '@mui/material/styles'

const GeneralContainerSublimits = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '20px 20px 60px',
  gap: '40px',
  width: '100%',
  height: 'auto'

  // border: '1px solid blue'
})

const ContainerTitleSublimits = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '120px',
  justifyContent: 'space-between'

  // border: '1px solid blue'
})
const InputsContainerSublimits = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '48%',
  gap: '2%'

  // border: '1px solid blue'
})

const CardsFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  height: 'auto',
  border: '1px solid red',
  justifyContent: 'space-between'
})

const NextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  // border: '1px solid red',
  justifyContent: 'flex-end',
  padding: '8px',
  gap: '12px',
  width: '100%',
  height: '58px'
})

// const Grid = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3, 1fr)',

//   // gridTemplateRows: 'repeat(3, 1fr)',
//   width: '100%',
//   border: '1px solid blue'
// })

/****************************************************** Card Sumblimit **************************************/
const ContainerCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
  height: 'auto'

  // border: '1px solid blue'
})

const HeaderCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 10px 8px 26px',
  alingItems: 'center',
  justifyContent: 'center',
  width: '100%',
  background: '#2535A8',
  boxShadow: '0px 4px 8px -4px rgba(76, 78, 100, 0.42)',
  borderRadius: '8px'
})

const ContentCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: 'auto',
  gap: '24px'

  // border: '1px solid red',
})

const SubContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-star'

  // border: '1px solid black'
})

const InputForm = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  borderRadius: '8px',
  border: '1px solid rgba(87, 90, 111, 0.22)',
  height: '58px'
})

export {
  GeneralContainerSublimits,
  ContainerTitleSublimits,
  InputsContainerSublimits,
  CardsFormContainer,
  ContainerCard,
  HeaderCard,
  ContentCard,
  SubContainer,
  NextContainer,
  InputForm
}
