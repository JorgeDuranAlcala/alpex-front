import { Box, styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { ColumnCellProps } from '../interfaces/ColumnCellProps';

const ColumnCellStyled = styled(TableCell)(() => ({
  backgroundColor: 'rgba(76, 78, 100, 0.04)',
  borderRight: '1px solid rgba(87, 90, 111, 0.12)',
  padding: '16px 16px !important',
  position: 'relative',

  //* Light/ Components / Table Header * /
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '200%',
  letterSpacing: '0.17px',
  textTransform: 'uppercase',


  whiteSpace: 'nowrap',
}))

export const ColumnCell = <T,>({ label, sx, tableCellProps, filterMenu, columnRef }: ColumnCellProps<T>) => {
  return (
    <ColumnCellStyled
      ref={columnRef}
      sx={sx ? sx : {}}
      {...tableCellProps}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
      }}>

        {label}
        {filterMenu || null}
      </Box>
    </ColumnCellStyled>
  )
}
