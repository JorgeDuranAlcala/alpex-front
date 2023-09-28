// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'

// ** Store Imports
import { Provider } from 'react-redux'
import { store } from 'src/store'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import { defaultACLObj } from 'src/configs/acl'
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import AclGuard from 'src/@core/components/auth/AclGuard'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import WindowWrapper from 'src/@core/components/window-wrapper'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import UserLayout from 'src/layouts/UserLayout'

// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'
import Loader from 'src/layouts/components/Loader'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { AuthProvider } from 'src/context/AuthContext'
import CataloguesClaimsContextProvider from 'src/context/catalogues-claims/reducer'
import DynamicContextProvider from 'src/context/dynamic/reducer'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

import { IS_DEMO } from 'src/utils/isDemo'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-tomorrow.css'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import 'src/styles/accounts.css'
import 'src/styles/catalogues.css'
import 'src/styles/dynamic-data.css'
import 'src/styles/installments.css'
import '../../styles/forgottenpassword.css'
import '../../styles/globals.css'
import '../../styles/login.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Loader />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Loader />}>{children}</AuthGuard>
  }
}
export const loadHotjar = (): void => {
  ;(function (h: any, o: any, t: any, j: any, a: any, r: any) {
    h.hj =
      h.hj ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        ;(h.hj.q = h.hj.q || []).push(arguments)
      }
    h._hjSettings = { hjid: 3525272, hjsv: 6 }
    a = o.getElementsByTagName('head')[0]
    r = o.createElement('script')
    r.async = 1
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
    a.appendChild(r)
  })(
    window,
    document,
    'https://static.hotjar.com/c/hotjar-',
    '.js?sv=',
    document.head,
    document.createElement('script')
  )
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj
  useEffect(() => {
    loadHotjar()
  }, [])

  return (
    <Provider store={store}>
        <CataloguesClaimsContextProvider>
          <DynamicContextProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <title>{`${(themeConfig.templateName === "Alpex" && !IS_DEMO) ? themeConfig.templateName : ""  } - ${!IS_DEMO ? "Dynamic Re |" : ""} Your Underwriting Powerhouse`}</title>
                <meta
                  name='description'
                  content={`${themeConfig.templateName} We provide property facultative and treaty reinsurance to brokers and insurance companies operating in Latin America and the Caribbean`}
                />
                <meta name='image' content='https://dynamicreinsurance.com/images/MexicoCity.jpg' />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
              </Head>

              <AuthProvider>
                <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                  <SettingsConsumer>
                    {({ settings }) => {
                      return (
                        <ThemeComponent settings={settings}>
                          <WindowWrapper>
                            <Guard authGuard={authGuard} guestGuard={guestGuard}>
                              <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                                {getLayout(<Component {...pageProps} />)}
                              </AclGuard>
                            </Guard>
                          </WindowWrapper>
                          <ReactHotToast>
                            <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                          </ReactHotToast>
                        </ThemeComponent>
                      )
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              </AuthProvider>
            </CacheProvider>
        </DynamicContextProvider>
      </CataloguesClaimsContextProvider>
    </Provider>
  )
}

export default App
