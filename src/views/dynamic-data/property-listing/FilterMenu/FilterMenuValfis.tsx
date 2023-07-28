// ** React Imports
// import { useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

// ** Icon Imports
// import { useAppDispatch } from 'src/store'
// import { deleteAccountFilter, handleAccountFilter } from 'src/store/apps/accounts'

const FilterMenuValfis = () => {
  // const dispatch = useAppDispatch();
  // const searchTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const valuetext = (value: number) => {
    return `${value}°C`
  }

  // const handleOnChange = (value: string) => {
  //   if (searchTimeOutRef.current) {

  //     clearTimeout(searchTimeOutRef.current);
  //   }
  //   searchTimeOutRef.current = setTimeout(() => {
  //     if (value === '') dispatch(deleteAccountFilter('idAccount'))
  //     else
  //       dispatch(
  //         handleAccountFilter({
  //           type: 'idAccount',
  //           value: `${value}`,
  //           text: `${value}`
  //         })
  //       )
  //   }, 500);
  // }

  return (
    <Box sx={{ padding: '3px 30px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <Slider
      defaultValue={[300000000, 500000000]}
      valueLabelDisplay='auto'
      getAriaValueText={valuetext}
      aria-labelledby='range-slider'
      min={0}
      max={999999999}
    />
    </Box>
  )
}

export default FilterMenuValfis
