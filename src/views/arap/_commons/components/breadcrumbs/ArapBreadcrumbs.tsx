import { useRouter } from 'next/router'
import { BreadcrumbsContainer } from '../../styles/BreadcrumbsContainer'
import { FormBreadcrumbs } from './components/FormBreadcrumbs'
import { OverviewDetailsBreadcrumbs } from './components/OverviewDetailsBreadcrumbs'

export const ArapBreadcrumbs = () => {
  const router = useRouter()

  return (
    <BreadcrumbsContainer>
      {router.asPath.includes('arap/overview/receivable/') ? (
        <OverviewDetailsBreadcrumbs title='Receivable' />
      ) : router.asPath.includes('arap/overview/payable/') ? (
        <OverviewDetailsBreadcrumbs title='Payable' />
      ) : router.asPath.includes('arap/overview/difference/') ? (
        <OverviewDetailsBreadcrumbs title='Difference' />
      ) : router.asPath.includes('arap/payables/reinsurer/') ? (
        <FormBreadcrumbs
          backHref='/arap/payables/'
          backLabel='Payables'
          icon='ic:round-calculate'
          title={`#${router.query.id}`}
        />
      ) : router.asPath.includes('arap/receivables/broker/') ? (
        <FormBreadcrumbs
          backHref='/arap/receivables/'
          backLabel='Receivables'
          icon='ic:round-calculate'
          title={`#${router.query.id}`}
        />
      ) : null}
    </BreadcrumbsContainer>
  )
}
