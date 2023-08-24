// ** MUI Imports
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { PaymentsContext } from '../../context/payments/PaymentsContext';

const CustomPagination = () => {

  const { paymentsGrid, onChangePage } = useContext(PaymentsContext);

  if (!paymentsGrid) {
    return null;
  }

  const page = parseInt(paymentsGrid.info.page.toString());
  const pageCount = parseInt(paymentsGrid.info.pages.toString());
  const pageSize = parseInt(paymentsGrid.info.take.toString());
  const rowCount = parseInt(paymentsGrid.info.count.toString());

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
