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

  const page = parseInt(userReducer.info.page.toString())
  const pageCount = parseInt(userReducer.info.pages.toString())
  const pageSize = parseInt(userReducer.info.take.toString())
  const rowCount = parseInt(userReducer.info.count.toString())

  return (
    <>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={page}
        onChange={(event, value) => handleDispatch(event, value)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {/* {rowCount === 0 ? 0 : 1 + pageSize * (page - 1)}-{page * pageSize > rowCount ? rowCount : page * pageSize} of{' '}
        {rowCount} */}
        {1 + pageSize * (page - 1)}-{page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </>
  )
}

export default CustomPagination
