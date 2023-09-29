// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

import { IS_DEMO } from 'src/utils/isDemo'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(4),
  justifyContent: 'space-between',
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: 1.2,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { mode, direction, navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const product = userThemeConfig.typography?.fontFamilyProduct
  const colorLogo = userThemeConfig.palette?.buttonText.primary
  const svgFillSecondary = () => {
    if (mode === 'semi-dark') {
      return `rgba(${theme.palette.customColors.dark}, 0.6)`
    } else {
      return theme.palette.text.secondary
    }
  }
  const svgFillDisabled = () => {
    if (mode === 'semi-dark') {
      return `rgba(${theme.palette.customColors.dark}, 0.38)`
    } else {
      return theme.palette.text.disabled
    }
  }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 40) / 8
      }
    } else {
      return 5.5
    }
  }

  const svgRotationDeg = () => {
    if (navCollapsed) {
      if (direction === 'rtl') {
        if (navHover) {
          return 0
        } else {
          return 180
        }
      } else {
        if (navHover) {
          return 180
        } else {
          return 0
        }
      }
    } else {
      if (direction === 'rtl') {
        return 180
      } else {
        return 0
      }
    }
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <StyledLink href='/'>

    {  !IS_DEMO && <svg width='36' height='40' viewBox='0 0 36 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M35.6628 40L30.0405 30.0573C27.9671 32.1379 25.3849 33.7074 22.499 34.573L25.5682 40H35.6628Z'
              fill='#2535A8'
            />
            <path
              d='M17.853 8.5107L17.8313 8.47212L17.812 8.50829L12.7852 17.3975L17.8385 26.3324C21.0571 26.1613 23.8225 24.2831 25.2498 21.5877L17.853 8.5107Z'
              fill='#2535A8'
            />
            <path d='M9.88732 39.9999H0L7.45708 26.8145H17.342L9.88732 39.9999Z' fill='#8FADED' />
            <path
              d='M33.0881 24.9027C33.0929 24.8955 33.0953 24.8858 33.1002 24.8786C33.2111 24.6447 33.3172 24.406 33.4184 24.1674C33.4256 24.1505 33.4353 24.1312 33.4425 24.1143C33.539 23.8804 33.6306 23.6466 33.7174 23.4079C33.727 23.3814 33.7367 23.3573 33.7463 23.3308C33.8283 23.1041 33.903 22.8775 33.9753 22.646C33.9874 22.6075 34.0019 22.5689 34.0139 22.5303C34.0814 22.3109 34.1417 22.0891 34.1996 21.8673C34.214 21.8167 34.2285 21.7636 34.243 21.713C34.296 21.5008 34.3442 21.2863 34.39 21.0693C34.4045 21.0066 34.4214 20.9439 34.4334 20.8788C34.4768 20.6691 34.5106 20.4569 34.5443 20.2447C34.5564 20.1724 34.5708 20.1025 34.5829 20.0326C34.6142 19.8301 34.6359 19.6251 34.6601 19.4202C34.6697 19.3382 34.6818 19.2562 34.6914 19.1719C34.7131 18.9669 34.7252 18.7596 34.7372 18.5498C34.742 18.4655 34.7517 18.3835 34.7565 18.2991C34.771 18.0074 34.7782 17.7132 34.7782 17.4167C34.7782 7.9706 27.2223 0.255561 17.8364 0V8.02364C22.8006 8.27679 26.7618 12.3923 26.7618 17.4191C26.7618 17.6096 26.7545 17.8 26.7425 17.9857C26.7401 18.0387 26.7353 18.0918 26.7304 18.1448C26.7184 18.2895 26.7039 18.4341 26.687 18.5764C26.6822 18.6222 26.675 18.6704 26.6702 18.7162C26.6171 19.0923 26.5424 19.4612 26.4483 19.8204C26.4387 19.8566 26.4291 19.8903 26.4194 19.9265C26.376 20.0856 26.3278 20.2447 26.2748 20.4015C26.2675 20.4231 26.2603 20.4424 26.2555 20.4641C26.1301 20.8282 25.983 21.185 25.8143 21.5274C25.807 21.5442 25.7974 21.5611 25.7902 21.578C25.7058 21.7468 25.619 21.9131 25.525 22.0771C25.3393 22.4025 25.1344 22.7136 24.9126 23.0125C24.9053 23.0222 24.8957 23.0342 24.8885 23.0438C24.7848 23.1837 24.6763 23.3187 24.5654 23.4513C24.5582 23.4609 24.5509 23.4682 24.5437 23.4778C24.1869 23.9021 23.7915 24.2927 23.3672 24.6471C23.3575 24.6544 23.3479 24.664 23.3382 24.6712C22.9091 25.0256 22.4462 25.3439 21.9592 25.6187C21.9543 25.6212 21.9519 25.6236 21.9471 25.626C20.7923 26.2745 19.4879 26.6868 18.0992 26.7953C18.0124 26.8025 17.9256 26.8098 17.8364 26.8146V34.8382C19.717 34.7876 21.5228 34.4308 23.208 33.828C23.2731 33.8039 23.3382 33.7822 23.4033 33.7581C23.548 33.7051 23.6926 33.6496 23.8373 33.5918C23.8662 33.5797 23.8952 33.5676 23.9241 33.5556C24.1965 33.4447 24.4665 33.3241 24.7342 33.2012C24.8113 33.165 24.8861 33.1288 24.9608 33.0927C25.0886 33.03 25.2139 32.9673 25.3393 32.9022C25.4285 32.8564 25.5177 32.8058 25.6069 32.7576C25.795 32.6563 25.9806 32.5526 26.1639 32.4441C26.2579 32.3887 26.3495 32.3332 26.4411 32.2778C26.5472 32.2127 26.6509 32.1476 26.757 32.0801C26.8968 31.9909 27.0366 31.8969 27.174 31.8028C27.2874 31.7257 27.3983 31.6461 27.5092 31.5666C27.6177 31.4894 27.7262 31.4098 27.8322 31.3279C27.9166 31.2628 28.0034 31.2001 28.0878 31.1326C28.2517 31.0048 28.4109 30.8746 28.57 30.742C28.6375 30.6841 28.705 30.6239 28.7725 30.566C28.8882 30.4647 29.0015 30.3635 29.1149 30.2622C29.1872 30.1971 29.2571 30.132 29.327 30.0645C29.4837 29.9175 29.6356 29.768 29.7875 29.6137C31.1328 28.2443 32.2515 26.653 33.0881 24.9027Z'
              fill='#2D67EB'
            />
          </svg>
        }

          <HeaderTitle variant='h6' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2 }) }}>
            {/* {themeConfig.templateName} */}
            <Typography
              sx={{ fontFamily: product, color: colorLogo, fontSize: '20px', fontWeight: 700, letterSpacing: -0.8 }}
            >
              {!IS_DEMO ? "Alpex" : ""}
            </Typography>
          </HeaderTitle>
        </StyledLink>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, backgroundColor: 'transparent !important' }}
        >
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent !important' }}
        >
          {userMenuLockedIcon && userMenuUnlockedIcon ? (
            navCollapsed ? (
              userMenuUnlockedIcon
            ) : (
              userMenuLockedIcon
            )
          ) : (
            <Box
              width={22}
              fill='none'
              height={22}
              component='svg'
              viewBox='0 0 22 22'
              xmlns='http://www.w3.org/2000/svg'
              sx={{
                transform: `rotate(${svgRotationDeg()}deg)`,
                transition: 'transform .25s ease-in-out .35s'
              }}
            >
              <path
                fill={svgFillSecondary()}
                d='M11.4854 4.88844C11.0082 4.41121 10.2344 4.41121 9.75716 4.88844L4.51029 10.1353C4.03299 10.6126 4.03299 11.3865 4.51029 11.8638L9.75716 17.1107C10.2344 17.5879 11.0082 17.5879 11.4854 17.1107C11.9626 16.6334 11.9626 15.8597 11.4854 15.3824L7.96674 11.8638C7.48943 11.3865 7.48943 10.6126 7.96674 10.1353L11.4854 6.61667C11.9626 6.13943 11.9626 5.36568 11.4854 4.88844Z'
              />
              <path
                fill={svgFillDisabled()}
                d='M15.8683 4.88844L10.6214 10.1353C10.1441 10.6126 10.1441 11.3865 10.6214 11.8638L15.8683 17.1107C16.3455 17.5879 17.1193 17.5879 17.5965 17.1107C18.0737 16.6334 18.0737 15.8597 17.5965 15.3824L14.0779 11.8638C13.6005 11.3865 13.6005 10.6126 14.0779 10.1353L17.5965 6.61667C18.0737 6.13943 18.0737 5.36568 17.5965 4.88844C17.1193 4.41121 16.3455 4.41121 15.8683 4.88844Z'
              />
            </Box>
          )}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
