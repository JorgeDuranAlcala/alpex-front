// ** MUI Imports
import { useAppDispatch, useAppSelector } from '@/store'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { fetchAccounts } from 'src/store/apps/users'

const CustomPagination = () => {
  const userReducer = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  const handleDispatch = (e: any, value: number) => {
    dispatch(fetchAccounts({ ...userReducer, info: { ...userReducer.info, page: value } }))
  }

  const page = userReducer.info.page
  const pageCount = userReducer.info.pages
  const pageSize = userReducer.info.take
  const rowCount = userReducer.info.count

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
