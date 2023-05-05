// ** MUI Imports
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

// Styled FormControlLabel component
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginLeft: 0,
  '& .MuiSwitch-root': {
    width: 42,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 1,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          opacity: 1,
          border: 'none',
          backgroundColor: '#52d869'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      width: 20,
      height: 18
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      borderRadius: 13,
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.selected : theme.palette.grey[600],
      border: `1px solid ${theme.palette.grey[400]}`,
      transition: theme.transitions.create(['background-color', 'border'])
    }
  }
}))

const SwitchAlpex = (props: any) => <FormControlLabel label='' control={<Switch defaultChecked {...props} />} />

export default SwitchAlpex
