// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'
import { ThemeOptions } from '@mui/material'
import { koHoRegular } from 'src/utils/fotnsExport'

// ** User Theme Options
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Theme Override Imports
import palette from './palette'
import spacing from './spacing'
import shadows from './shadows'
import breakpoints from './breakpoints'

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { skin, mode, direction, themeColor } = settings

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const userFontFamily = userThemeConfig.typography?.fontFamily

  // ** Remove component overrides and typography objects from userThemeOptions
  delete userThemeConfig.components
  delete userThemeConfig.typography

  const koHo = {
    fontFamily: 'KoHo',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('KoHo Regular'),
      local('KoHo-Regular'),
      url(${koHoRegular}) format('truetype')
    `,
    fontWeightBold: 700,
  };

  const mergedThemeConfig = deepmerge(
    {
      direction,
      palette: palette(mode === 'semi-dark' ? 'light' : mode, skin),
      typography: {
        fontFamily:
          userFontFamily ||
          [ 'KoHo',
            'Inter',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(',')
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            "@font-face": [koHo],
          },
        },
      },
      shadows: shadows(mode),
      ...spacing,
      breakpoints: breakpoints(),
      shape: {
        borderRadius: 10
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      }
    },
    userThemeConfig
  )

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette[themeColor]
      }
    }
  })
}

export default themeOptions
