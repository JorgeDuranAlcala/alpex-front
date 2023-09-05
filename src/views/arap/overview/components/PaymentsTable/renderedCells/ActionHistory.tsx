import IconifyIcon from '@/@core/components/icon';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { PaymentsHistory } from '../../History/PaymentsHistory';

interface ActionHistoryProps {
  transactionId: string;
}

export const ActionHistory = ({ transactionId }: ActionHistoryProps) => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () => {
    setIsOpenModal(true);
  }

  const handleClose = () => {
    setIsOpenModal(false);
  }

  return (
    <>
      <Button onClick={handleClick} variant="outlined">History</Button>

      <Dialog open={isOpenModal} onClose={handleClose} fullWidth maxWidth="lg" >

        <Box>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton size='small' sx={{ p: 1 }} onClick={handleClose}>
                <IconifyIcon icon='mdi:close' fontSize={20} />
              </IconButton>
            </Box>

            History

            <Subtitle>This is a history of each transaction</Subtitle>
          </DialogTitle>
        </Box>
        <DialogContent sx={{ mb: '40px', }}>
          <PaymentsHistory transactionId={transactionId} />


        </DialogContent>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: '20px',
          mr: '20px',
        }}>

          <Button variant="contained" onClick={handleClose} >Ok</Button>
        </Box>
      </Dialog>
    </>
  )
}

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.subtitle2.fontSize
})) as typeof Typography;
