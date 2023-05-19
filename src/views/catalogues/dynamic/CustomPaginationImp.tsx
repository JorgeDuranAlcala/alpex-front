// ** MUI Imports
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchBrokers } from '@/store/apps/catalogs/brokers'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const CustomPagination = () => {
  const userReducer = useAppSelector(state => state.brokers)
  const dispatch = useAppDispatch()

  const handleDispatch = (e: any, value: number) => {
    dispatch(fetchBrokers({ ...userReducer, info: { ...userReducer.info, page: value } }))
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
        {1 + pageSize * (page - 1)}-{page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </>
  )
}

export default CustomPagination
