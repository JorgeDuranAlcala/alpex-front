import { CircularProgress } from '@mui/material';

interface AnimatedLoadingCenterProps {
  isLoading: boolean;
}

export const AnimatedLoadingCenter = ({isLoading}: AnimatedLoadingCenterProps) => {
  return (
    <CircularProgress
      sx={{
        transition: 'all 0.5s',
        position: 'absolute',
        top: isLoading ? '50%' : 0,
        left: '50%',
        opacity: isLoading ? 1 : 0
      }}
    />
  )
}
