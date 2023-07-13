
import { useAppDispatch, useAppSelector } from '@/store';
import { Icon } from '@iconify/react';
import { Button, styled } from '@mui/material';

import Link from 'next/link';
import { setBackTabButtonProps } from '../store/MultiTabButtonSlice';


const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '4px',

  color: 'rgba(77, 80, 98, 0.87)',

  // backgroundColor: theme.palette.primary.main,
  fontfamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.15px',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  },

  '> a': {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

export const BackButton = () => {

  const dispatch = useAppDispatch();
  const { backButton } = useAppSelector(state => state.multiTabButtonsSlice);

  const handleClick = () => {
    dispatch(setBackTabButtonProps({
      isShow: false,
      text: '',
    }))

    if (backButton.onClick) {
      backButton.onClick;
    }
  }

  // return (
  //   <StyledButton variant="text" onClick={handleClick}>
  //     <Icon icon="ion:arrow-back" color="rgba(77, 80, 98, 0.8)" width="20" height="20" />
  //     <Link href={backButton.link || '/'}>
  //       Back to Accounts
  //     </Link>
  //   </StyledButton>
  // )

  if (!backButton.isShow) return null;

  return (
    <StyledButton variant="text" onClick={handleClick}>
      <Icon icon="ion:arrow-back" color="rgba(77, 80, 98, 0.8)" width="20" height="20" />
      {backButton.link ? (
        <Link href={backButton.link || '/'}>

          {backButton.text}

        </Link>

      ) : backButton.text}
    </StyledButton>
  )
}
