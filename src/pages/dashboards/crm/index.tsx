// ** MUI Imports

// ** MUI Imports
import { Grid, Typography } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import { Container, ContainerHeader } from 'src/styles/Dashboard/dashboard'

import BrokersBalanceStatus from 'src/views/dashboards/crm/BrokersBalanceStatus'

import DowlandAccountInfo from 'src/views/dashboards/crm/DowlandAccountInfo'

// import LongMenu from 'src/views/dashboards/crm/filter'

import LastBoundAccount from 'src/views/dashboards/crm/LastBoundAccount'

import CrmTable from 'src/views/dashboards/crm/Table'

// import CrmTable from 'src/views/dashboards/crm/CrmTable'
const userThemeConfig: any = Object.assign({}, UserThemeOptions())

const inter = userThemeConfig.typography?.fontFamilyInter
const textColor = userThemeConfig.palette?.text.title
const weight = userThemeConfig.typography?.fontWeight.weight500
const textSize = userThemeConfig.typography?.size.px24

const CrmDashboard = () => {
  return (
    <Container>
      <ContainerHeader>
        <Typography variant='h5' sx={{ fontSize: textSize, fontWeight: weight, fontFamily: inter, color: textColor }}>
          Hi Alejandro
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontSize: userThemeConfig.typography?.size.px14,
            fontWeight: userThemeConfig.typography?.fontWeight.weight400,
            fontFamily: inter,
            color: userThemeConfig.palette?.text.subTitle,
            letterSpacing: '0.15px'
          }}
        >
          Welcome to your dashboard!
        </Typography>
      </ContainerHeader>
      <Grid container spacing={{ xs: 2, sm: 2, md: 4 }} sx={{ mb: 4, height: 'auto', border: 1 }}>
        <Grid item xs={12} md={6} sm={6}>
          <BrokersBalanceStatus />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <LastBoundAccount />
        </Grid>
      </Grid>
      <CrmTable />
      <DowlandAccountInfo />
    </Container>
  )
}

export default CrmDashboard
