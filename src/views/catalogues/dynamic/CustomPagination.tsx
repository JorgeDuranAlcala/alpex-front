// ** MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import {
    gridPageCountSelector,
    gridPageSelector,
    gridPageSizeSelector,
    gridRowCountSelector, useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid'

const CustomPagination = () => {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector)
    const rowCount = useGridSelector(apiRef, gridRowCountSelector)
  
    return (
      <>
        <Pagination
          color={"standard"}
          count={pageCount}
          page={page+1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
        <Typography sx={{marginRight:'1rem'}}>{(((page+1)*pageSize)-pageSize)+1}-{((page+1)*pageSize)} of {rowCount}</Typography>
      </>
    );
}

export default CustomPagination