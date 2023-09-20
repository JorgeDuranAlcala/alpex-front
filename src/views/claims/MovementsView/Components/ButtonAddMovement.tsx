import { Box, Grid } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'

const ButtonAddMovement = () => {
  const [personName, setPersonName] = React.useState<string[]>([])

  const movements = [
    { active: true, id: 1, movement: 'New Reserve' },
    { active: true, id: 2, movement: 'Deducible' },
    { active: true, id: 3, movement: 'Reserve Increase' },
    { active: true, id: 4, movement: 'Reserve Decrease' },
    { active: true, id: 5, movement: 'Advance Payment' },
    { active: true, id: 6, movement: 'Adjuster Payment' },
    { active: true, id: 7, movement: 'Indemnity' },
    { active: true, id: 8, movement: 'Coinsurance' },
    { active: true, id: 9, movement: 'Salvage' }
  ]
  const handleChangeSelect = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Box className='alignBox' sx={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={3} md={2}>
        <Select
          className='fullSelect'
          sx={{ mr: 4, mb: 2, width: 'auto', height: '42px' }}
          multiple
          displayEmpty
          value={personName}
          onChange={handleChangeSelect}
          input={<OutlinedInput />}
          renderValue={selected => {
            if (selected.length === 0) {
              return <em style={{ color: '#2535A8', textTransform: 'uppercase', fontStyle: 'normal' }}>Add Movement</em>
            }

            return selected.join(', ')
          }}
        >
          <MenuItem sx={{ minWidth: '172px', display: 'flex', gap: '5%' }} disabled value=''>
            <em>Add Movement</em>
          </MenuItem>
          {movements.map(movement => {
            return (
              <MenuItem
                key={movement.id}
                sx={{ minWidth: '172px', display: 'flex', gap: '5%' }}
                value={movement.movement}
              >
                {movement.movement}
              </MenuItem>
            )
          })}
        </Select>
      </Grid>
    </Box>
  )
}

export default ButtonAddMovement
