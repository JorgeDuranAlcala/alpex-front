import { CollapsibleRowTableColumn } from '@/@core-custom/tables/CollapsibleRowTable/interfaces/CollapsibleRowTableColumn'
import { TextMoney } from '@/views/arap/_commons/components/texts/TextMoney'
import { ReceivableColumn } from '../../interfaces/ReceivableGrid'
import ReceivableFilterMenu from './ReceivableFilterMenu'
import { receivableEFieldColumn } from './receivableEFieldColumn'

export const receivableColumns: CollapsibleRowTableColumn<ReceivableColumn>[] = [
  {
    name: receivableEFieldColumn.ACCOUNT_ID,
    label: 'LINKED BIZ.',
    sx: {
      minWidth: '126px',
      textAlign: 'center'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.CAPABILITY_NAME} />
  },
  {
    name: receivableEFieldColumn.PERIOD_0_30,
    label: '0-30',
    sx: {
      minWidth: '152px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PERIOD_0_30} />,
    renderCell: ({ row }) => <TextMoney amount={row['0_30']} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.PERIOD_31_60,
    label: '31-60',
    sx: {
      minWidth: '152px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PERIOD_31_60} />,
    renderCell: ({ row }) => <TextMoney amount={row['31_60']} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.PERIOD_61_90,
    label: '61-90',
    sx: {
      minWidth: '152px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PERIOD_61_90} />,
    renderCell: ({ row }) => <TextMoney amount={row['61_90']} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.PERIOD_91_120,
    label: '91-120',
    sx: {
      minWidth: '152px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PERIOD_91_120} />,
    renderCell: ({ row }) => <TextMoney amount={row['91_120']} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.PERIOD_120,
    label: '120+',
    sx: {
      minWidth: '152px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PERIOD_120} />,
    renderCell: ({ row }) => <TextMoney amount={row['120']} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.TOTAL_DEBT,
    label: 'TOTAL DEBT',
    sx: {
      minWidth: '160px'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.TOTAL_DEBT} />,
    renderCell: ({ row }) => <TextMoney amount={row.total_debt} currency={row.currency} />
  },
  {
    name: receivableEFieldColumn.PAID_PERCENT,
    label: '% PAID',
    sx: {
      minWidth: '100px',
      maxWidth: '100px',
      textAlign: 'center'
    },
    filterMenu: <ReceivableFilterMenu type={receivableEFieldColumn.PAID_PERCENT} />,
    renderCell: ({ row }) => <>{row.paid_percent}%</>
  }
]
