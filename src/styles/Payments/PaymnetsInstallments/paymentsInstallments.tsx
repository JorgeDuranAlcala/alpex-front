import { styled } from '@mui/material'

const SubContainerHeaderData = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center'

  // border: '1px solid black'
})

const Frame3486 = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alingItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
})

const ContainerActionsHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
})

const FirstContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '63%',
  justifyContent: 'space-between',
  height: 'auto',
  '@media (max-width: 764px)': {
    width: '100%'
  }
})

const ContainerHeaderMobile = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
  '@media (max-width: 764px)': {
    flexDirection: 'column',
    gap: '15px'
  }
})
const FormHeaderSection = styled('div')({
  marginBottom: '24px',
  gap: '16px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 'auto',
  '@media (max-width: 899px)': {
    flexDirection: 'column'
  },
  '@media (max-width: 764px)': {
    display: 'none'
  }
})

const ContainerAmountLastUpdate = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',
  '@media (max-width: 899px)': {
    alignItems: 'flex-start'
  }
})
const FormHeaderInfoProfileContainer = styled('div')({
  display: 'flex',
  gap: '20px'
})

const SecondContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  gap: '4px',
  justifyContent: 'space-between'
})

const HeaderRowsContainer = styled('div')({
  display: 'flex',
  width: '100%',
  '@media (max-width: 764px)': {
    justifyContent: 'space-between'
  }
})

export {
  ContainerHeaderMobile,
  FormHeaderSection,
  SubContainerHeaderData,
  Frame3486,
  ContainerActionsHeader,
  FirstContainer,
  ContainerAmountLastUpdate,
  FormHeaderInfoProfileContainer,
  SecondContainer,
  HeaderRowsContainer
}
