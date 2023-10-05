import {
  CardContent,
  Container,
  Content,
  ContentText,
  Description,
  Title
} from '@/styles/SuccesResetPassword/succesResetPassword'
import { Icon } from '@iconify/react'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { IS_DEMO } from 'src/utils/isDemo'

const SuccessResetPassword = () => {
  const router = useRouter()

  return (
    <Container>
      <CardContent>
        <Content>
          <ContentText>
            <Title>
              <Typography
                variant='h6'
                sx={{ fontSize: '20px', color: 'rgba(77, 80, 98, 0.87)', letterSpacing: '0.15px' }}
              >
                Password Successfully Reset
              </Typography>

              <img src='/svg/success.svg' alt='success-icon' width={28} height={28} />
            </Title>
            <Description>
              <Typography
                variant='body2'
                sx={{ fontSize: '14px', color: 'rgba(77, 80, 98, 0.68)', letterSpacing: '0.15px' }}
              >
                You can login with your new password and continue navigating the {!IS_DEMO ? "Alpex" : ""} Platform. Remember to keep your
                new password safe and confidential.
              </Typography>
            </Description>
          </ContentText>
          <Button
            onClick={() => router.push('/login')}
            variant='text'
            size='large'
            startIcon={<Icon icon='material-symbols:arrow-back' fontSize={20} color='#2535A8' />}
          >
            <Typography fontWeight={500} fontSize={'15px'} letterSpacing={'0.46px'} color={'#2535A8'}>
              Back to login
            </Typography>
          </Button>
        </Content>
      </CardContent>
    </Container>
  )
}

export default SuccessResetPassword
