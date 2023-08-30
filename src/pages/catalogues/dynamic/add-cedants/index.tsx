// ** Context

// ** Custom Components Imports
import AddCedantView from 'src/views/catalogues/dynamic/add-cedant/AddCedantsView'

const AddCedant = () => {
  return (
    <>
      <AddCedantView />
    </>
  )
}

AddCedant.acl = {
  action: 'read',
  subject: 'catalogues'
}

export default AddCedant
