import { useState } from 'react'

// ** MUI Imports
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import FormHeader from 'src/views/installments/Header/headerInstallment'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const DataSheet = () => {
  // ** Hooks

  // ** Redux

  // ** Hooks header
  const { account: accountDetails, setAccountId } = useGetAccountById()

  const [, setEditInfo] = useState(true)

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        <FormHeader
          isNewAccount
          setEditInfo={setEditInfo}
          accountDetails={accountDetails}
          setAccountId={setAccountId}
          isDataSheet
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment' style={{ fontSize: '24px' }}>
                Information
              </div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='premiumWithoutDiscounts'
                        label='Premium without Discounts'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='netPremiumWithTaxes'
                        label='Net Premium With Taxes'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='netPremium' label='Net Premium' defaultValue='' value='' />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className='title-installment'>Placemnet Structure</div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='controlled-select-label'>Currency</InputLabel>
                      <Select label='Currency'>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='Exchange Rate'
                        label='Exchange Rate'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='Attachment Point'
                        label='Attachment Point'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='Total Values'
                        label='Total Values'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='Limit' label='Limit' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='controlled-select-label'>Type of Limit</InputLabel>
                      <Select label='Type of Limit'>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='SIR' label='SIR' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='grossPremium'
                        label='Gross Premium at 100%'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='reinsuranceBrokeragePercentage'
                        label='Reinsurance Brokerage %'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                </Grid>
              </div>
              <div className='title-installment' style={{ fontSize: '24px', marginBottom: '2%' }}>
                Security
              </div>
              <div className='title-installment'>Everest Re Group LTD</div>
              <div className='wrapper-installments'>
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
                  <Grid item xs={12} md={6} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='premiumPerShare'
                        label='Premium per Share'
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
                        label='Dynamic Commission %'
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
                        label='Dynamic Commission'
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
                      <TextField
                        fullWidth
                        autoFocus
                        name='frontingPercent'
                        label='Fronting Fee %'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='frontingFee' label='Fronting Fee' defaultValue='' value='' />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className='title-installment'>Reinsurer 1</div>
              <div className='wrapper-installments'>
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
                  <Grid item xs={12} md={6} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='premiumPerShare'
                        label='Premium per Share'
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
                        label='Dynamic Commission %'
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
                        label='Dynamic Commission'
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
                      <TextField
                        fullWidth
                        autoFocus
                        name='frontingPercent'
                        label='Fronting Fee %'
                        defaultValue=''
                        value=''
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='frontingFee' label='Fronting Fee' defaultValue='' value='' />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Card>
        </div>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default DataSheet
