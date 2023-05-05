import { styled } from '@mui/material/styles'

const HeaderTitleModal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: '20px',
  paddingRight: '0px',
  gap: '10px',
  width: '100%',
  height: '56px',
  justifyContent: 'space-between',
  marginBottom: '26px'
})

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: '28px',
  width: '100%',
  height: '316px'
})

const ContainerData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '100%'
})

const HeaderColumns = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: '100%',
  height: '22.5%'
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '50%',
  height: '100%',
  backgroundColor: 'rgba(13, 86, 123, 0.05)'
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
  width: '50%',
  height: '100%'
})
const ColumnData = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px 8px 0px',
  width: '50%',
  height: '100%'
})

const ButtonClose = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  cursor: 'pointer'
})

export { HeaderTitleModal, Container, ContainerData, HeaderColumns, Column, Row, ColumnLabel, ColumnData, ButtonClose }
