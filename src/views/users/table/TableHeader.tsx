// ** React Imports
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import { Grid, TextField, styled } from '@mui/material'
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
const AddAccountButton = styled(Button)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: 2,
  width: '100%',

  minWidth: '209px',
  maxWidth: '209px',
  height: '42px',
  '@media (max-width:900px)': {
    maxWidth: '100%'
  }

  // [theme.breakpoints.down('md')]: {
  //   maxWidth: '100%'
  // }
}))
const TableHeader: React.FC<ITableHeader> = ({ badgeData, handleView, selectedRows, setModalShow }) => {
  // ** Custom Hooks
  const accountsReducer = useAppSelector(state => state.accounts)

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
        alignItems: 'center',
        height: 'auto',
        justifyContent: 'space-between',

        '@media (max-width:900px)': {
          flexDirection: 'column'
        }
      }}
    >
      {' '}
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: accountsReducer.filters.length === 0 ? 'space-between' : 'space-between'
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            gap: 2,
            pddingTop: '10px',
            justifyContent: accountsReducer.filters.length === 0 ? 'space-between' : null,

            '@media (max-width:900px)': {
              flexDirection: 'column',
              width: '100%'
            }
          }}
        >
          <Box
            sx={{
              '@media (max-width:900px)': {
                flexDirection: 'column',
                width: '100%'
              }
            }}
          >
            <TextField
              size='small'
              placeholder='Search'
              sx={{
                mr: 8,
                '@media (max-width:900px)': {
                  width: '100%',

                  mr: 0,
                  size: 'large'
                }
              }}
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
        </Grid>
        <Grid
          item
          sx={{
            '@media (max-width:900px)': {
              width: '100%',
              mb: 2
            }
          }}
        >
          {!badgeData.status ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <AddAccountButton
                startIcon={<Icon icon='mdi:plus' />}
                sx={{
                  mb: 0,
                  '@media (max-width:900px)': {
                    width: '100%',
                    mb: 2
                  }
                }}
                variant='contained'
                onClick={() => handleView(1)}
                style={{ backgroundColor: ' #14249D' }}
              >
                ADD USER &nbsp;
              </AddAccountButton>
            </Box>
          ) : (
            <CustomAlert {...badgeData} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableHeader

// <Button
//   startIcon={<Icon icon='mdi:plus' />}
//   sx={{ mb: 2 }}
//   variant='contained'
//   onClick={() => handleView(1)}
//   style={{ backgroundColor: ' #14249D' }}
// >
//   ADD USER &nbsp;
// </Button>
