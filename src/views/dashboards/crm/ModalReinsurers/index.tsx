import { Button, Typography } from '@mui/material'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import {
  Column,
  ColumnData,
  ColumnLabel,
  Container,
  ContainerData,
  HeaderColumns,
  Row
} from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'

const ModalReinsurers = () => {
  const rows = [
    { label: 'Teinsurer 1 LTDH', data: '$350,000.00 USD' },
    { label: 'Teinsurer 1 LTDH', data: '$350,000.00 USD', backgroundColor: 'rgba(76, 78, 100, 0.04)' },
    { label: 'Teinsurer 1 LTDH', data: '$350,000.00 USD' },
    { label: 'Teinsurer 1 LTDH', data: '$350,000.00 USD', backgroundColor: 'rgba(76, 78, 100, 0.04)' }
  ]

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const useColor = userThemeConfig.palette?.buttonText.primary

  return (
    <>
      <Container>
        <ContainerData>
          <HeaderColumns>
            <Column sx={{ padding: '16px 16px 16px 20px' }}>
              <Typography>Name</Typography>
            </Column>
            <Column sx={{ padding: '16px 16px 16px 0px' }}>
              <Typography>Debt to date</Typography>
            </Column>
          </HeaderColumns>
          {rows?.map((item, index) => (
            <Row key={index} sx={{ backgroundColor: item.backgroundColor }}>
              <ColumnLabel>{item.label}</ColumnLabel>
              <ColumnData>{item.data}</ColumnData>
            </Row>
          ))}
        </ContainerData>
        <Button
          variant='outlined'
          sx={{ width: 'auto', height: '42px', fontSize: '15px', color: useColor, fontFamily: inter }}
        >
          Reinsurers balance
        </Button>
      </Container>
    </>
  )
}

export default ModalReinsurers
