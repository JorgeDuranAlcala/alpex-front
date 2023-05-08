// ** MUI Import
import { Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Lottie from 'react-lottie'

import LoaderAlpex from './Alpex-loader.json'

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderAlpex,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  )
}

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Loader />
      <Typography
        sx={{
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          letterSpacing: '0.15px',
          color: ' rgba(77, 80, 98, 0.68)'
        }}
      >
        Loading...
      </Typography>
    </Box>
  )
}

export default Spinner
