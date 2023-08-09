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

const DynamicDataDashboard = () => {

  const[hurricaneDetails, setHurricaneDetails] = useState(false)
  const[earthquakeDetails, setEarthquakeDetails] = useState(false)

  useEffect(() => {
    setHurricaneDetails(true)
    setEarthquakeDetails(true)
  }, [])

  return (
    <Container>
      <ApexChartWrapper>

        <Grid container spacing={6} className='match-height'>
        { hurricaneDetails &&

        <Grid item xs={12}>
          <HurricaneDetails />
        </Grid>
      }
      { earthquakeDetails &&
        <Grid item xs={12}>
          <EarthquakeDetails />
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
                <PropertiesMap />
              </Grid>
              <Grid item xs={12}>
                <PriorityProperties/>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </ApexChartWrapper>

    </Container>
  )
}

export default DynamicDataDashboard
