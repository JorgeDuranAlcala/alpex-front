import { Box, styled } from '@mui/material';
import { BackButton } from './components/BackButton';
import { TabButtonList } from './components/TabButtonList';

const MultiTabContainer = styled(Box)(() => ({
  // backgroundColor: 'lightblue',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
  overflow: 'auto',
}))

export const MultiTabButtons = () => {

  return (
    <MultiTabContainer>
      <BackButton />
      <TabButtonList />
    </MultiTabContainer>
  )
}
