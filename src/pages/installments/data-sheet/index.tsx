import { useState } from 'react'

// ** MUI Imports
import { TextField } from '@mui/material'
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
              <div className='title-installment'>Information</div>
              <div className='wrapper-installments'>
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
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='netPremium' label='Net Premium' defaultValue='' value='' />
                </div>
              </div>
              <div className='title-installment'>Security</div>
              <div className='wrapper-installments'>
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
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='reinsuranceCompanies'
                    label='Reinsurance Companies'
                    defaultValue=''
                    value=''
                  />
                </div>
              </div>
              <div className='title-installment'>Reinsurer 1</div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='sharePercent' label='Share %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='shareMount' label='Share $' defaultValue='' value='' />
                </div>
              </div>
              <div className='wrapper-installments'>
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
              </div>
              <div className='wrapper-installments'>
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
              </div>
              <div className='wrapper-installments'>
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
              </div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='taxesPercent' label='Taxes %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='taxes' label='Taxes' defaultValue='' value='' />
                </div>
              </div>
              <div className='wrapper-installments'>
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
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='frontingFee' label='Fronting Fee' defaultValue='' value='' />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default DataSheet
