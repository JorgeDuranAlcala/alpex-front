// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'

// ** Icon Imports

// ** Next Import
import { useRouter } from 'next/router'

// ** Custom Components Imports
import ColumnHeader from './TableColumnHeader'

// ** Custom utilities

import { Link } from '@mui/material'

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

//** Dto imports */
import { IProperty } from '@/services/dynamic-data/dtos/dashboard.dto'

//** Hooks imports */
import { useGetPriorityProperties } from '@/hooks/dynamic-data/dashboard'

export enum EFieldColumn {
  PROPERTY_ID = 'id',
  VALFIS = 'valfis',
  NOM_ENT = 'nomEnt',
  NOM_MUN = 'nomMun',
  TYPE = 'type',
  ZONACRESTA = 'zonacresta'
}

const PriorityProperties = () => {
  // ** State
  const { getPriorityProperties } = useGetPriorityProperties()
 const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [properties, setProperties] = useState<IProperty[]>(
    [
      {
        id: '',
        valfis: '',
        nomEnt: '',
        nomMun: '',
        type: '',
        zonacresta: ''
      }
    ]
  )

  // const properties: IProperty[] = [
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   },
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   },
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   },
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   },
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   },
  //   {
  //     id: "06003_1",
  //     valfis: "000,000,000.00",
  //     nomEnt: "9",
  //     nomMun: "14",
  //     type: "Propiedad Federal",
  //     zonacresta: "10"
  //   }
  // ]

  // ** Hooks

  const setDataInformation = async () => {
    const data = await getPriorityProperties()

    if (!data) return

    setProperties(data)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const seeMore = () => {
    router.push(`/dynamic-data/property-listing/`)
  }

  const column: GridColumns<IProperty> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'properties-table-header'
    },
    {
      flex: 0.1,
      field: EFieldColumn.PROPERTY_ID,
      headerName: 'ID',
      minWidth: 50,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          <Link
            onClick={() => {
              console.log("id clicked")
            }}
          >{`#${row.id}`}</Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.VALFIS,
      headerName: 'VALFIS',
      minWidth: 130,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      cellClassName: 'properties-table-column',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          ${row.valfis}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.NOM_ENT,
      headerName: 'NOM_ENT',
      minWidth: 50,
      maxWidth: 90,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} />,
      renderCell: ({ row }) => (
        <Typography
          sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px14, fontFamily: fonts.inter }}
        >
          <Link sx={{ color: colors.text.primary }} href='#'>
            {row.nomEnt}
          </Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.NOM_MUN,
      headerName: 'NOM_MUN',
      minWidth: 50,
      maxWidth: 90,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          {row.nomMun}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.TYPE,
      headerName: 'TYPE',
      minWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => {

        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {row.type}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: EFieldColumn.ZONACRESTA,
      headerName: 'ZONACRESTA',
      minWidth: 120,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'account-column-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => {

        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {row.zonacresta}
          </Typography>
        )
      }
    },
  ]

  return (

    <Card>
      <DataGrid
        loading={loading}
        autoHeight
        disableSelectionOnClick
        rows={properties}
        columns={column}
        pagination={undefined}
        pageSize={10}
        className={'properties-datagrid'}

      />
      <div className="see-more-section">
        <Button className='add-btn' onClick={seeMore}>
          See more
        </Button>
      </div>
    </Card>

  )
}

export default PriorityProperties
