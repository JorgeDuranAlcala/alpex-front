// ** MUI Imports
import { Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
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
  const rows = [
    { label: 'Insured:', data: 'Insured Name', backgroundColor: 'rgba(76, 78, 100, 0.04)' },
    { label: 'Broker:', data: 'Broker Name' },
    { label: 'Bound date:', data: '10/12/2022', backgroundColor: 'rgba(76, 78, 100, 0.04)' },
    { label: 'Net premium:', data: '$3,500,000.00 USD' },
    { label: 'Installments', data: '3', backgroundColor: 'rgba(76, 78, 100, 0.04)' }
  ]

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const useColor = userThemeConfig.palette?.buttonText.primary
  const title = userThemeConfig.palette?.text.primary

  return (
    <Card sx={{ position: 'relative', width: '100%', height: '393px' }}>
      <HeaderTitle>
        <ContainerTitle>
          <Typography variant='h6' sx={{ color: title, fontFamily: inter }}>
            Last bound account
          </Typography>
        </ContainerTitle>
        <Button
          variant='outlined'
          sx={{ width: '60%', height: '42px', fontSize: '15px', fontFamily: inter, color: useColor }}
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
      </ContainerData>
    </Card>
  )
}

export default LastBoundAccount

// '@media (max-width:1000px)': { width: 200 }
