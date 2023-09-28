// ** MUI Imports
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { FollowUpContext } from '../../context/followUp/FollowUpContext';

const CustomPagination = () => {

  const { followUpGrid, onChangePage } = useContext(FollowUpContext);

  if (!followUpGrid) {
    return null;
  }

  const page = parseInt(followUpGrid.info.page.toString());
  const pageCount = parseInt(followUpGrid.info.pages.toString());
  const pageSize = parseInt(followUpGrid.info.take.toString());
  const rowCount = parseInt(followUpGrid.info.count.toString());

  return (
    <>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={Number(page)}
        onChange={(event, value) => onChangePage(value)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {1 + pageSize * (page - 1)} - {page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </>
  )
}

export default CustomPagination
