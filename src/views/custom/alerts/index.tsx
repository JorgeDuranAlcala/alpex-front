import { Alert } from '@mui/material'

export interface IAlert {
  status: 'success' | 'error' | 'secondary' | 'warning' | undefined
  message: string
  icon?: JSX.Element | undefined
  backgroundColor?: string
  fontColor?: string
  theme?: 'success' | 'secondary'
  open?: boolean
}

const customTheme = {
  secondary: {
    backgroundColor: '#00000010',
    color: '#828597'
  },
  success: {
    backgroundColor: '#00B74A',
    color: '#fff'
  }
}

const CustomAlert = (props: IAlert) => {
  return (
    <>
      {props.open && (
        <Alert
          sx={{
            backgroundColor: props.theme ? customTheme[props.theme] || '' : props.backgroundColor,
            color: props.fontColor,
            fontWeight: 500
          }}
          icon={props.icon || ''}
        >
          {props.message}
        </Alert>
      )}
    </>
  )
}

export default CustomAlert
