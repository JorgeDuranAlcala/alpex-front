//Import Material UI
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, Card, Divider, styled } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import { useState } from 'react'

//Import Styled Components
import { TitleContract } from '@/styles/Claims/ContractStyles/contractStyles'

import React from 'react'
import ButtonSave from '../Components/ButtonSave'
import ButtonAddMovement from './Components/ButtonAddMovement'
import CrmTable from './Components/Table'
import HeaderTable from './Components/Table/HeaderTable'

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

const MovementsView = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <Card sx={{ p: '20px' }}>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        style={{ boxShadow: 'none', borderTop: 'none' }}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header' style={{ padding: '0' }}>
          <TitleContract variant='h6'>Movements</TitleContract>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonAddMovement />
          <Box sx={{ marginTop: '20px' }}>
            <CrmTable />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Divider textAlign='center' variant='middle' sx={{ width: '100%' }} />
          </Box>
          <HeaderTable />
          <Box sx={{ textAlign: 'end' }}>
            <ButtonSave />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export default MovementsView
