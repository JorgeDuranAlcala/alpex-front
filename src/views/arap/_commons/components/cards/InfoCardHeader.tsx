import { Box, styled } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Subtitle_1, TitleH5 } from '../../styles/TableHeader'
import { DetailsLoadingCenter } from '../loadings/DetailsLoadingCenter'

interface InfoCardHeaderProps {
  isLoading: boolean
  logo?: string | null
  name: string
  addressString?: string | null
  phone?: string | null
  email?: string | null
  inputsComponents: ReactNode
  actionButtonsComponent: ReactNode
}

export const InfoCardHeader = ({
  isLoading,
  logo,
  name,
  addressString,
  phone,
  email,
  inputsComponents,
  actionButtonsComponent
}: InfoCardHeaderProps) => {
  if (isLoading) {
    return (
      <InfoCardHeaderContainer>
        <DetailsLoadingCenter />
      </InfoCardHeaderContainer>
    )
  }

  return (
    <InfoCardHeaderContainer>
      <ChildContainer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {logo ? <Image src={logo as string} alt={`${name} logo`} width={80} height={80} /> : null}
          <TitleH5>{name}</TitleH5>
        </Box>

        <InfoTextsContainer>
          {addressString ? <Subtitle_1>{addressString}</Subtitle_1> : null}

          {phone ? <Subtitle_1>Tel: {phone}</Subtitle_1> : null}

          {email ? <Subtitle_1>Email: {email}</Subtitle_1> : null}
        </InfoTextsContainer>
      </ChildContainer>

      <ChildContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>{inputsComponents}</Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{actionButtonsComponent}</Box>
      </ChildContainer>
    </InfoCardHeaderContainer>
  )
}

const InfoCardHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  backgroundColor: '#FFF',
  borderRadius: '10px',

  /* Light/Elevation/1 */
  boxShadow:
    ' 0px 1px 3px 0px rgba(76, 78, 100, 0.12), 0px 1px 1px 0px rgba(76, 78, 100, 0.14), 0px 2px 1px -1px rgba(76, 78, 100, 0.20)',

  padding: '20px'
}))

const ChildContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '16px'
  }
}))

const InfoTextsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  color: 'rgba(77, 80, 98, 0.87)',

  minWidth: '200px',
  
  // ? this selector is the email
  '>p:nth-child(3)': {
    textAlign: 'right',
  },

  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start'
  }
}))
