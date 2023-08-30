// ** MUI Imports
// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddBrokerView from 'src/views/catalogues/dynamic/add-broker/AddBrokerView'

const AddBroker = () => {
  return (
    <>
      <AddBrokerView/>
    </>
  )
}

AddBroker.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default AddBroker
