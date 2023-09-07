import { CollapsibleRowTableColumn } from "@/@core-custom/tables/CollapsibleRowTable/interfaces/CollapsibleRowTableColumn";
import { TextMoney } from "@/views/arap/_commons/components/texts/TextMoney";
import { PayableColumn } from "../../interfaces/PayableGrid";
import PayableFilterMenu from "./PayableFilterMenu";
import { payableEFieldColumn } from "./payableEFieldColumn";


export const payableColumns: CollapsibleRowTableColumn<PayableColumn>[] = [
  {
    name: payableEFieldColumn.ACCOUNT_ID,
    label: 'LINKED BIZ.',
    sx: {
      minWidth: '126px',
      textAlign: 'center',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.CAPABILITY_NAME} />,

  },
  {
    name: payableEFieldColumn.PERIOD_0_30,
    label: '0-30',
    sx: {
      minWidth: '152px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PERIOD_0_30} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row["0_30"]} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.PERIOD_31_60,
    label: '31-60',
    sx: {
      minWidth: '152px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PERIOD_31_60} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row["31_60"]} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.PERIOD_61_90,
    label: '61-90',
    sx: {
      minWidth: '152px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PERIOD_61_90} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row["61_90"]} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.PERIOD_91_120,
    label: '91-120',
    sx: {
      minWidth: '152px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PERIOD_91_120} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row["91_120"]} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.PERIOD_120,
    label: '120+',
    sx: {
      minWidth: '152px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PERIOD_120} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row["120"]} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.TOTAL_DEBT,
    label: 'TOTAL DEBT',
    sx: {
      minWidth: '160px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.TOTAL_DEBT} />,
    renderCell: ({ row }) => (
      <TextMoney amount={row.total_debt} currency={row.currency} />
    )
  },
  {
    name: payableEFieldColumn.PAID_PERCENT,
    label: '% PAID',
    sx: {
      minWidth: '160px',
    },
    filterMenu: <PayableFilterMenu type={payableEFieldColumn.PAID_PERCENT} />,
    renderCell: ({ row }) => (
      <>{row.paid_percent}%</>
    )
  }
]