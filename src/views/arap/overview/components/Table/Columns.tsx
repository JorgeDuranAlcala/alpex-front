import colors from '@/views/accounts/colors';
import fonts from '@/views/accounts/font';
import { Box, Typography } from '@mui/material';
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid';
import Link from 'next/link';
import { PaymentColumn } from '../../interfaces/payments/PaymentsGrid';
import ColumnHeader from './ColumnHeader';
import { EFieldColumn } from './efieldColumn';
import { ActionHistory } from './renderedCells/ActionHistory';
import { Status } from './renderedCells/Status';



export const columns: GridColumns<PaymentColumn> = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    headerClassName: 'account-column-header-checkbox'
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION_ID,
    headerName: 'TRANSACTION ID',
    minWidth: 170,
    maxWidth: 170,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION_ID} />
    ),
    renderCell: ({ row }) => (
      <Link

        // sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}

        href={`#${row.transactionId}`}
      >{row.transactionId}</Link>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.CAPABILITY_NAME,
    headerName: 'CAPABILITY NAME',
    minWidth: 170,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.CAPABILITY_NAME} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.capabilityName}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.STATUS,
    headerName: 'STATUS',
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
        type={EFieldColumn.STATUS}
      />
    ),
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Status status={row.status} />
      </Box>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION,
    headerName: 'TRANSACTION',
    minWidth: 140,

    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter, textTransform: 'capitalize' }}>
        {row.transaction}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.AMOUNT,
    headerName: 'AMOUNT',
    minWidth: 170,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.AMOUNT} />
    ),
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        {row.amount}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION_DATE,
    headerName: 'TRANSACTION DATE',
    minWidth: 165,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => (
      <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION_DATE} />
    ),
    renderCell: ({ row }) => {
      if (!row || !row.transactionDate) return

      const replaceDashes = row.transactionDate.replace(/-/g, '/')
      const fromatDate = new Date(replaceDashes)

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }

      const transactionDate = fromatDate.toLocaleDateString('Es-MX', options).replace(/\//g, '-')

      return (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {transactionDate}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'actions',
    headerName: 'ACTIONS',
    minWidth: 150,
    sortable: false,
    disableColumnMenu: true,
    cellClassName: 'account-column-cell-pl-0',
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} showIcon={false} />,
    renderCell: ({ row }) => (
      <ActionHistory transactionId={row.transactionId} />
    )
  }
];
