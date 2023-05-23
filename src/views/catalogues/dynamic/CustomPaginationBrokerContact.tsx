// ** MUI Imports
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchBrokerContacts } from '@/store/apps/catalogs/brokerContacts'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const CustomPaginationBrokerContact = () => {
  const userReducer = useAppSelector(state => state.brokerContacts)
  const dispatch = useAppDispatch()

  const handleDispatch = (e: any, value: number) => {
    dispatch(fetchBrokerContacts({ ...userReducer, info: { ...userReducer.info, page: value } }))
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

export default CustomPaginationBrokerContact