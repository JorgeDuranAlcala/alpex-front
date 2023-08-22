import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import { Container } from 'src/styles/Dashboard/dashboard';

// ** Styled Component Import
import EarthquakeDetails from '@/views/dynamic-data/dashboard/EarthquakeDetails';
import HurricaneDetails from '@/views/dynamic-data/dashboard/HurricaneDetails';
import InvestmentPerState from '@/views/dynamic-data/dashboard/InvestmentPerState';
import PriorityProperties from '@/views/dynamic-data/dashboard/PriorityProperties';
import PropertiesMap from '@/views/dynamic-data/dashboard/PropertiesMap';
import ProportionInvestment from '@/views/dynamic-data/dashboard/ProportionInvestment';
import SalesThisMonth from '@/views/dynamic-data/dashboard/SalesThisMonth';
import TotalInvestment from '@/views/dynamic-data/dashboard/TotalInvestment';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

//**Dto imports */
import { IEarthquakeDetailDto } from '@/services/dynamic-data/dtos/dashboard.dto';
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto';

const DynamicDataDashboard = () => {

  // const[hurricaneDetails, setHurricaneDetails] = useState(false)
  const [earthquakeDetected, setEarthquakeDetected] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [earthquakeDetail, setEarthquakeDetail] = useState<IEarthquakeDetailDto>({
    magnitud: ' ',
    depht: ' ',
    epicenter: ' ',
    coordinates: ' ',
    dateTime: ' '
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [earthquakeProperties, setEarthquakeProperties] = useState<IProperty[]>([{
    crestZone: '',
    institution: '',
    keyDepe: '',
    latitude: '',
    longitude: '',
    province: '',
    state: '',
    valfisValue: '',
  }])


  useEffect(() => {
    setEarthquakeDetected(true)
  }, [])

  return (
    <Container>
      <ApexChartWrapper>

        <Grid container spacing={6} className='match-height'>
          {false &&
            <Grid item xs={12}>
              <HurricaneDetails />
            </Grid>
          }
          {earthquakeDetected &&
            <Grid item xs={12}>
              <EarthquakeDetails
                earthquakeData={earthquakeDetail}
                earthquakeDetected={earthquakeDetected}
              />
            </Grid>
          }
          <Grid item xs={12} md={4}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TotalInvestment />
              </Grid>
              <Grid item xs={12}>
                <ProportionInvestment />
              </Grid>
              <Grid item xs={12}>
                <SalesThisMonth />
              </Grid>
              <Grid item xs={12}>
                <InvestmentPerState />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <PropertiesMap
                  earthquakeProperties={earthquakeProperties}
                  earthquakeDetected={earthquakeDetected}
                />
              </Grid>
              <Grid item xs={12}>
                <PriorityProperties
                  earthquakeProperties={earthquakeProperties}
                  earthquakeDetected={earthquakeDetected}
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </ApexChartWrapper>

    </Container>
  )
}

DynamicDataDashboard.acl = {
  action: 'viewDashboardData',
  subject: 'dynamicData'
}

export default DynamicDataDashboard
