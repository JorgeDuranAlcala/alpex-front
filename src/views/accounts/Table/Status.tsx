// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import NotTakenUpIcon from 'src/assets/icons/notTakenUpIcon'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'


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
            <Icon icon='mdi:clock' fontSize={20} />
          </Box>
          <Typography sx={{ color: colors.info.dark, fontSize:fonts.size.px13,fontFamily:fonts.inter }}>
            Pending
          </Typography>
        </>
      ),
      bound:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.primary.light }}>
            <Icon icon='icon-park-outline:link-three' fontSize={20} />
          </Box>
          <Typography sx={{ color: colors.primary.light, fontSize:fonts.size.px13,fontFamily:fonts.inter }}>
            Bound
          </Typography>
        </>
      ),
      notMaterialized:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.warning.dark }}>
            <Icon icon='mdi:progress-helper' fontSize={20} />
          </Box>
          <Typography sx={{ color: colors.warning.dark, fontSize:fonts.size.px13,fontFamily:fonts.inter }}>
            Not Materialized
          </Typography>
        </>
      ),
      notTakenUp:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.secondary.dark }}>
            <NotTakenUpIcon />
          </Box>
          <Typography sx={{ color: colors.secondary.dark, fontSize:fonts.size.px13,fontFamily:fonts.inter }}>
            Not Taken Up
          </Typography>
          
        </>
      ),
      declined:(
        <>
          <Box component='span' sx={{ display: 'flex', mr: 2, color: colors.error.dark }}>
            <Icon icon='mdi:cancel' fontSize={20} />
          </Box>
          <Typography sx={{ color: colors.error.dark, fontSize:fonts.size.px13,fontFamily:fonts.inter }}>
            Declined
          </Typography>
        </>
      ),
    }
  
    return statusComponents[status]
  }

  export default Status