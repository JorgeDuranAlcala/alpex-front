import { useAppSelector } from '@/store';
import { Box, styled } from '@mui/material';
import React from 'react';
import { TabButton } from './TabButton';

const Separator = styled(Box)(() => ({
  color: 'rgba(77, 80, 98, 0.68)',

  /* Light/Typography/Body 1 */
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.15px'
  ,
}))

export const TabButtonList = () => {


  const { backButton, tabButtons, baseLink } = useAppSelector(state => state.multiTabButtonsSlice);

  return (
    <>
      {backButton.isShow ? (
        <Separator component={'span'}>/</Separator>
      ) : null}
      {tabButtons.map((tabButton, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <Separator component={'span'}>/</Separator>
          ) : null}
          <TabButton baseLink={baseLink} index={index} {...tabButton} />
        </React.Fragment>
      ))}
    </>
  )
}
