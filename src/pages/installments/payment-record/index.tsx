import { useState } from 'react'

// ** MUI Imports
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button, Stack, TextField } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import FormHeader from 'src/views/installments/Header/headerInstallment'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'
import DetailInstallment from '@/views/installments/components/DetailsInstallment'
import InstallmentInformation from '@/views/installments/components/InstallmentInformation'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({}) => ({
    border: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(() => ({
  backgroundColor: '#FFFFFF',
  borderStyle: 'none',
  boxShadow: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '0'
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0'
}))

const PaymentRecord = () => {
  // ** Hooks

  // ** Redux

  // ** Hooks header
  const { account: accountDetails, setAccountId } = useGetAccountById()

  const [, setEditInfo] = useState(true)

  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

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
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='ammount' label='Ammount' defaultValue='' value='$100,000' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='currentInstallment'
                        label='Current Installment'
                        defaultValue=''
                        value='1'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='typeOfPayment'
                        label='Type Of Payment'
                        defaultValue=''
                        value='Balance Due'
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className='title-installment'>Distribute balance</div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='installment1'
                        label='Installment'
                        defaultValue=''
                        value='1'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='balance1' label='Balance %' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                  </Grid>
                </Grid>
              </div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='installment1'
                        label='Installment'
                        defaultValue=''
                        value='2'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='balance1' label='Balance %' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                  </Grid>
                </Grid>
              </div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='installment1'
                        label='Installment'
                        defaultValue=''
                        value='3'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='balance1' label='Balance %' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                  </Grid>
                </Grid>
              </div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField
                        fullWidth
                        autoFocus
                        name='installment1'
                        label='Installment'
                        defaultValue=''
                        value='4'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <div className='width-full'>
                      <TextField fullWidth autoFocus name='balance1' label='Balance %' defaultValue='' value='' />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                  </Grid>
                </Grid>
              </div>

              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row-reverse' }}>
                <Button variant='contained'>Save Installments Payment</Button>
              </Stack>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 1</div>
              <InstallmentInformation st='Pending' id='1' />
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 2</div>
              <InstallmentInformation st='Paid' id='2' />
              <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel2d-content' id='panel2d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 3</div>
              <InstallmentInformation st='Extra' id='3' />
              <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel3d-content' id='panel3d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Installment 4</div>
              <InstallmentInformation st='Partially' id='4' />
              <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel4d-content' id='panel4d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </div>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default PaymentRecord
