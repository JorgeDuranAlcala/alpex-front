// ** MUI Imports
import { useGetAllLineOfBussines } from '@/hooks/catalogs/lineOfBussines'
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

/*enum ELob {
    PROPERTY = 'property',
    FINANCIAL_LINES = 'financialLines',
    OTHER = 'other',
    OTHER2 = 'other2',
}*/

interface IFilterMenuLobOptionProps {
  lob: string
  id: number
  handleClose?: () => void
}

const FilterMenuLobOption: React.FC<IFilterMenuLobOptionProps> = ({ lob, id }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(
      handleAccountFilter({
        type: 'idLineOfBusiness',
        value: id,
        text: lob
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
            {lob}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuLob = ({}) => {
  const { lineOfBussines } = useGetAllLineOfBussines()

  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            Line of Business
          </Typography>
        </Box>
      </Box>
      {lineOfBussines.map(lob => (
        <FilterMenuLobOption key={lob.id} id={lob.id} lob={lob.lineOfBussines} />
      ))}
      {/* <FilterMenuLobOption lob={ELobString.FINANCIAL_LINES} />
      <FilterMenuLobOption lob={ELobString.OTHER} />
      <FilterMenuLobOption lob={ELobString.OTHER2} /> */}
    </>
  )
}

export default FilterMenuLob
