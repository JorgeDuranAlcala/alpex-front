// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { Box, Button } from '@mui/material';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Styled Components imports
import fonts from 'src/views/accounts/font';


interface ITableHeader {
  onDeleteRows?: () => void;
  deleteBtn?: boolean;
  onSearch: (value: string) => void;
  onClickBtn:() => void
  textBtn: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableHeader: React.FC<ITableHeader> = ({ onDeleteRows, deleteBtn = false, onSearch, onClickBtn, textBtn }) => {
  // ** Custom Hooks
  const [search, setSearch] = useState('')

  // const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };


return (
    <Box
      className='header-wrapper'
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}
    >
      <Box className='header-item'>
        <div className='search-wrapper'>
          <input
          className='input-search'
          placeholder='Search'
          value={search}
          style={{ fontFamily: fonts.inter }}
          onChange={searchInputChange} />
        </div>
      </Box>
      {deleteBtn ? <Box className='header-item '>
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

      <Box className='header-item ' sx={{ marginLeft: 'auto' }}>
        <Button className='action-button' sx={{ mb: 2 }} variant='contained' onClick={onClickBtn}>
          {textBtn} &nbsp; <Icon icon='mdi:plus' />
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
