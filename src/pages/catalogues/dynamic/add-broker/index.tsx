// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AddBroker from 'src/views/catalogues/dynamic/add-broker/AddBroker'
import BrokerContacts from 'src/views/catalogues/dynamic/add-broker/BrokerContacts'

const AddBrokerView = () => {
  const router = useRouter()
  const { id = '0' } = router.query

  const [idBroker, setIdBroker] = useState(0)

  useEffect(() => {
    setIdBroker(parseInt(id.toString()))
  }, [id])

  return (
    <Grid item xs={12}>
      <Card sx={{ marginBottom: '15px' }}>
        <AddBroker idBroker={idBroker} setIdBroker={setIdBroker} />
      </Card>
      <Card>
        <BrokerContacts idBroker={idBroker} />
      </Card>
    </Grid>
  )
}

export default AddBrokerView
