// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = () => {
    return (
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Select
          size='small'
          displayEmpty
          defaultValue=''
          sx={{ mr: 4, mb: 2 }}
          renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
        >
          <MenuItem disabled>Actions</MenuItem>
          <MenuItem value='DeleteAll'>Delete All</MenuItem>
          <MenuItem value='ChangeStatus'>Change status</MenuItem>
        </Select>
  
        <Button sx={{ mb: 2 }} variant='contained'>
            ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
        </Button>
      </Box>
    )
  }

export default TableHeader