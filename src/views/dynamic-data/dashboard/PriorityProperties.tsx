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
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto'

//** Hooks imports */
import { useGetPriorityProperties } from '@/hooks/dynamic-data/dashboard'

export enum EFieldColumn {
  PROPERTY_ID = 'id',
  VALFIS = 'valfis',
  STATE = 'state',
  PROVINCE = 'province',
  INSTITUTION = 'institution',
  CRESTA_ZONE = 'crestazone'
}

type EarthquakePropertyProps = {
  earthquakeProperties: IProperty[],
  earthquakeDetected: boolean
}

const PriorityProperties: React.FC<EarthquakePropertyProps> = ({earthquakeProperties, earthquakeDetected}) => {
  // ** State
  const { propertyPagination, setPropertyPagination, properties } = useGetPriorityProperties()

  // const { getPriorityProperties } = useGetPriorityProperties()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [propertiesList, setPropertiesList] = useState<IProperty[]>(
    [
      {
        crestZone: '',
        institution: '',
        keyDepe: '',
        latitude: '',
        longitude: '',
        province: '',
        state: '',
        valfisValue: ''
      }
    ]
  )

  useEffect(() => {
    setPropertyPagination({ ...propertyPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {

    if(earthquakeDetected){
      setPropertiesList(earthquakeProperties || [])
    }else{
      setPropertiesList(properties || [])
    }
  }, [properties, earthquakeProperties, earthquakeDetected])

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const seeMore = () => {
    router.push(`/dynamic-data/property-listing/`)
  }

  const seeDetails = (id: string) => {
    router.push(`/dynamic-data/property-listing/property-details/?&idProperty=${id}`)
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
      maxWidth: 110,
      type: 'string',
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'properties-table-header',
      renderHeader: ({ colDef }) => (
        <ColumnHeader colDef={colDef} />
      ),
      renderCell: ({ row }) => (
        <Typography sx={{ color: colors.primary.main, fontSize: fonts.size.px14, fontFamily: fonts.inter, cursor: 'pointer' }}>
          <Link
            onClick={() => {
              seeDetails(row.keyDepe)
            }}
          >{`#${row.keyDepe}`}</Link>
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.VALFIS,
      headerName: 'REPL. VALUE',
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
          ${row.valfisValue}
        </Box>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.STATE,
      headerName: 'STATE',
      minWidth: 150,
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

            {row.state}

        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.PROVINCE,
      headerName: 'PROVINCE',
      minWidth: 150,
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
          {row.province}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: EFieldColumn.INSTITUTION,
      headerName: 'INSTITUTION',
      minWidth: 165,
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
            {row.institution}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: EFieldColumn.CRESTA_ZONE,
      headerName: 'CRESTA ZONE',
      minWidth: 100,
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
            {row.crestZone}
          </Typography>
        )
      }
    },
  ]

  return (

    <Card className='properties-card'>
      <DataGrid
        loading={loading}
        autoHeight
        disableSelectionOnClick
        rows={propertiesList}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRowId={(row) => row.keyDepe}
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
