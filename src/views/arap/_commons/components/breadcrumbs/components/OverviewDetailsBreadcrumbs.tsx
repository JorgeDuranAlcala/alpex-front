import Link from 'next/link'

import IconifyIcon from '@/@core/components/icon'
import { Breadcrumbs } from '@mui/material'
import { BreadCrumbItemText } from '../../../styles/BreadCrumItemText'

interface OverviewDetailsBreadcrumbsProps {
  title: string
}

export const OverviewDetailsBreadcrumbs = ({ title }: OverviewDetailsBreadcrumbsProps) => {
  return (
    <Breadcrumbs aria-label={`${title} breadcrumb`}>
      <Link href='/arap/overview/' style={{ display: 'flex', textDecoration: 'none' }}>
        <IconifyIcon icon='ic:baseline-payments' color='#575a6f' />
        <BreadCrumbItemText sx={{ marginLeft: '4px' }}>Overview</BreadCrumbItemText>
      </Link>
      <BreadCrumbItemText isActive>{title}</BreadCrumbItemText>
    </Breadcrumbs>
  )
}
