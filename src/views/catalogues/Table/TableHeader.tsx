// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports

import CustomAlert, { IAlert } from 'src/views/custom/alerts'

interface ITableHeader {
  selectedRows?: GridRowId[]
  badgeData: IAlert
}

const TableHeader: React.FC<ITableHeader> = ({ selectedRows, badgeData }) => {
  // ** Custom Hooks
  const router = useRouter()
  console.log(selectedRows)

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      <Box>

      </Box>
      <Box sx={{ marginLeft: 'auto' }}>

          <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.push('/catalogues/dynamic/add-broker')}>
            ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
          </Button>

      </Box>
      <Box sx={{ marginLeft: 'auto' }}>
        {!badgeData.status ? (
          <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.push('/accounts/new-account')}>
            ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
          </Button>
        ) : (
          <CustomAlert {...badgeData} />
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
