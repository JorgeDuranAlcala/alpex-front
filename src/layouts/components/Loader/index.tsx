// ** MUI Import

import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
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
      <div>
        <Lottie options={defaultOptions} />
      </div>
    </div>
  )
}

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'pink',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Loader />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default Spinner
