// ** React Imports

// ** MUI Imports
import { Grid, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Hooks imports
import Chip from 'src/@core/components/mui/chip'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteAccountFilter } from 'src/store/apps/accounts'
import { IFilters } from 'src/types/apps/accountsTypes'
import CustomAlert, { IAlert } from 'src/views/custom/alerts'

const DownloadButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mb: 2,
  width: '100%',
  minWidth: '209px',
  maxWidth: '209px',
  height: '42px',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))


interface ITableHeader {
  badgeData: IAlert
}

const TableHeader: React.FC<ITableHeader> = ({
  badgeData,
}) => {
  // ** Custom Hooks
  const dispatch = useAppDispatch()
  const accountsReducer = useAppSelector(state => state.accounts)

  // ** State

  const handleDelete = (filter: IFilters) => {
    dispatch(deleteAccountFilter(filter.type))
  }

  const handleDownload = () => {
    console.log('download')
  }

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 'auto'
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 2 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: accountsReducer.filters.length === 0 ? 'space-between' : null
        }}
      >
        <Grid item xs={12} sm={3} md={2}>

        </Grid>
        {accountsReducer.filters.length === 0 ? null : (
          <Grid item xs={12} sm={5} md={7} sx={{ height: 'auto' }}>
            {accountsReducer.filters.map((filter, index) =>
              filter.unDeleteable ? (
                <Chip
                  key={index}
                  label={filter.text}
                  sx={{
                    backgroundColor: '#174BC125',
                    marginRight: '6px',
                    color: '#2535A8',
                    fontWeight: 500,
                    fontFamily: 'Inter',
                    mb: 2
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
                    mb: 2
                  }}
                  onDelete={() => {
                    handleDelete(filter)
                  }}
                  deleteIcon={<Icon icon='mdi:close-circle' style={{ color: '2535A8' }} />}
                />
              )
            )}
          </Grid>
        )}
        <Grid item xs={12} sm={4} md={3}>
          {!false ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <DownloadButton variant='contained' onClick={handleDownload}>
                DOWNLOAD &nbsp; <Icon icon='mdi:download' />
              </DownloadButton>
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
