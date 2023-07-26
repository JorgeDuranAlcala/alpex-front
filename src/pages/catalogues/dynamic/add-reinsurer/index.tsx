
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddReinsurerView from 'src/views/catalogues/dynamic/add-reinsurer/AddReinsurerView'

const AddReinsurer = () => {

  return (
    <>
      <AddReinsurerView/>
    </>
  )
}

AddReinsurer.acl = {
  action: 'read',
  subject: 'catalog'
}

export default AddReinsurer
