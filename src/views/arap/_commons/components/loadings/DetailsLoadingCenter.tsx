import { Box, CircularProgress } from '@mui/material'

export const DetailsLoadingCenter = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <CircularProgress size={55} />
    </Box>
  )
}
