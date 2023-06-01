// ** MUI Imports
import { useAppDispatch, useAppSelector } from '@/store'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { fetchAccounts } from 'src/store/apps/accounts'

const CustomPagination = () => {
  const accountsReducer = useAppSelector(state => state.accounts)
  const dispatch = useAppDispatch()

  const handleDispatch = (e: any, value: number) => {
    accountsReducer
    dispatch(fetchAccounts({ ...accountsReducer, info: { ...accountsReducer.info, page: value } }))
  }

  const page = accountsReducer.info.page
  const pageCount = accountsReducer.info.pages
  const pageSize = accountsReducer.info.take
  const rowCount = accountsReducer.info.count

  return (
    <>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={Number(page)}
        onChange={(event, value) => handleDispatch(event, value)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {1 + pageSize * (page - 1)} - {page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </>
  )
}

export default CustomPagination
