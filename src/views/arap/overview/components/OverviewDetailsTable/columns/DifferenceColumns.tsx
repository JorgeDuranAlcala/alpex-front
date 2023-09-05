import colors from '@/views/accounts/colors';
import fonts from '@/views/accounts/font';
import { Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid';
import ColumnHeader from './ColumnHeader';
import { EFieldColumn } from './efieldColumn';

import { DetailsType } from '../../../interfaces/overview/DetailsType';
import { DifferenceColumn } from '../../../interfaces/overview/DifferenceGrid';

const DETAILS_TYPE: DetailsType = 'Difference';

export const columns: GridColumns<DifferenceColumn> = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    headerClassName: 'account-column-header-checkbox'
  },
  {
    flex: 0.1,
    field: EFieldColumn.AMOUNT_RECEIVED,
    headerName: 'AMOUNT RECEIVED',
    minWidth: 190,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.AMOUNT_RECEIVED} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        ${row.amount_received.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })} {row.currency}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.CAPABILITY_NAME,
    headerName: 'CAPABILITY',
    minWidth: 150,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.CAPABILITY_NAME} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.capability_name}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.PMT_DATE,
    headerName: 'PMT. DATE',
    minWidth: 120,
    maxWidth: 120,
    type: 'string',
    align: 'left',
    cellClassName: 'account-column-cell-pl-0',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader
        colDef={colDef}
        type={EFieldColumn.PMT_DATE}
        detailsType={DETAILS_TYPE}
      />
    ),
    renderCell: ({ row }) => {
      if (!row || !row.pmt_date) return


      // const transactionDate = formatDateTemplate(row.transactionDate);
      const dateToPrint = row.pmt_date;

      return (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {dateToPrint}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: EFieldColumn.ACCOUNT,
    headerName: 'ACCOUNT',
    minWidth: 180,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.ACCOUNT} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.account}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.ORIGIN_ACCT,
    headerName: 'ORIGIN ACCT.',
    minWidth: 100,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.ORIGIN_ACCT} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.origin_acct}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.DEPOSIT_ACC,
    headerName: 'DEPOSIT ACCT.',
    minWidth: 100,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.DEPOSIT_ACC} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.deposit_acct}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION_ID,
    headerName: 'REF. ID',
    minWidth: 150,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION_ID} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.transactionId}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.USER,
    headerName: 'USER',
    minWidth: 180,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.USER} detailsType={DETAILS_TYPE} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.user}
      </Typography>
    )
  },

];
