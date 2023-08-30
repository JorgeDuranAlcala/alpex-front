import { Icon } from '@iconify/react';
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material';

interface OptionAddNewCoverageProps {
  onChange: (e: SelectChangeEvent<string> | any) => void;
}

export default function OptionAddNewCoverage({ onChange }: OptionAddNewCoverageProps) {
  return (
    <MenuItem
      role={undefined}

      onClick={() => onChange({
        target: { value: 'new_coverage' }
      })}

      // key={index}
      sx={{
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        padding: '4px 20px',
      }}
    >

      <Icon icon="icons8:plus" color="rgba(77, 80, 98, 0.8)" width="24" height="24" />
      <Typography sx={{ ml: 5 }}>New Coverage</Typography>
    </MenuItem>
  )
}


