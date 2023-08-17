// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react'

// ** Next
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Styled Component Import
import BasicInfo from '@/views/dynamic-data/property-listing/property-details/BasicInfo'
import ConstructionDetail from '@/views/dynamic-data/property-listing/property-details/ConstructionDetails'
import Location from '@/views/dynamic-data/property-listing/property-details/Location'
import PropertyHeader from '@/views/dynamic-data/property-listing/property-details/PropertyHeader'

// ** Import services
import PropertiesServices from '@/services/dynamic-data/properties.mock-service'

const DynamicDataDashboard = () => {
  // Hooks
  const router = useRouter()


  const setDataInformation = async (id: string) => {
    const data = await PropertiesServices.getPropertyById(id)

    if (!data) return

    console.log(data)
  }

  useEffect(() => {

    if (router.query.idProperty) {
      setDataInformation(String(router.query.idProperty))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.idProperty]);

  return (
    <Container>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} >
            <PropertyHeader />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <BasicInfo />
                  </Grid>
                  <Grid item xs={12}>
                    <ConstructionDetail />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Location />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  )
}

export default DynamicDataDashboard
