import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'

import MenuItem from '@mui/material/MenuItem'

import { Card } from '@mui/material'

interface IDataFilter {
  dataFilter: string[]
}
export default function LongMenu({ dataFilter }: IDataFilter) {
  const [menu, setMenu] = React.useState(false)

  const handleClick = () => {
    setMenu(!menu)
  }
  const handleClose = () => {
    setMenu(false)
  }

  return (
    <div style={{ position: 'absolute' }}>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      {menu && (
        <Card>
          {dataFilter.map(option => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Card>
      )}
    </div>
  )
}
