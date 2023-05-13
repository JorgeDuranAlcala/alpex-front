// ** MUI Imports
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchAccountsTemporal, handleUsersFilter } from 'src/store/apps/users'

// ** Icon Imports

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

interface IFilterMenuUsersOptionProps {
  Company: IOption
}

interface IOption {
  label: string
  value: number
}

const FilterMenuUsersOption: React.FC<IFilterMenuUsersOptionProps> = ({ Company }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(
      handleUsersFilter({
        type: 'idCompany',
        value: Company.value,
        text: Company.label
      })
    )
  }

  return (
    <>
      <MenuItem sx={{ padding: '10px 15px', borderRadius: '0' }} onClick={handleClick}>
        <ListItemText>
          <Typography
            sx={{
              color: colors.text.primary,
              fontSize: fonts.size.px14,
              fontFamily: fonts.inter,
              textTransform: 'capitalize'
            }}
          >
            {Company.label}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuCompany = ({}) => {
  const dispatch = useAppDispatch()
  const usersReducer = useAppSelector(state => state.users)
  const [companies, setCompanies] = useState<IOption[]>([])

  useEffect(() => {
    dispatch(fetchAccountsTemporal())
    //eslint-disable-next-line
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    const data = usersReducer.temporalFilters
    const unique = [
      ...new Set(
        data.map(item => {
          return {
            label: item.idCompany.alias,
            value: item.idCompany.id
          }
        })
      )
    ]
    console.log(unique, data)
    setCompanies(unique)
    //eslint-disable-next-line
  }, [usersReducer])

  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            User role
          </Typography>
        </Box>
      </Box>
      {companies.map(company => (
        <FilterMenuUsersOption key={company.value} Company={company} />
      ))}
    </>
  )
}

export default FilterMenuCompany
