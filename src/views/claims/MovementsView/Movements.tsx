//Import Material UI
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, Card, Divider, Grid, styled } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useState } from 'react'

//Import Styled Components
import { TitleContract } from '@/styles/Claims/ContractStyles/contractStyles'

import ButtonSave from '../Components/ButtonSave'
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

  // const [showMovement, setShowMovement] = useState(false)

  const movements = [
    { active: true, id: 1, movement: 'New Reserve' },
    { active: true, id: 2, movement: 'Deducible' },
    { active: true, id: 3, movement: 'Reserve Increase' },
    { active: true, id: 4, movement: 'Reserve Decrease' },
    { active: true, id: 5, movement: 'Advance Payment' },
    { active: true, id: 6, movement: 'Adjuster Payment' },
    { active: true, id: 7, movement: 'Indemnity' },
    { active: true, id: 8, movement: 'Coinsurance' },
    { active: true, id: 9, movement: 'Salvage' }
  ]
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
          {/* <Box sx={{ marginTop: '20px', textAlign: 'end' }}>
            <Button
              startIcon={<Icon icon='mdi:plus' />}
              type='submit'
              variant='outlined'
              color='primary'
              size='large'
              sx={{ ml: 5 }}
              onClick={() => {
                setShowMovement(!showMovement)
              }}
            >
              &nbsp; ADD MOVEMENT
            </Button>
          </Box> */}

          <Grid item xs={12} sm={3} md={2}>
            <Select sx={{ mr: 4, mb: 2, width: '30%', height: '42px' }} >
              {movements.map(movement => {
                return (
                  <MenuItem
                    key={movement.id}
                    sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}
                    value={movement.movement}
                  >
                    {movement.movement}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          {/* <Box sx={{ marginTop: '20px', textAlign: 'end' }}>
            {showMovement ? (
              <div className='print-options'>
                <div className='title'>Select a movement</div>

                {movements.map(movement => {
                  return (
                    <div
                      key={movement.id}
                      className='language'
                      onClick={() => {
                        console.log('Movement')
                      }}
                    >
                      {movement.movement}
                    </div>
                  )
                })}
              </div>
            ) : (
              ''
            )}
          </Box> */}
          <Box sx={{ marginTop: '20px' }}>
            <CrmTable />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Divider textAlign='center' variant='middle' sx={{ width: '100%' }} />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <HeaderTable />
          </Box>
          <Box sx={{ marginTop: '20px', textAlign: 'end' }}>
            <ButtonSave />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export default MovementsView
