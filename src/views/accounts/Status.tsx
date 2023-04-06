// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import colors from 'src/views/accounts/colors'

// ** Fake data

interface IStatus {
    [key:string]: ReactElement
  }
  
interface IStatusProps {
    status: string
  }
  
  const Status: React.FC<IStatusProps> = ({status}) => {
    const statusComponents:IStatus = {
      pending:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.info.dark }}>
            <Icon icon='mdi:clock' />
          </Box>
          <Typography sx={{ color: colors.info.dark, fontSize:'0.813rem' }}>
            Pending
          </Typography>
        </>
      ),
      bound:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.primary.light }}>
            <Icon icon='mdi:link-variant' />
          </Box>
          <Typography sx={{ color: colors.primary.light, fontSize:'0.813rem' }}>
            Bound
          </Typography>
        </>
      ),
      notMaterialized:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.warning.dark }}>
            <Icon icon='mdi:progress-helper' />
          </Box>
          <Typography sx={{ color: colors.warning.dark, fontSize:'0.813rem' }}>
            Not Materialized
          </Typography>
        </>
      ),
      notTakenUp:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.secondary.dark }}>
            <Icon icon='mdi:hand-coin-outline' />
          </Box>
          <Typography sx={{ color: colors.secondary.dark, fontSize:'0.813rem' }}>
            Not Taken Up
          </Typography>
        </>
      ),
      declined:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.error.dark }}>
            <Icon icon='mdi:cancel' />
          </Box>
          <Typography sx={{ color: colors.error.dark, fontSize:'0.813rem' }}>
            Declined
          </Typography>
        </>
      ),
    }
  
    return statusComponents[status]
  }

  export default Status