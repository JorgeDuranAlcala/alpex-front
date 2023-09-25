import { Box, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ButtonSave = () => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button
        startIcon={<Icon icon='material-symbols:save' />}
        type='submit'
        variant='outlined'
        color='primary'
        size='large'
        sx={{ float: 'right', ml: 5, '@media (max-width: 599px)': { width: '100%' } }}
        onClick={() => {
          // console.log('se hace algo por acá')
        }}
      >
        SAVE
      </Button>
    </Box>
  )
}

export default ButtonSave
