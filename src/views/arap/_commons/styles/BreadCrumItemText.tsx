import { styled } from '@mui/material'
import { TextBody1 } from './TextBody1'

export const BreadCrumbItemText = styled(TextBody1, { shouldForwardProp: prop => prop !== 'isActive' })<{
  isActive?: boolean
}>(({ isActive }) => ({
  color: isActive ? 'rgba(77, 80, 98, 0.87)' : 'rgba(77, 80, 98, 0.68)'
}))
