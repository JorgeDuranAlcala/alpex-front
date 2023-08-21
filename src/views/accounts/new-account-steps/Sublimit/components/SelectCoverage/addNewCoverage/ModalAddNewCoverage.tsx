import { Icon } from '@iconify/react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import { ReactNode } from 'react';

const DialogTitleStyled = styled(DialogTitle)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '8px',

  color: 'rgba(77, 80, 98, 0.87)',
  padding: '0px',
}));

const SubTitle = styled(Typography)(() => ({
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px', /* 142.857% */
  letterSpacing: '0.15px',

  color: 'rgba(77, 80, 98, 0.68)'
}));




interface ModalAddNewCoverageProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}


export const ModalAddNewCoverage = ({ isOpen, onClose, children }: ModalAddNewCoverageProps) => {


  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogContent >
        <CloseIcon onClose={onClose} />
        <DialogTitleStyled >
          <span>Create New Coverage</span>
          <SubTitle>
            Name new coverage and select required fields.
          </SubTitle>

        </DialogTitleStyled>

        {children}
      </DialogContent>

    </Dialog>
  )
}

function CloseIcon({ onClose }: { onClose: () => void }) {
  return (
    <Box sx={{ textAlign: 'right' }}>
      <IconButton onClick={onClose} sx={{ width: '35px', height: '35px', p: 0 }}>
        <Icon icon="ion:close-outline" color="rgba(77, 80, 98, 0.8)" width="28" height="28" />
      </IconButton>
    </Box>
  )
}
