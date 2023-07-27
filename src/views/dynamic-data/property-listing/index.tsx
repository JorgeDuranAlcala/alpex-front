// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, GridColumns } from '@mui/x-data-grid'


// ** Custom Hooks imports
import { useMultiTabButtons } from '@/layouts/components/multiTabButtons/hooks/useMultiTabButtons'

// ** Custom Components Imports
import ColumnHeader from './ColumnHeader'
import CustomPagination from './CustomPagination'
import TableHeader from './TableHeader'

// ** Custom utilities

import { Link } from '@mui/material'
import { useAppDispatch } from 'src/store'
import {
  updateFormsData
} from 'src/store/apps/accounts'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { IAlert } from 'src/views/custom/alerts'

// ** Dto imports
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto'



export enum EFieldColumn {
  PROPERTY_ID = 'id',
  VALFIS = 'valfis',
  NOM_ENT = 'nomEnt',
  NOM_MUN = 'nomMun',
  TYPE = 'type',
  TYPOLOGY = 'typology',
  SURFACE = 'surface',
  ZONACRESTA = 'zonacresta'
}

interface IAccountTable {
  status?: string
}

const PropertyListingTable = ({ status }: IAccountTable) => {
  // ** State
  const [loading, setLoading] = useState<any>([])
  const badgeData: IAlert ={
    message: '',
    status: undefined,
    icon: undefined
  }

  // **Reducers
  const dispatch = useAppDispatch()

  // const accountsReducer = useAppSelector(state => state.accounts)

  // ** Custom Hooks

  const { setBaseLink, setBackButtonProps } = useMultiTabButtons()


  const handleClickColumnHeader = (field: string) => {
    alert(field)
  }



  const properties: IProperty[] = [
    {
      id: "06003_1",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    },
    {
      id: "06003_2",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    },
    {
      id: "06003_3",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    },
    {
      id: "06003_4",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    },
    {
      id: "06003_5",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    },
    {
      id: "06003_6",
      valfis: "000,000,000.00",
      nomEnt:"9",
      nomMun:"14",
      type:"Propiedad Federal",
      typology: 'Oficinas en General',
      surface: '26,356.09 m2',
      zonacresta: "10"
    }
  ]

  const column: GridColumns<IProperty> = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'account-column-header-checkbox'
    },
    {
      flex: 0.1,
      field: EFieldColumn.PROPERTY_ID,
      headerName: 'ID',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type={'idProperty'} />
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              onEdit(+row.id)
            }}
          >{`#${row.id}`}</Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.VALFIS,
      headerName: 'VALFIS',
      minWidth: 150,
      maxWidth: 150,
      type: 'string',
      align: 'left',
      cellClassName: 'properties-table-column',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader
          colDef={colDef}
          action={status === undefined ? handleClickColumnHeader : undefined}
          type={'valfis'}
        />
      ),
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.valfis}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.NOM_ENT,
      headerName: 'NOM_ENT',
      minWidth: 185,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='nomEnt' />,
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
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='nomMun' />
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
      minWidth: 165,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='type' />
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
      field: EFieldColumn.TYPOLOGY,
      headerName: 'TYPOLOGY',
      minWidth: 165,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='typology' />
      ),
      renderCell: ({ row }) => {
        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {row.typology}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: EFieldColumn.SURFACE,
      headerName: 'SURFACE',
      minWidth: 165,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='surface' />
      ),
      renderCell: ({ row }) => {
        return (
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px14, fontFamily: fonts.inter }}>
            {row.surface}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: EFieldColumn.ZONACRESTA,
      headerName: 'ZONACRESTA',
      minWidth: 170,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} action={handleClickColumnHeader} type='zonacresta' />
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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const onEdit = async (id: number) => {
    dispatch(
      updateFormsData({
        form1: {
          basicInfo: {},
          placementStructure: {},
          userFile: {},
          id
        }
      })
    )

  }

  useEffect(() => {
    setBaseLink()
    setBackButtonProps({
      text: 'Back to Accounts',
      link: `/accounts/`,
      isShow: false
    })
  }, [setBaseLink, setBackButtonProps])

  return (
    <>
      <TableHeader
        badgeData={badgeData}
      />
      <DataGrid
        loading={loading}
        autoHeight
        disableSelectionOnClick
        rows={properties}
        columns={column}
        pagination
        pageSize={10}
        components={{
          Pagination: CustomPagination
        }}
        className={'properties-datagrid'}
      />
    </>
  )
}

export default PropertyListingTable
