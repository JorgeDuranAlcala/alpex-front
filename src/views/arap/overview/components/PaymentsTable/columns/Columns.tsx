import { DynamicTooltip } from '@/@core-custom/tooltips/DynamicTooltip'
import colors from '@/views/accounts/colors'
import fonts from '@/views/accounts/font'
import { Box, Typography } from '@mui/material'
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'
import Link from 'next/link'
import { PaymentColumn } from '../../../interfaces/payments/PaymentsGrid'
import { ActionHistory } from '../renderedCells/ActionHistory'
import { Status } from '../renderedCells/Status'
import ColumnHeader from './ColumnHeader'
import { EFieldColumn } from './efieldColumn'

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
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION_ID} />,
    renderCell: ({ row }) => <Link href={`#${row.transactionId}`}>{row.transactionId}</Link>
  },
  {
    flex: 1,
    field: EFieldColumn.CAPABILITY_NAME,
    headerName: 'CAPABILITY NAME',
    minWidth: 280,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.CAPABILITY_NAME} />,
    renderCell: ({ row }) => (
      <DynamicTooltip
        name={row.capabilityName}
        sx={{
          color: colors.text.secondary,
          fontSize: fonts.size.px14,
          fontFamily: fonts.inter
        }}
      />
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.STATUS,
    headerName: 'STATUS',
    minWidth: 110,
    maxWidth: 110,
    type: 'string',
    align: 'left',
    cellClassName: 'account-column-cell-pl-0',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.STATUS} />,
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Status status={row.status} />
      </Box>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION,
    headerName: 'TRANSACTION',
    minWidth: 160,

    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION} />,
    renderCell: ({ row }) => (
      <Typography
        sx={{
          color: colors.text.secondary,
          fontSize: fonts.size.px14,
          fontFamily: fonts.inter,
          textTransform: 'capitalize'
        }}
      >
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
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.AMOUNT} />,
    renderCell: ({ row }) => (
      <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
        $
        {row.amount.toLocaleString('en-US', {
          minimumFractionDigits: 2
        })}{' '}
        {row.currency}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: EFieldColumn.TRANSACTION_DATE,
    headerName: 'TRANSACTION DATE',
    minWidth: 190,
    type: 'string',
    align: 'left',
    disableColumnMenu: true,
    sortable: false,
    headerClassName: 'account-column-header',
    renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} type={EFieldColumn.TRANSACTION_DATE} />,
    renderCell: ({ row }) => {
      if (!row || !row.transactionDate) return

      // const transactionDate = formatDateTemplate(row.transactionDate);
      let transactionDate = row.transactionDate

      if (row.transactionDate.includes('T')) {
        transactionDate = row.transactionDate.split('T')[0]
      }

      const splittedDate = transactionDate.split('-')
      const year = splittedDate[0]
      const month = splittedDate[1]
      const date = splittedDate[2]

      transactionDate = `${date}-${month}-${year}`

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
    renderCell: ({ row }) => <ActionHistory transactionId={row.transactionId} />
  }
]
