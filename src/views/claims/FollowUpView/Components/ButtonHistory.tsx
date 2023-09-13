import { Box, Button } from '@mui/material'
import router from 'next/router'

const ButtonHistory = () => {
  const handleHistory = () => {
    router.push('/claims/followUp/followUpHistory')
  }

  return (
    <Box sx={{ marginTop: '20px', textAlign: 'end' }}>
      <Button type='submit' variant='outlined' color='primary' size='large' sx={{ ml: 5 }} onClick={handleHistory}>
        FOLLOW-UP HISTORY
      </Button>
    </Box>
  )
}

export default ButtonHistory
