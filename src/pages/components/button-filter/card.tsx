import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'

import MenuItem from '@mui/material/MenuItem'

import { Card } from '@mui/material'

const options = ['None', 'Atria', 'Callisto', 'Dione']

export default function LongMenu() {
  const [menu, setMenu] = React.useState(false)

  const handleClick = () => {
    setMenu(!menu)
  }
  const handleClose = () => {
    setMenu(false)
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      {menu && (
        <Card>
          {options.map(option => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Card>
      )}
    </div>
  )
}
