// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

export interface IComponents {
  [key: string]: ReactElement
}

interface IStatusProps {
  status: string
}

export enum EStatus {
  PENDING = 'pending',
  NOT_MATERIALIZED = 'notMaterialized',
  NOT_TAKEN_UP = 'notTakenUp',
  DECLINED = 'declined',
  BOUND = 'bound'
}

export enum EStatusString {
  PENDING = 'Pending',
  NOT_MATERIALIZED = 'Not Materialized',
  NOT_TAKEN_UP = 'Not Taken Up',
  DECLINED = 'Declined',
  BOUND = 'Bound'
}

const Status: React.FC<IStatusProps> = ({ status }) => {
  const statusComponents: IComponents = {
    [EStatus.PENDING]: (
      <>
        <Box
          component='span'
          sx={{
            display: 'flex',
            gap: 2,
            color: colors.primary.main,
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          <Icon icon='mdi:clock' fontSize={20} />
          <Typography
            sx={{
              fontSize: fonts.size.px16,
              fontFamily: fonts.inter,
              alignItems: 'center',
              '&.MuiTypography-root': {
                color: '#174BC1',
                fontWeight: '500'
              }
            }}
          >
            {EStatusString.PENDING}
          </Typography>
        </Box>
      </>
    ),
    [EStatus.BOUND]: (
      <>
        <Box
          component='span'
          sx={{ overflow: 'hidden', display: 'flex', gap: 2, color: colors.primary.light, alignContent: 'center' }}
        >
          <Icon icon='icon-park-outline:link-three' fontSize={20} />
          <Typography sx={{ color: colors.primary.light, fontSize: fonts.size.px16, fontFamily: fonts.inter }}>
            {EStatusString.BOUND}
          </Typography>
        </Box>
      </>
    ),
    [EStatus.NOT_MATERIALIZED]: (
      <>
        <Box
          component='span'
          sx={{ overflow: 'hidden', display: 'flex', gap: 2, color: colors.warning.dark, alignContent: 'center' }}
        >
          <Icon icon='mdi:progress-helper' fontSize={20} />
          <Typography sx={{ color: colors.warning.dark, fontSize: fonts.size.px16, fontFamily: fonts.inter }}>
            {EStatusString.NOT_MATERIALIZED}
          </Typography>
        </Box>
      </>
    ),
    [EStatus.NOT_TAKEN_UP]: (
      <>
        <Box
          component='span'
          sx={{ overflow: 'hidden', display: 'flex', gap: 2, color: colors.secondary.dark, alignContent: 'center' }}
        >
          <Icon icon='custom:not-taken-up' fontSize={20} />
          <Typography sx={{ color: colors.secondary.dark, fontSize: fonts.size.px16, fontFamily: fonts.inter }}>
            {EStatusString.NOT_TAKEN_UP}
          </Typography>
        </Box>
      </>
    ),
    [EStatus.DECLINED]: (
      <>
        <Box
          component='span'
          sx={{ overflow: 'hidden', display: 'flex', gap: 2, color: colors.error.dark, alignContent: 'center' }}
        >
          <Icon icon='mdi:cancel' fontSize={20} />
          <Typography sx={{ color: colors.error.dark, fontSize: fonts.size.px16, fontFamily: fonts.inter }}>
            {EStatusString.DECLINED}
          </Typography>
        </Box>
      </>
    )
  }

  return statusComponents[status]
}

export default Status
