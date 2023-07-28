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

const ContentModalUpload = styled('div')({
  '.title': {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '32.02px',
    color: '#646776'
  }
})

const FormContainerTxt = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignContent: 'center',

  // alignItems: 'center',
  '.img': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    height: '160px',
    width: '160px',
    border: '1px solid red',
    marginBottom: '12px',
    marginTop: '48px',
    alignSelf: 'center',
    borderRadius: '8px'
  },

  '.txt': {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '.15px',
    color: '#BBBCC3',
    marginBottom: '40px'
  },
  '.btnContainer': {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})

const FormContainerUpload = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignContent: 'center',

  '.drag-container': {
    width: '100%',
    height: '200px',
    border: '1px solid #2535A880',
    borderRadius: '5px',
    margin: '40px auto 20px auto',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  '.drag-box': {
    padding: '20px',
    cursor: 'move',
    color: '#2535A8',
    fontSize: '14px',
    fontWeight: '700px',
    width: '280px',
    letterSpacing: '.4px',
    display: 'flex',
    textAlign: 'center'
  },
  '.fileSubmit': {
    display: 'none'
  },

  '.dragging': {
    backgroundColor: ' #c0c0c0'
  },

  '.dragged-image': {
    maxWidth: '100%',
    maxHeight: '100%'
  },

  '.txt': {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '.15px',
    color: '#7A7B87',
    margin: '0px'
  },
  '.btnContainer': {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
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
  ContentModalUpload,
  FormContainer,
  FormContainerTxt,
  FormContainerUpload,
  HeaderColumns,
  HeaderTitleModal,
  Row
}
