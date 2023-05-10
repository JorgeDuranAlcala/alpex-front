// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Box, Button } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components imports
import fonts from 'src/views/accounts/font'




interface ITableHeader {
  onDeleteRows?: () => void
  onSearch: (value: string) => void;
  onClickBtn:() => void
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableHeader: React.FC<ITableHeader> = ({ onDeleteRows, onSearch, onClickBtn }) => {
  // ** Custom Hooks
  const [search, setSearch] = useState('')

  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };



return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      <Box>
        <div className='search-wrapper'>
          <input
          className='input-search'
          placeholder='Search'
          value={search}
          style={{ fontFamily: fonts.inter }}
          onChange={searchInputChange} />
        </div>
      </Box>
      {onDeleteRows ? <Box>
        <Button
          className='delete-button'
          onClick={onDeleteRows}
          variant='outlined'
        >
          <div className='btn-icon'>
            <Icon icon='mdi:delete-outline' />
          </div>
          DELETE
        </Button>

      </Box> : ''}

      <Box sx={{ marginLeft: 'auto' }}>
        <Button sx={{ mb: 2 }} variant='contained' onClick={onClickBtn}>
          ADD NEW BROKER &nbsp; <Icon icon='mdi:plus' />
        </Button>
      </Box>

      {/* <Box sx={{ marginLeft: 'auto' }}>
        {!badgeData.status ? (
          <Button sx={{ mb: 2 }} variant='contained' onClick={() => router.push('/accounts/new-account')}>
            ADD ACCOUNT &nbsp; <Icon icon='mdi:plus' />
          </Button>
        ) : (
          <CustomAlert {...badgeData} />
        )}
      </Box> */}
    </Box>
  )
}

export default TableHeader
