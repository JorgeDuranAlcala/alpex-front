import UserThemeOptions from '@/layouts/UserThemeOptions'
import { Box, Button, Grid } from '@mui/material'
import { useMasterFiltersFollowUp } from '../../hooks/useMasterFilters'
import { SelectBroker } from './inputs/SelectBroker'

// ** Icon Imports
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

// import { TextId } from './inputs/TextId'

export const MasterFilters = () => {
  //theme
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  //hook next
  const router = useRouter()

  const inter = userThemeConfig.typography?.fontFamilyInter
  const { queryFilters, handleSelectChange, handleTextChange } = useMasterFiltersFollowUp()

  const handleNewClam = () => {
    router.push('/claims/CustomerIdentification')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
        <Grid item xs={12} sm={3.75} md={4.3}>
          <SelectBroker selectedValue={queryFilters.claimNumber} onChange={handleSelectChange} />
        </Grid>
        {/* <InputDate
        value={queryFilters.date}
        onChange={(date: any) => handleDateChange(date)}
      /> */}

        {/* <TextId value={queryFilters.claimNumber} onChange={handleTextChange} /> */}
        <Grid item xs={12} sm={3.75} md={4.3}>
          <div className='search-wrapper'>
            <input
              className='input-search'
              placeholder='Search'
              style={{ fontFamily: inter, width: '100%', marginRight: '0px' }}
              onChange={handleTextChange}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={4.5} md={3.4}>
          <Button variant='outlined' sx={{ width: '100%' }} onClick={handleNewClam}>
            <Icon icon='mdi:plus' />
            &nbsp; New Claim
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

// const FiltersContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   height: '42px',
//   border: '1px solid red',
//   width: 'auto',

//   [theme.breakpoints.down('md')]: {
//     flexWrap: 'wrap'
//   }
// }))
