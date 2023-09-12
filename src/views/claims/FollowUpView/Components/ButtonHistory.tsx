import { Box, Button } from '@mui/material'

const ButtonHistory = () => {
  return (
    <Box sx={{ marginTop: '20px', textAlign: 'end' }}>
      <Button
        type='submit'
        variant='outlined'
        color='primary'
        size='large'
        sx={{ ml: 5 }}
        onClick={() => {
          // console.log('se hace algo por acá')
        }}
      >
        FOLLOW-UP HISTORY
      </Button>
    </Box>
  )
}

export default ButtonHistory
