import { Button, Grid } from '@mui/material';
import { useContext } from 'react';

import CoreIcon from 'src/@core/components/icon';
import { DiscountsContext } from './DiscountsContext';

export const ButtonAddDiscount = () => {

  const { addDiscount } = useContext(DiscountsContext);


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
          fullWidth
          sx={{ justifyContent: 'start' }}
        >
          <CoreIcon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD DISCOUNT
        </Button>
      </Grid>
    </Grid>
  )
}
