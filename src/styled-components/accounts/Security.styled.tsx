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

export const AddressContainer = styled('div')({
  fontFamily: 'Inter',

  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '20px',
  flexDirection: 'column',

  '.title': {
    fontWeight: '500',
    fontSize: '24px',
    color: '#4D5062DE',
    lineHeight: '32.02px'
  },

  '.subtitle': {
    fontWeight: '400',
    fontSize: '16px',
    color: '#4D5062DE',
    lineHeight: '24px',
    letterSpacing: '.15px',
    margin: '0px',
    marginBottom: '8px'
  }
})

export const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '12px',

  // border: '1px solid red',
  '.containerInputs': {
    display: 'flex',
    width: '100%',
    gap: '20px'
  },

  '@media (max-width:900px)': {
    '.containerInputs': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '12px'
    }
  }
})
export const MapContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',

  // border: '1px solid red',
  '.containerCoordinates': {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  '.inputsCoordinates': {
    display: 'flex',
    gap: '20px'
  },
  '@media (max-width:900px)': {
    '.inputsCoordinates': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%'
    },

    '.containerCoordinates': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }
})
export const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  justifyContent: 'end',
  gap: '20px',

  // border: '1px solid red',
  '@media (max-width:900px)': {
    flexDirection: 'column'
  }
})
