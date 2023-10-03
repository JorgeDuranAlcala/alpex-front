import { ContainerPadd } from '@/styles/Payments/PaymnetsInstallments/paymentsInstallments'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useState } from 'react'

import { ResponseGetInstallmentsByAccount } from '@/hooks/accounts/installments/useGetInstallmentsByIdAccount'
import DetailInstallment from '@/views/broker-tracker/components/DetailsInstallment'
import InstallmentInformation from '@/views/broker-tracker/components/InstallmentInformation'

interface HistoryPaymentsProps {
  installmentHistory?: Array<ResponseGetInstallmentsByAccount> | null
}

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
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />}
    {...props}
  />
))(() => ({
  backgroundColor: '#FFFFFF',
  borderStyle: 'none',
  boxShadow: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '0'
  }
}))
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0'
}))

const HistoryPayments = ({ installmentHistory }: HistoryPaymentsProps) => {
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      {installmentHistory?.map((item, index: number) => {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Card>
              <ContainerPadd>
                <div className='title-installment'>Installment {index + 1}</div>
                <InstallmentInformation
                  st={item.status}
                  id={item.id.toString()}
                  dueDate={item.dueDate.toString()}
                  payment={item.paymentsTotalAmount}
                  balanceDue={item.balanceDue}
                  outstanding={item.outstanding}
                />
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
              </ContainerPadd>
            </Card>
          </div>
        )
      })}
    </>
  )
}

export default HistoryPayments
