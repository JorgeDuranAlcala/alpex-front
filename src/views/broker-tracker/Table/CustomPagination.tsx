// ** MUI Imports
import { useAppDispatch, useAppSelector } from '@/store'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { fetchBrokerTracker } from 'src/store/apps/installments/brokerTracker'

const CustomPagination = () => {
  const installmentsReducer = useAppSelector(state => state.brokerTracker)
  const dispatch = useAppDispatch()

  const handleDispatch = (e: any, value: number) => {
    dispatch(fetchBrokerTracker({ ...installmentsReducer, info: { ...installmentsReducer.info, page: value } }))
  }

  const page = installmentsReducer.info.page
  const pageCount = installmentsReducer.info.pages
  const pageSize = installmentsReducer.info.take
  const rowCount = installmentsReducer.info.count

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
