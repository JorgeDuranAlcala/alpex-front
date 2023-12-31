// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
// import Spinner from 'src/@core/components/spinner'
import Loader from 'src/layouts/components/Loader'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
 export const getHomeRoute = (role: string) => {
  if (role === 'Lead underwriter') {return '/dashboards/crm'}
  else if (role === 'Underwriter') {{return '/dashboards/crm'}}
  else if (role === 'Technical assistant') {{return '/dashboards/crm'}}
  else if (role === 'Suscriptor') {{return '/dynamic-data/dashboard/'}}
  else if (role === 'Reasegurador') {{return '/dynamic-data/dashboard/'}}
  else if (role === 'Asegurado') {{return '/dynamic-data/dashboard/'}}
  else if (role === 'Asegurador') {{return '/dynamic-data/dashboard/'}}
  else if (role === 'Técnico') {{return '/dynamic-data/dashboard/'}}
  else return '/dashboards/crm'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Loader sx={{ height: '100%' }} />
}

export default Home
