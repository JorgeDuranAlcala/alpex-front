import AddRetroCedantView from 'src/views/catalogues/dynamic/add-retrocedant/AddRetroCedantsView'

const AddRetroCedant = () => {
  return (
    <>
      <AddRetroCedantView />
    </>
  )
}

AddRetroCedant.acl = {
  action: 'read',
  subject: 'catalog'
}

export default AddRetroCedant
