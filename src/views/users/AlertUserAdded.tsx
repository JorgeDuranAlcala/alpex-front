import Icon from '@/@core/components/icon'
import { Typography } from '@mui/material'

const AlertAddUser = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '6px 16px',
        height: '54px',
        width: '17%',
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #72E128',
        borderRadius: '8px',
        gap: '12px',
        position: 'absolute',
        zIndex: '13000',
        right: '3%',
        top: '17%'
      }}
      id='alert'
      className='alertUser'
    >
      <Icon icon='mdi:check-circle-outline' color='#72E128' />
      <Typography sx={{ letterSpacing: '0.15px', color: '#72E128', fontSize: '16px', fontWeight: 500 }}>
        NEW USER ADDED
      </Typography>
    </div>
  )
}

export default AlertAddUser
