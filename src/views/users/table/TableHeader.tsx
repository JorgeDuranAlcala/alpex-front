// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { TextField } from '@mui/material'
import Chip from 'src/@core/components/mui/chip'
import CustomAlert, { IAlert } from 'src/pages/components/custom/alerts'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteUsersFilter } from 'src/store/apps/users'
import { IUserFilters } from 'src/types/apps/usersTypes'

interface ITableHeader {
  selectedRows: GridRowId[]
  badgeData: IAlert
  handleView: (view: string) => void
}

const TableHeader: React.FC<ITableHeader> = ({ badgeData, handleView }) => {
  // ** Custom Hooks

  //const { deleteAccounts, changeStatusAccounts } = useAccountTable()

  const dispatch = useAppDispatch()
  const usersReducer = useAppSelector(state => state.users)

  // ** State
  const [searchValue, setSearchValue] = useState('')

  // ** Handlers for Action menu

  const handleDelete = (filter: IUserFilters) => {
    dispatch(deleteUsersFilter(filter.type))
  }

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
        <TextField
          size='small'
          placeholder='Search'
          sx={{ mr: 8 }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {/* DeleteModal */}
      </Box>
      <Box>
        {usersReducer.filters.map((filter, index) =>
          filter.unDeleteable ? (
            <Chip
              key={index}
              label={filter.text}
              sx={{
                backgroundColor: '#174BC125',
                marginRight: '6px',
                color: '#2535A8',
                fontWeight: 500,
                fontFamily: 'Inter'
              }}
            />
          ) : (
            <Chip
              key={index}
              label={filter.text}
              sx={{
                backgroundColor: '#174BC125',
                marginRight: '6px',
                color: '#2535A8',
                fontWeight: 500,
                fontFamily: 'Inter'
              }}
              onDelete={() => {
                handleDelete(filter)
              }}
              deleteIcon={<Icon icon='mdi:close-circle' style={{ color: '2535A8' }} />}
            />
          )
        )}
      </Box>
      <Box sx={{ marginLeft: 'auto' }}>
        {!badgeData.status ? (
          <Button
            startIcon={<Icon icon='mdi:plus' />}
            sx={{ mb: 2 }}
            variant='contained'
            onClick={() => handleView('add')}
          >
            ADD USER &nbsp;
          </Button>
        ) : (
          <CustomAlert {...badgeData} />
        )}
      </Box>
    </Box>
  )
}

export default TableHeader
