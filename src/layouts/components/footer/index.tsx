// ** MUI Imports
import Box from '@mui/material/Box'

// import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// import useMediaQuery from '@mui/material/useMediaQuery'
// import { Theme } from '@mui/material/styles'

interface Ifooter {
  isLogin: boolean
}

const Footer = ({ isLogin }: Ifooter) => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isLogin ? 'row' : undefined,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: isLogin ? 'center' : 'space-between',
        position: isLogin ? 'absolute' : undefined,
        bottom: isLogin ? '3%' : undefined,
        alignSelf: 'center',
        width: isLogin ? '100%' : undefined,
        zIndex: isLogin ? 100 : undefined
      }}
    >
      {isLogin ? (
        <Typography sx={{ mr: 2 }}>{`© ${new Date().getFullYear()} Una plataforma de Dynamic `}</Typography>
      ) : (
        <Typography sx={{ mr: 2 }}>
          {`© ${new Date().getFullYear()}, Made with `}
          <Box component='span' sx={{ color: 'error.main' }}>
            ❤️
          </Box>
          {` by RocketCode`}
        </Typography>
      )}
      {/* {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://themeforest.net/licenses/standard'>
            License
          </Link>
          <Link target='_blank' href='https://1.envato.market/pixinvent_portfolio'>
            More Themes
          </Link>
          <Link
            target='_blank'
            href='https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation'
          >
            Documentation
          </Link>
          <Link target='_blank' href='https://pixinvent.ticksy.com/'>
            Support
          </Link>
        </Box>
      )} */}
    </Box>
  )
}

export default Footer
