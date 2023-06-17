import Icon from '@/@core/components/icon';
import { TUIUserNotificationTypes } from '@/types/apps/uiUserTypes';
import { Typography } from '@mui/material';

interface DefaultNotification {
  icon: string;
  color: string;
  message: string;
  background: string;
}

const defaultNotification: { [key: string]: DefaultNotification } = {
  'added': {
    icon: 'mdi:check-circle-outline',
    color: '#72E128',
    message: 'NEW USER ADDED',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #72E128',
  },
  'edited': {
    icon: 'mdi:check-circle-outline',
    color: '#72E128',
    message: 'USER UPDATED',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #72E128',
  },
  'error': {
    icon: 'jam:alert',
    color: '#FF4D49',
    message: 'UNKNOWN ERROR, TRY AGAIN',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #FF4D49',
  }
}

interface NotificationOnSubmitUserProps {
  type: TUIUserNotificationTypes,
  message?: string;
}

const NotificationOnSubmitUser = ({ type, message }: NotificationOnSubmitUserProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '6px 16px',
        height: '54px',
        minWidth: '215px',
        background: defaultNotification[type].background,
        borderRadius: '8px',
        gap: '12px',
        position: 'absolute',
        zIndex: '13000',
        right: '18px',
        top: '10px'
      }}
      id='alert'
      className='alertUser'
    >
      <Icon icon={defaultNotification[type].icon} color={defaultNotification[type].color} />
      <Typography sx={{ letterSpacing: '0.15px', color: defaultNotification[type].color, fontSize: '16px', fontWeight: 500 }}>
        {message || defaultNotification[type].message}
      </Typography>
    </div>
  )
}

export default NotificationOnSubmitUser
