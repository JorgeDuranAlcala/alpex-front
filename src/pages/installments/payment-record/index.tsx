import { useState } from 'react'

// ** MUI Imports
import { TextField } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import FormHeader from 'src/views/installments/Header/headerInstallment'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'
import StatusSelect from 'src/views/custom/select/StatusSelect'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const PaymentRecord = () => {
  // ** Hooks

  // ** Redux

  // ** Hooks header
  const { account: accountDetails, setAccountId } = useGetAccountById()

  const [, setEditInfo] = useState(true)
  const [, setStatus] = useState('')

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        <FormHeader
          isNewAccount
          setEditInfo={setEditInfo}
          accountDetails={accountDetails}
          setAccountId={setAccountId}
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Record Installment Payment</div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='ammount' label='Ammount' defaultValue='' value='$100,000' />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='currentInstallment'
                    label='Current Installment'
                    defaultValue=''
                    value='$100,000'
                  />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='typeOfPayment'
                    label='Type Of Payment'
                    defaultValue=''
                    value='$100,000'
                  />
                </div>
              </div>
              <div className='title-installment'>Distribute balance</div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='installment1' label='Installment' defaultValue='' value='1' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='balance1' label='Balance %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='balanceAmmount1'
                    label='Balance ammount'
                    defaultValue=''
                    value=''
                  />
                </div>
              </div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='installment2' label='Installment' defaultValue='' value='2' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='balance2' label='Balance %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='balanceAmmount2'
                    label='Balance ammount'
                    defaultValue=''
                    value=''
                  />
                </div>
              </div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='installment3' label='Installment' defaultValue='' value='3' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='balance3' label='Balance %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='balanceAmmount3'
                    label='Balance ammount'
                    defaultValue=''
                    value=''
                  />
                </div>
              </div>
              <div className='wrapper-installments'>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='installment4' label='Installment' defaultValue='' value='4' />
                </div>
                <div className='width-full'>
                  <TextField fullWidth autoFocus name='balance4' label='Balance %' defaultValue='' value='' />
                </div>
                <div className='width-full'>
                  <TextField
                    fullWidth
                    autoFocus
                    name='balanceAmmount4'
                    label='Balance ammount'
                    defaultValue=''
                    value=''
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 1</div>
              <div className='form-secondContainer-wrapper'>
                <div className='form-secondContainer-wrapper-first-side'>
                  <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                    <span className='form-secondContainer-header-title'>Status</span>
                    <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                  </div>

                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Installment ID</span>
                    <span className='form-secondContainer-header-subtitle'>#0</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Due Date</span>
                    <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment Date</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance Due</span>
                    <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance</span>
                    <span className='form-secondContainer-header-subtitle'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 2</div>
              <div className='form-secondContainer-wrapper'>
                <div className='form-secondContainer-wrapper-first-side'>
                  <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                    <span className='form-secondContainer-header-title'>Status</span>
                    <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                  </div>

                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Installment ID</span>
                    <span className='form-secondContainer-header-subtitle'>#0</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Due Date</span>
                    <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment Date</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance Due</span>
                    <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance</span>
                    <span className='form-secondContainer-header-subtitle'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 3</div>
              <div className='form-secondContainer-wrapper'>
                <div className='form-secondContainer-wrapper-first-side'>
                  <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                    <span className='form-secondContainer-header-title'>Status</span>
                    <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                  </div>

                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Installment ID</span>
                    <span className='form-secondContainer-header-subtitle'>#0</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Due Date</span>
                    <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment Date</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance Due</span>
                    <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance</span>
                    <span className='form-secondContainer-header-subtitle'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 4</div>
              <div className='form-secondContainer-wrapper'>
                <div className='form-secondContainer-wrapper-first-side'>
                  <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
                    <span className='form-secondContainer-header-title'>Status</span>
                    <StatusSelect margin={0} initialStatus='PENDING' setSelectedStatus={setStatus} />
                  </div>

                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Installment ID</span>
                    <span className='form-secondContainer-header-subtitle'>#0</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Due Date</span>
                    <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment Date</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance Due</span>
                    <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Payment</span>
                    <span className='form-secondContainer-header-subtitle'>NA</span>
                  </div>
                  <div className='form-secondContainer-second'>
                    <span className='form-secondContainer-header-title'>Balance</span>
                    <span className='form-secondContainer-header-subtitle'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default PaymentRecord
