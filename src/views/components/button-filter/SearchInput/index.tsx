import SearchIcon from '@mui/icons-material/Search'
import { ContainerIcon, ContainerSearch, Input } from 'src/styles/Dashboard/SearchInput/searchInput'
import fonts from 'src/views/accounts/font'

const SearchInput = () => {
  return (
    <ContainerSearch>
      <ContainerIcon>
        <SearchIcon />
      </ContainerIcon>
      <Input placeholder='Search by Insured' sx={{ fontFamily: fonts.inter, fontSize: '16px', fontWeight: 400 }} />
    </ContainerSearch>
  )
}

export default SearchInput
