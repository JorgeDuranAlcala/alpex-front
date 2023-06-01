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
  const { id = '0' } = router.query

  const [idRetroCedant, setIdRetroCedant] = useState(0)

  useEffect(() => {
    setIdRetroCedant(parseInt(id.toString()))
  }, [id])

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
