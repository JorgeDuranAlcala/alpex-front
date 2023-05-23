// ** React Imports
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { TextField } from '@mui/material'
import Chip from 'src/@core/components/mui/chip'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteUsersFilter, handleUsersFilter } from 'src/store/apps/users'
import { IUserFilters } from 'src/types/apps/usersTypes'
import CustomAlert, { IAlert } from 'src/views/custom/alerts'

interface ITableHeader {
  selectedRows: GridRowId[]
  badgeData: IAlert
  handleView: Dispatch<SetStateAction<number>>
  setModalShow: any
}

const TableHeader: React.FC<ITableHeader> = ({ badgeData, handleView, selectedRows, setModalShow }) => {
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

  useEffect(() => {
    if (searchValue === '') dispatch(deleteUsersFilter('name'))
    else dispatch(handleUsersFilter({ type: 'name', value: searchValue, text: searchValue }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

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
        {selectedRows.length > 0 && (
          <Button
            startIcon={<Icon icon='ic:baseline-delete-outline' fontSize={24} />}
            variant='outlined'
            color='error'
            onClick={() => setModalShow(true)}
          >
            DELETE
          </Button>
        )}
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
                fontFamily: 'Inter',
                textTransform: 'capitalize'
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
            onClick={() => handleView(1)}
            style={{ backgroundColor: ' #14249D' }}
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
