// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports

import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ContainerStatus } from 'src/styles/Dashboard/Table/Status'
import fonts from 'src/views/accounts/font'

export interface IStatus {
  [key: string]: ReactElement
}

interface IStatusProps {
  status: string
}

export enum EStatus {
  UNPAID = 'Unpaid',
  PAID = 'Paid',
  PENDING = 'Pending'
}

export enum EStatusString {
  UNPAID = 'Unpaid',
  PAID = 'Paid',
  PENDING = 'Pending'
}

const Status: React.FC<IStatusProps> = ({ status }) => {
  const theme = useTheme()
  const statusComponents: IStatus = {
    [EStatus.UNPAID]: (
      <>
        <ContainerStatus sx={{ backgroundColor: theme.palette.error.main }}>
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontFamily: fonts.inter,
              fontSize: fonts.size.px13,
              fontWeight: 400
            }}
          >
            {EStatusString.UNPAID}
          </Typography>
        </ContainerStatus>
      </>
    ),
    [EStatus.PAID]: (
      <>
        <ContainerStatus sx={{ backgroundColor: theme.palette.success.main }}>
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontFamily: fonts.inter,
              fontSize: fonts.size.px13,
              fontWeight: 400
            }}
          >
            {EStatusString.PAID}
          </Typography>
        </ContainerStatus>
      </>
    ),
    [EStatus.PENDING]: (
      <>
        <ContainerStatus sx={{ backgroundColor: '#FFB446' }}>
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontFamily: fonts.inter,
              fontSize: fonts.size.px13,
              fontWeight: 400
            }}
          >
            {EStatusString.PENDING}
          </Typography>
        </ContainerStatus>
      </>
    )
  }

  return statusComponents[status]
}

export default Status
