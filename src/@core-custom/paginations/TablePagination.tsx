// ** MUI Imports
import { Box, SxProps, useTheme } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

interface TablePaginationProps {
  page: number
  pageCount: number
  pageSize: number
  rowCount: number
  sx?: SxProps
  onChangePage: (page: number) => void
}

const TablePagination = ({ page, pageCount, pageSize, rowCount, onChangePage, sx }: TablePaginationProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '50px',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          gap: '8px',
          minHeight: 'unset',
          padding: '10px 0px',
        },
        ...(sx ? sx : {})
      }}
    >
      <div></div>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={Number(page)}
        onChange={(event, value) => onChangePage(value)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {1 + pageSize * (page - 1)} - {page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </Box>
  )
}

export default TablePagination
