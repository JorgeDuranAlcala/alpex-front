import colors from '@/views/accounts/colors';
import fonts from '@/views/accounts/font';
import { Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid';
import Link from 'next/link';
import ColumnHeader from './ColumnHeader';
import { EFieldColumn } from './efieldColumn';



export const columns: GridColumns<any> = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    headerClassName: 'account-column-header-checkbox'
  },
  {
    flex: 0.1,
    field: EFieldColumn.CLAIM_NUMBER,
    headerName: 'CLAIM NUMBER',
    minWidth: 180,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.CLAIM_NUMBER} />
    ),
    renderCell: ({ row }) => (
      <Link
        href={`#${row.claimNumber}`}
      >{row.claimNumber}</Link>
    )
  },

  {
    flex: 0.1,
    field: EFieldColumn.DATE,
    headerName: 'DATE',
    minWidth: 180,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.DATE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.date}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.EXECUTIVE,
    headerName: 'EXECUTIVE',
    minWidth: 180,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.EXECUTIVE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.executive}
      </Typography>
    )
  },

];
