import { styled } from '@mui/material/styles'

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


