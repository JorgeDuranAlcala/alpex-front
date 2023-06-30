import { styled } from '@mui/material/styles'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: '0 auto'
})

const CardContent = styled('div')({
  display: 'flex',
  width: '450px',
  height: '250px',
  padding: '40px 28px 40px 28px',
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: '0px 2px 10px rgba(76, 78, 100, 0.22)'
})

const Content = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const ContentText = styled('div')({
  display: 'flex',
  width: '100%',
  height: '67%',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const Title = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'auto',
  flexDirection: 'row',
  gap: '8px'
})

const Description = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'auto'
})

export { Container, CardContent, Content, ContentText, Title, Description }
