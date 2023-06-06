// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import RetroCedantData from '@/views/catalogues/dynamic/add-retrocedant/RetroCedantData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RetroCedantContacts from 'src/views/catalogues/dynamic/add-retrocedant/RetroCedantContacts'

const AddRetroCedantView = () => {
  const router = useRouter()

  const [idRetroCedant, setIdRetroCedant] = useState(0)

  useEffect(() => {
    router.query.id && setIdRetroCedant(parseInt(router.query.id.toString()))
    //eslint-disable-next-line
  }, [router.query])

  return (
    <Grid item xs={12}>
      <Card sx={{ marginBottom: '15px' }}>
        <RetroCedantData idRetroCedant={idRetroCedant} setIdRetroCedant={setIdRetroCedant} />
      </Card>
      <Card>
        <RetroCedantContacts idRetroCedant={idRetroCedant} />
      </Card>
    </Grid>
  )
}

export default AddRetroCedantView
