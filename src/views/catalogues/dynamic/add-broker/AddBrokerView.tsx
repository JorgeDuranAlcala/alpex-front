// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import BrokerContacts from 'src/views/catalogues/dynamic/add-broker/BrokerContacts'
import BrokerData from 'src/views/catalogues/dynamic/add-broker/BrokerData'

const AddBrokerView = () => {
  const router = useRouter()
  const [idBroker, setIdBroker] = useState(0)

  useEffect(() => {
    router.query.id && setIdBroker(parseInt(router.query.id.toString()))
    //eslint-disable-next-line
  }, [router.query])

  return (
    <Grid item xs={12}>
      <Card sx={{ marginBottom: '15px' }}>
        <BrokerData idBroker={idBroker} setIdBroker={setIdBroker} />
      </Card>
      <Card>
        <BrokerContacts idBroker={idBroker} />
      </Card>
    </Grid>
  )
}

export default AddBrokerView
