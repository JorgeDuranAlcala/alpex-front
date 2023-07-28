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
  typology: string
  id: number
  handleClose?: () => void
}

const FilterMenuOption: React.FC<IFilterMenuLobOptionProps> = ({ typology, id }) => {

  // const dispatch = useAppDispatch()
  const handleClick = () => {
    console.log(id)
    console.log(typology)

    // dispatch(
    //   handleAccountFilter({
    //     type: 'idLineOfBusiness',
    //     value: id,
    //     text: typology
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
            {typology}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuTypology = ({}) => {
  const typologies = [
    {
      id: 1,
      typology: 'Infraestructura Educativa'
    },
    {
      id: 2,
      typology: 'Infraestructura Educativa'
    },
    {
      id: 3,
      typology: 'Almacenes en General'
    },
    {
      id: 4,
      typology: 'Oficinas en General'
    },
    {
      id: 5,
      typology: 'Oficina'
    },
    {
      id: 6,
      typology: 'Centro Cultural'
    },

  ]

  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            Topologies
          </Typography>
        </Box>
      </Box>
      {typologies.map(typology => (
        <FilterMenuOption key={typology.id} id={typology.id} typology={typology.typology} />
      ))}
      {/* <FilterMenuLobOption lob={ELobString.FINANCIAL_LINES} />
      <FilterMenuLobOption lob={ELobString.OTHER} />
      <FilterMenuLobOption lob={ELobString.OTHER2} /> */}
    </>
  )
}

export default FilterMenuTypology
