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

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: '28px',
  width: '100%',
  height: '316px'
})

const ContainerData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '100%'
})

const HeaderColumns = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  height: '22.5%'
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '50%',
  height: '100%',
  backgroundColor: 'rgba(13, 86, 123, 0.05)'
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '25%'
})

const ColumnLabel = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px',
  width: '50%',
  height: '100%'
})
const ColumnData = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px 8px 0px',
  width: '50%',
  height: '100%'
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
const ContentEndorsmentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fontFamily: 'Inter',
  '.title': {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '32px',
    letterSpacing: '.15px',
    color: '#4D5062DE',
    marginBottom: '8px'
  },
  '.subtitle': {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '.15px',
    color: '#4D5062AD',
    marginBottom: '16px'
  }
})
const ContentEndorsmentContainerCancel = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fontFamily: 'Inter',
  '.title': {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '32px',
    letterSpacing: '.15px',
    color: '#4D5062DE',
    marginBottom: '8px'
  },
  '.subtitle': {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '.15px',
    color: '#4D5062AD',
    marginBottom: '16px'
  }
})

const FormContainer = styled('div')({
  '.MuiFormControlLabel-label': {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '.15px',
    color: '#4D5062DE',
    marginLeft: '6px'
  }
})

export {
  ButtonClose,
  Column,
  ColumnData,
  ColumnLabel,
  Container,
  ContainerData,
  ContentEndorsmentContainer,
  ContentEndorsmentContainerCancel,
  FormContainer,
  HeaderColumns,
  HeaderTitleModal,
  Row
}
