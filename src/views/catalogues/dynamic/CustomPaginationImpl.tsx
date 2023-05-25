// ** MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

interface IInfoPage {
  count: number
  page: number
  take: number
  pages: number
  next: string
  prev: string
}

interface ICustomPagination {
  handleDispatch: (e: any, value: number) => void
  infoPage: IInfoPage
}

const CustomPaginationBrokerContact = ({ handleDispatch, infoPage }: ICustomPagination) => {
  const page = parseInt(infoPage.page.toString())
  const pageCount = parseInt(infoPage.pages.toString())
  const pageSize = parseInt(infoPage.take.toString())
  const rowCount = parseInt(infoPage.count.toString())

  return (
    <>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={page}
        onChange={(event, value) => handleDispatch(event, value)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {rowCount === 0 ? 0 : 1 + pageSize * (page - 1)}-{page * pageSize > rowCount ? rowCount : page * pageSize} of{' '}
        {rowCount}
      </Typography>
    </>
  )
}

export default CustomPaginationBrokerContact
