// ** React Imports
import { useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GridStateColDef } from '@mui/x-data-grid/models/colDef'


// ** Custom utilities

import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

interface IColunmHeader {
  colDef: GridStateColDef
}

const TableColumnHeader: React.FC<IColunmHeader> = ({ colDef}) => {
  // ** Props
  const { headerName } = colDef

  // ** Stat
  const columnHeaderRef = useRef(null)

  return (
    <Box
      ref={columnHeaderRef}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
    >
      <Typography
        component={'span'}
        sx={{ color: colors.text.primary, fontWeight: 500, fontSize: fonts.size.px12, fontFamily: fonts.inter }}
      >
        {headerName}
      </Typography>

    </Box>
  )
}

export default TableColumnHeader

// rgba(87, 90, 111, 0.54)
