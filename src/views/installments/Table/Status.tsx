// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports

import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ContainerStatus } from 'src/styles/Dashboard/Table/Status'
import fonts from 'src/views/accounts/font'

interface IStatus {
  [key: string]: ReactElement
}

interface IStatusProps {
  status: string
}

const Status: React.FC<IStatusProps> = ({ status }) => {
  const theme = useTheme()
  const statusComponents: IStatus = {
    Unpaid: (
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
            Unpaid
          </Typography>
        </ContainerStatus>
      </>
    ),
    Paid: (
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
            Paid
          </Typography>
        </ContainerStatus>
      </>
    ),
    Pending: (
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
            Pending
          </Typography>
        </ContainerStatus>
      </>
    )
  }

  return statusComponents[status]
}

export default Status
