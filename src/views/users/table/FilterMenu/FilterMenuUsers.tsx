// ** MUI Imports
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useAppDispatch } from 'src/store'
import { handleUsersFilter } from 'src/store/apps/users'

// ** Icon Imports

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

interface IOption {
  label: string
  value: number
}

const roles = [
  {
    label: 'Admin',
    value: 5
  },
  {
    label: 'Lead underwriter',
    value: 1
  },
  {
    label: 'Client',
    value: 6
  },
  {
    label: 'Technical assistant',
    value: 2
  },
  {
    label: 'Underwriter',
    value: 3
  }
]
interface IFilterMenuUsersOptionProps {
  rol: IOption
}

const FilterMenuUsersOption: React.FC<IFilterMenuUsersOptionProps> = ({ rol }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(
      handleUsersFilter({
        type: 'idRole',
        value: rol.value,
        text: rol.label
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
            {rol.label}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuUsers = ({}) => {
  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            User role
          </Typography>
        </Box>
      </Box>
      {roles.map(rol => (
        <FilterMenuUsersOption key={rol.label} rol={rol} />
      ))}
    </>
  )
}

export default FilterMenuUsers
