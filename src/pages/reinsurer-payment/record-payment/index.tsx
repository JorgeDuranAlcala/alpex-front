import { useState } from 'react'

// ** MUI Imports
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import FormHeader from 'src/views/reinsurer-payment/Header/headerRecord'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'
import DetailInstallment from '@/views/installments/components/DetailsInstallment'
import CardDistributeBalance from '@/views/reinsurer-payment/components/DistributeBalance'
import PaymentInformation from '@/views/reinsurer-payment/components/PaymentInformation'

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
          <CardDistributeBalance />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Everest Re Group LTD</div>
              <PaymentInformation st='Pending' id='1' />
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
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default PaymentRecord
