import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'

export interface IAlert {
  status: 'success' | 'error' | 'secondary' | 'warning' | undefined
  message: string
  icon?: JSX.Element | undefined
  backgroundColor?: string
  fontColor?: string
  theme?: 'success' | 'secondary' | 'error'
  open?: boolean
}

const customTheme = {
  secondary: {
    backgroundColor: '#00000010',
    color: '#828597'
  },
  success: {
    backgroundColor: '#72E12840',
    color: '#72E128'
  },
  error: {
    backgroundColor: '#FF4D4940',
    color: '#FF4D49'
  }
}

const CustomAlert = (props: IAlert) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open || false)
  }, [props])

  return (
    <>
      <Alert
        onClose={() => setOpen(false)}
        sx={{
          backgroundColor: props.theme ? customTheme[props.theme] || '' : props.backgroundColor,
          color: props.fontColor,
          fontWeight: 500,
          margin: '0.5rem',
          marginTop: '-2rem',
          visibility: open ? 'visible' : 'hidden'
        }}
        icon={props.icon || ''}
      >
        {props.message}
      </Alert>
    </>
  )
}

export default CustomAlert
