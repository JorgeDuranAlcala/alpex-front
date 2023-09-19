// ** MUI Imports
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom utilities
import { useAppDispatch } from 'src/store'
import { handleInstallmentsFilter } from 'src/store/apps/installments'
import colors from 'src/views/accounts/colors'
import fonts from 'src/views/accounts/font'
import { EStatus, EStatusString } from '../Status'

interface IFilterMenuStatusOptionProps {
  status: EStatusString
  icon: string
  handleClose?: () => void
}

const FilterMenuStatusOption: React.FC<IFilterMenuStatusOptionProps> = ({ status, icon }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    const index: string = Object.keys(EStatusString)[Object.values(EStatusString).indexOf(status)]
    dispatch(
      handleInstallmentsFilter({
        type: 'status',
        value: EStatus[index as keyof typeof EStatus],
        text: status
      })
    )
  }

  return (
    <>
      <MenuItem
        className='account-menu-item'
        sx={{ padding: '14px 10px', borderRadius: '0' }}
        onClick={() => {
          handleClick()
        }}
      >
        <ListItemIcon
          className='account-list-item'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mr: 2,
            color: colors.text.primary
          }}
        >
          <Icon icon={icon} fontSize={15} />
        </ListItemIcon>
        <ListItemText>
          <Typography
            sx={{
              color: colors.text.primary,
              fontSize: fonts.size.px13,
              fontFamily: fonts.inter,
              textTransform: 'capitalize'
            }}
          >
            {status}
          </Typography>
        </ListItemText>
      </MenuItem>
    </>
  )
}

const FilterMenuStatus = ({}) => {
  return (
    <>
      <FilterMenuStatusOption status={EStatusString.PENDING} icon={'mdi:clock'} />
      <FilterMenuStatusOption status={EStatusString.PAID} icon={'mdi:check'} />
      <FilterMenuStatusOption status={EStatusString.UNPAID} icon={'mdi:cancel'} />
    </>
  )
}

export default FilterMenuStatus
