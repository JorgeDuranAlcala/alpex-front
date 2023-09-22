// ** MUI Imports
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { OverviewDetailsContext } from '../../context/overviewDetails/OverviewDetailsContext';
import { DetailsType } from '../../interfaces/overview/DetailsType';

interface CustomPaginationProps {
  detailsType: DetailsType;
}

const CustomPagination = ({ detailsType }: CustomPaginationProps) => {

  const { getInfoPagination, onChangePage } = useContext(OverviewDetailsContext);

  const { page, pageCount, pageSize, rowCount } = getInfoPagination(detailsType);

  if (pageCount === 0) return null;

  return (
    <>
      <Pagination
        color={'standard'}
        count={pageCount}
        page={Number(page)}
        onChange={(event, value) => onChangePage(value, detailsType)}
      />
      <Typography sx={{ marginRight: '1rem' }}>
        {1 + pageSize * (page - 1)} - {page * pageSize > rowCount ? rowCount : page * pageSize} of {rowCount}
      </Typography>
    </>
  )
}

export default CustomPagination
