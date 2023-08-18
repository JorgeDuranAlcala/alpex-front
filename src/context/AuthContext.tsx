// ** React Imports
import { ReactNode, createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** JWT import
import jwt from 'jsonwebtoken'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import AuthServices from 'src/services/auth/auth.service'
import { AuthValuesType, ErrCallbackType, LoginParams, RegisterParams, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const authServices = new AuthServices()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        authServices
          .authMe()
          .then(async response => {
            setLoading(false)
            const resUser = response.data.userData

            const newUserData = {
              acl: resUser.acl,
              email: resUser.email,
              fullName: resUser.name,
              id: resUser.id,
              role: resUser.roles[0].role,
              username: resUser.username,
              password: ''
            }

            setUser({ ...newUserData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })

        // await axios
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const authServices = new AuthServices()

    authServices
      .login(params)
      .then(async response => {
        if (!response.data.success) {
          if (errorCallback) errorCallback(response.data.message)
        } else {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)

          if (params.rememberMe) {
            window.localStorage.setItem('loginEmail', params.email)
          } else {
            window.localStorage.removeItem('loginEmail')
          }

          const returnUrl = router.query.returnUrl

          const tokenDecoded = jwt.decode(response.data.token, { complete: true })

          // @ts-ignore
          const { email, name, id, roles, username, acl } = tokenDecoded.payload

          const newUserData = {
            acl: acl,
            email: email,
            fullName: name,
            id: id,
            role: roles[0].role,
            username: username,
            password: ''
          }

          setUser({ ...newUserData })

          window.localStorage.setItem('userData', JSON.stringify(newUserData))

          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

          router.replace(redirectURL as string)
        }
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl

    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //     console.log(err)
    //   })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
