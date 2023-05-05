// ** MUI Imports
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useAppDispatch } from 'src/store'
import { handleAccountFilter } from 'src/store/apps/accounts'

// ** Icon Imports

// ** Custom utilities
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'

/*enum EUsers {
    PROPERTY = 'property',
    FINANCIAL_LINES = 'financialLines',
    OTHER = 'other',
    OTHER2 = 'other2',
}*/

enum EUsersString {
  PROPERTY = 'Property',
  FINANCIAL_LINES = 'Financial Lines',
  OTHER = 'Other option',
  OTHER2 = 'Other option'
}

interface IFilterMenuUsersOptionProps {
  Users: EUsersString
  handleClose?: () => void
}

const FilterMenuUsersOption: React.FC<IFilterMenuUsersOptionProps> = ({ Users }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(
      handleAccountFilter({
        type: 'Users',
        value: Users,
        text: Users
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
            {Users}
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
            Line of Business
          </Typography>
        </Box>
      </Box>
      <FilterMenuUsersOption Users={EUsersString.PROPERTY} />
      <FilterMenuUsersOption Users={EUsersString.FINANCIAL_LINES} />
      <FilterMenuUsersOption Users={EUsersString.OTHER} />
      <FilterMenuUsersOption Users={EUsersString.OTHER2} />
    </>
  )
}

export default FilterMenuUsers
