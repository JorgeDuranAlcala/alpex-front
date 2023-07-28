import React from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ContainerHeader, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

const HeaderTable = () => {
  const [brocker, setBrocker] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setBrocker(event.target.value as string)
  }

  return (
    <>
      <ContainerHeader>
        <ContainerTitle>
          <Typography variant='h6' sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}>
            Account balance
          </Typography>
        </ContainerTitle>
      </ContainerHeader>
      <div className='form-secondContainer-wrapper padd-x'>
        <div className='form-secondContainer-wrapper-first-side installments-wrapper'>
          <div className='form-secondContainer-second'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Name of Brocker</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={brocker}
                label='Age'
                onChange={handleChange}
              >
                <MenuItem value={'nameBrocker'}>Name of Brocker Here</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>All Pending Installments</span>
            <span className='form-secondContainer-header-subtitle'>9</span>
          </div>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>All Paid Installments</span>
            <span className='form-secondContainer-header-subtitle'>4</span>
          </div>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>Total Debt</span>
            <span className='form-secondContainer-header-subtitle'>$150,000.00 USD</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderTable
