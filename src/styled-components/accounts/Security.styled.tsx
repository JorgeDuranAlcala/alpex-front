import { styled } from '@mui/material/styles'

export const Container = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  marginTop: '-23px'
})
export const GroupInputs = styled('div')({
  height: '100%',
  width: '100%',
  border: '1px solid black',
  justifyContent: 'space-between'
})
export const Title = styled('div')({
  fontSize: '24px',
  color: 'rgba(68, 72, 84, 0.87)',
  fontWeight: 600
})

export const ContainerMobileBound = styled('div')({
  display: 'none',
  '@media (max-width:900px)': {
    display: 'flex',
    flexDirection: 'Column',
    width: '100%',
    marginBottom: '20px',
    fontFamily: 'Inter'
  },

  '.title': {
    color: '#4D5062DE',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '.15px'
  },

  '.idNumber': {
    color: '#4455CB',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '32px',
    letterSpacing: '.15px',
    marginBottom: '12px'
  },
  '.subtitle': {
    color: '#4D5062AD',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '15px',
    letterSpacing: '.4px'
  },
  '.moneySubtitle': {
    color: '#4D5062DE',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '32px',
    letterSpacing: '.15px',
    marginBottom: '20px'
  },
  '.reception': {
    color: '#4D5062DE',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    letterSpacing: '.15px',
    marginBottom: '12px'
  }
})
