import SearchIcon from '@mui/icons-material/Search'
import { ContainerIcon, ContainerSearch, Input } from 'src/styles/Dashboard/SearchInput/searchInput'
import fonts from 'src/views/accounts/font'

interface ISearch {
  filterName?: string | undefined
}
const SearchInput = ({ filterName }: ISearch) => {
  return (
    <ContainerSearch>
      <ContainerIcon>
        <SearchIcon />
      </ContainerIcon>
      <Input
        placeholder={filterName || 'Search by Insured'}
        sx={{ fontFamily: fonts.inter, fontSize: '16px', fontWeight: 400 }}
      />
    </ContainerSearch>
  )
}

export default SearchInput
