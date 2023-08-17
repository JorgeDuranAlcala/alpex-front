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

import { NavGroup, NavLink } from 'src/@core/layouts/types'

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
  let VerticalNavItemsfilter = VerticalNavItems().filter(item => {
    if (ability?.can(item?.action, item.subject)) {
      return item
    }
  }, [])

  VerticalNavItemsfilter = VerticalNavItemsfilter.filter(item => {
    const isNavGroup = (element: any): element is NavGroup => {
      return element && 'children' in element
    }
    const arrayTemp: (NavLink | NavGroup)[] | undefined = []

    const tap = isNavGroup(item)

    if (tap) {
      item.children &&
        item?.children.filter(item2 => {
          if (ability?.can(item2?.action, item2.subject)) {
            const tap2 = isNavGroup(item2)
            const arrayTemp2: (NavLink | NavGroup)[] | undefined = []
            if (tap2) {
              item2.children &&
                item2?.children.filter(item3 => {
                  if (ability?.can(item3?.action, item3.subject)) {
                    arrayTemp2.push(item3)
                  }
                })
              if (item2 != undefined) item2.children = arrayTemp2
            }
            arrayTemp.push(item2)
          }
        })
      if (item != undefined) item.children = arrayTemp
    }

    return item
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
