// ** MUI Imports
import { useGetLastAccountByIdBroker } from '@/hooks/accounts/dashboard/useGetLastByIdBroker'
import { Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import {
  ColumnData,
  ColumnLabel,
  ContainerData,
  ContainerTitle,
  HeaderTitle,
  Row
} from 'src/styles/Dashboard/LastBound/lastBoundAccount'

const LastBoundAccount = () => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const { account, setBrokerId } = useGetLastAccountByIdBroker()
  const router = useRouter()
  console.log({ account })

  useEffect(() => {
    setBrokerId(0)
  }, [setBrokerId])

  const inter = userThemeConfig.typography?.fontFamilyInter
  const useColor = userThemeConfig.palette?.buttonText.primary
  const title = userThemeConfig.palette?.text.primary

  const netPremiumParseInt = Number(account?.informations[0]?.netPremium)
  const netPremium = netPremiumParseInt?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  const rows = [
    { label: 'Insured:', data: account?.informations[0]?.insured, backgroundColor: 'rgba(76, 78, 100, 0.04)' },
    { label: 'Broker:', data: account?.informations[0]?.idBroker?.name },
    { label: 'Bound date:', data: '06/26/2023', backgroundColor: 'rgba(76, 78, 100, 0.04)' },
    { label: 'Net premium:', data: `${netPremium} USD` },
    { label: 'Installments', data: account?.installmentsCount, backgroundColor: 'rgba(76, 78, 100, 0.04)' }
  ]

  return (
    <Card sx={{ position: 'relative', width: '100%' }}>
      <HeaderTitle>
        <ContainerTitle>
          <Typography variant='h6' sx={{ color: title, fontFamily: inter }}>
            Last bound account
          </Typography>
        </ContainerTitle>
        <Button
          variant='outlined'
          sx={{ width: '60%', minWidth: '180px', height: '42px', fontSize: '15px', fontFamily: inter, color: useColor }}
          onClick={() => {
            localStorage.setItem('idAccount', String(account?.id))
            router.push(`/accounts/new-account/?&id=${account?.id}`)
          }}
        >
          Go to Account
        </Button>
      </HeaderTitle>
      <ContainerData>
        {rows?.map((item, index) => (
          <Row sx={{ backgroundColor: item.backgroundColor }} key={index}>
            <ColumnLabel>{item.label}</ColumnLabel>
            <ColumnData>{item.data}</ColumnData>
          </Row>
        ))}

        {/* <p>{cifraAhorroDigits(account?.informations[0]?.netPremium)}</p> */}
      </ContainerData>
    </Card>
  )
}

export default LastBoundAccount

// '@media (max-width:1000px)': { width: 200 }
