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
  entity: string
  id: number
  handleClose?: () => void
}

const FilterMenuOption: React.FC<IFilterMenuLobOptionProps> = ({ entity, id }) => {
  // const dispatch = useAppDispatch()
  const handleClick = () => {
   console.log(id)
   console.log(entity)

    // dispatch(
    //   handleAccountFilter({
    //     type: 'idLineOfBusiness',
    //     value: id,
    //     text: entity
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
            {entity}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuNomEnt = ({}) => {
  const entities = [
    {
      id: 1,
      name: "Aguascalientes"
    },
    {
      id: 2,
      name: "Baja california"
    },
    {
      id: 3,
      name: "Campeche"
    },
    {
      id: 4,
      name: "Chihuahua"
    },
  ]

  return (
    <>
      <Box component={'li'} sx={{ padding: '10px 10px', display: 'block', width: '100%', borderRadius: '0' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ color: colors.text.secondary, fontSize: fonts.size.px12, fontFamily: fonts.inter }}>
            Entities
          </Typography>
        </Box>
      </Box>
      {entities.map(entity => (
        <FilterMenuOption key={entity.id} id={entity.id} entity={entity.name} />
      ))}
      {/* <FilterMenuLobOption lob={ELobString.FINANCIAL_LINES} />
      <FilterMenuLobOption lob={ELobString.OTHER} />
      <FilterMenuLobOption lob={ELobString.OTHER2} /> */}
    </>
  )
}

export default FilterMenuNomEnt
