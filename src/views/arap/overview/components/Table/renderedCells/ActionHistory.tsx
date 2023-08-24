import { Button } from '@mui/material';

interface ActionHistoryProps {
  transactionId: string;
}

export const ActionHistory = ({ transactionId }: ActionHistoryProps) => {

  const handleClick = () => {
    alert('openModal with id:' + transactionId)
  }

  return (
    <Button onClick={handleClick} variant="outlined">History</Button>
  )
}
