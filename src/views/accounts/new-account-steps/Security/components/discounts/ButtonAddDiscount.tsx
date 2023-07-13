import { Button, Grid } from '@mui/material'
import { useContext } from 'react'

import CoreIcon from 'src/@core/components/icon'
import { SecurityContext } from '../../SecurityView'

export const ButtonAddDiscount = ({ view, formIndex }: { view: number; formIndex: number }) => {
  const {
    securities,

    calculateSecurities
  } = useContext(SecurityContext)

  const addDiscount = () => {
    const securitiesTemp = [...securities]
    let tempPercentTotalDiscount = 0
    for (const discount of securitiesTemp[formIndex].discounts) {
      tempPercentTotalDiscount += discount.percentage
    }
    if (tempPercentTotalDiscount < 100) {
      securitiesTemp[formIndex].discounts = [
        ...securitiesTemp[formIndex].discounts,
        {
          active: true,
          percentage: 0,
          amount: 0
        }
      ]
      calculateSecurities(securitiesTemp)
    }
  }

  return (
    <Grid
      container
      spacing={5}
      sx={{
        marginTop: '5px',
        mb: 12
      }}
    >
      <Grid item xs={12} sm={12}>
        <Button
          type='button'
          onClick={addDiscount}
          variant='text'
          color='primary'
          size='large'
          sx={{ justifyContent: 'start' }}
          disabled={view === 2}
        >
          <CoreIcon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD DISCOUNT
        </Button>
      </Grid>
    </Grid>
  )
}
