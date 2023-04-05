import { styled } from '@mui/material/styles'

const HeaderTitle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px 20px 0px',
  width: '100%',
  height: '62px'
})

const ContainerTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '32px'
})

const ContainerData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '61%',
  marginTop: '25px',
  padding: '0 20px 0 20px'
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '25%'
})

const ColumnLabel = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px',
  width: '40%',
  height: '100%',
  fontFamily: 'Inter',
  fontWeight: '600',
  fontSize: '16px',
  letterSpacing: 0.15,
  color: 'rgba(68, 72, 84, 0.87)',
  fontStyle: 'normal'
})

const ColumnData = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px',
  width: '50%',
  height: '100%',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: '16px',
  letterSpacing: 0.15,
  color: 'rgba(68, 72, 84, 0.87)',
  fontStyle: 'normal'
})
export { HeaderTitle, ContainerTitle, ContainerData, Row, ColumnLabel, ColumnData }
