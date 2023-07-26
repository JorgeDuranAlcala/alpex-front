// ** React Imports
import { ReactNode, useContext } from 'react'
import { AbilityContext } from '@/layouts/components/acl/Can'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import HorizontalNavItems from 'src/navigation/horizontal'
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import InactivityDetector from './components/InactivityDetector'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
// import { Box, Typography } from '@mui/material'
// import { Box } from '@mui/material'
import { useSettings } from 'src/@core/hooks/useSettings'
import TokenTimeValidateLayout from './components/TimeValidationJWT'
import Footer from './components/footer'

interface Props {
  children: ReactNode
  contentHeightFixed?: boolean
}

// const NavHeader = () => {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 3 }}>
//       <img src='/images/logos/LogoAlpex.svg' alt='logo' width='35.66' height='40' />
//       <img src='/images/logos/Alpex.svg' alt='logo' width='51.72' height='17.84' />
//     </Box>
//   )
// }

const UserLayout = ({ children, contentHeightFixed }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  const ability = useContext(AbilityContext)
  const VerticalNavItemsfilter = VerticalNavItems().filter(item => {
    if (ability?.can('read', item.subject)) {
      return item
    }
  }, [])

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItemsfilter,
          componentProps: {
            sx: { '& .nav-header': { backgroundColor: '#fff' } }
          }

          // branding: () => <NavHeader />

          // branding: () => <AppBrand />

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
      footerProps={{
        content: () => <Footer isLogin={false} />
      }}
    >
      <TokenTimeValidateLayout />
      <InactivityDetector />
      {children}
    </Layout>
  )
}

export default UserLayout