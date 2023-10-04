import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'

import { IS_DEMO } from 'src/utils/isDemo'

interface ReinsurerInfo {
  margin?: number
}

export default function ReinsurerInfo({}: any) {
  return (
    <div>
      <div className='wrapper-installments'>
        <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
          <Grid item xs={12} md={6} sm={6}>
            <div className='width-full'>
              <TextField
                fullWidth
                autoFocus
                name='grossPremium'
                label='Gross Premium per Share'
                defaultValue=''
                value=''
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='sharePercent' label='Share %' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='shareMount' label='Share $' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='netPremium' label='Net Premium' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='netPremiumTaxes'
              label='Net Premium with Taxes'
              defaultValue=''
              value=''
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='reinsurancePercent'
              label='Reinsurance Brokerage %'
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='reinsuranceBrokerage'
              label='Reinsurance Brokerage'
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='dynamicPercent'
              label={`${!IS_DEMO ? "Dynamic" : ""} Commission %`}
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='dynamicCommission'
              label={`${!IS_DEMO ? "Dynamic" : ""} Commission`}
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='taxesPercent' label='Taxes %' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='taxes' label='Taxes' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='frontingPercent' label='Fronting Fee %' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='frontingFee' label='Fronting Fee' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='discountPercet' label='Discount %' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField fullWidth autoFocus name='discount' label='Discount' defaultValue='' value='' />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='brokerFrontingFeePercent'
              label='Broker Fronting Fee %'
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='brokerFrontingFee'
              label='Broker Fronting Fee'
              defaultValue=''
              value=''
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
