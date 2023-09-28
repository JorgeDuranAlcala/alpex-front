import { Box, styled } from '@mui/material'

export const BreadcrumbsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '22px',

  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    top: '0px'
  }
}))
