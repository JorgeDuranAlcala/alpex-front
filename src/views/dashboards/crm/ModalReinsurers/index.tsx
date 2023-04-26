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
  const textColor = userThemeConfig.palette?.text.title
  const sizeText = userThemeConfig.typography?.size.px16
  const weight = userThemeConfig.typography?.fontWeight.weight400

  return (
    <>
      <Container>
        <ContainerData>
          <HeaderColumns>
            <Column sx={{ padding: '16px 16px 16px 20px' }}>
              <Typography
                sx={{
                  fontFamily: inter,
                  fontWeight: weight,
                  fontSize: sizeText,
                  letterSpacing: '0.15px',
                  color: textColor
                }}
              >
                Name
              </Typography>
            </Column>
            <Column sx={{ padding: '16px 16px 16px 0px' }}>
              <Typography
                sx={{
                  fontFamily: inter,
                  fontWeight: weight,
                  fontSize: sizeText,
                  letterSpacing: '0.15px',
                  color: textColor
                }}
              >
                Debt to date
              </Typography>
            </Column>
          </HeaderColumns>
          {rows?.map((item, index) => (
            <Row key={index} sx={{ backgroundColor: item.backgroundColor }}>
              <ColumnLabel
                sx={{
                  fontFamily: inter,
                  fontWeight: userThemeConfig.typography?.fontWeight.weight600,
                  fontSize: sizeText,
                  letterSpacing: '0.15px',
                  color: textColor
                }}
              >
                {item.label}
              </ColumnLabel>
              <ColumnData
                sx={{
                  fontFamily: inter,
                  fontWeight: weight,
                  fontSize: sizeText,
                  letterSpacing: '0.15px',
                  color: textColor
                }}
              >
                {item.data}
              </ColumnData>
            </Row>
          ))}
        </ContainerData>
        <Button
          variant='outlined'
          sx={{
            width: 'auto',
            height: '42px',
            fontSize: userThemeConfig.typography?.size.px15,
            color: userThemeConfig.palette?.buttonText.primary,
            fontFamily: inter
          }}
        >
          Reinsurers balance
        </Button>
      </Container>
    </>
  )
}

export default ModalReinsurers
