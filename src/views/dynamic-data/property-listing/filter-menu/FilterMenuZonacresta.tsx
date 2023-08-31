// ** MUI Imports
// import { useGetAllLineOfBussines } from '@/hooks/catalogs/lineOfBussines'
import Box from '@mui/material/Box'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// import { useAppDispatch } from 'src/store'
// import { handleAccountFilter } from 'src/store/apps/accounts'

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
  name: string
  id: number
  handleClose?: () => void
}

const FilterMenuOption: React.FC<IFilterMenuLobOptionProps> = ({ name, id }) => {
  // const dispatch = useAppDispatch()
  const handleClick = () => {
    console.log(name)
    console.log(id)

    // dispatch(
    //   handleAccountFilter({
    //     type: 'idLineOfBusiness',
    //     value: id,
    //     text: lob
    //   })
    // )
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
            {name}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuZonacresta = ({}) => {
  const zonacrestaList = [
    {
      id: 1,
      name: "1"
    },
    {
      id: 2,
      name: "2"
    },
    {
      id: 3,
      name: "3"
    },
    {
      id: 4,
      name: "4"
    },
    {
      id: 5,
      name: "5"
    },
    {
      id: 6,
      name: "6"
    },
  ]

  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            Zonacresta
          </Typography>
        </Box>
      </Box>
      {zonacrestaList.map(zonacresta => (
        <FilterMenuOption key={zonacresta.id} id={zonacresta.id} name={zonacresta.name} />
      ))}
      {/* <FilterMenuLobOption lob={ELobString.FINANCIAL_LINES} />
      <FilterMenuLobOption lob={ELobString.OTHER} />
      <FilterMenuLobOption lob={ELobString.OTHER2} /> */}
    </>
  )
}

export default FilterMenuZonacresta
