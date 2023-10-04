// ** MUI Import
import { SxProps, Theme, Typography } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import Lottie from 'react-lottie'
import LoaderAlpex from './Alpex-loader.json'

import { IS_DEMO } from 'src/utils/isDemo'

interface IPropsLoader {
  width: string
  height: string
  sx?: SxProps<Theme>
}

// width: '59.31px', height: '66.52px'

const Loader: React.FC<IPropsLoader> = props => {
  const { width, height } = props
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoaderAlpex,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div style={{ width: width, height: height }}>
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
      {!IS_DEMO && <Loader width={'59.31px'} height={'66.52px'} /> }
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
