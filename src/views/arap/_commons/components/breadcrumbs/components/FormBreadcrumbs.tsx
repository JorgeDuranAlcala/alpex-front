import Link from 'next/link'

import IconifyIcon from '@/@core/components/icon'
import { Breadcrumbs } from '@mui/material'
import { BreadCrumbItemText } from '../../../styles/BreadCrumItemText'

interface FormBreadcrumbsProps {
  backHref: string
  backLabel: string
  title: string
  icon: string
}

export const FormBreadcrumbs = ({ title, backHref, backLabel, icon }: FormBreadcrumbsProps) => {
  return (
    <Breadcrumbs aria-label={`${backLabel} breadcrumb ${title}`}>
      <Link href={backHref} style={{ display: 'flex', textDecoration: 'none' }}>
        <IconifyIcon icon={icon} color='#575a6f' />
        <BreadCrumbItemText sx={{ marginLeft: '4px' }}>{backLabel}</BreadCrumbItemText>
      </Link>
      <BreadCrumbItemText isActive>{title}</BreadCrumbItemText>
    </Breadcrumbs>
  )
}
