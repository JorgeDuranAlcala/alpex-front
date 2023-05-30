// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import CedantData from '@/views/catalogues/dynamic/add-cedant/CedantData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CedantContacts from 'src/views/catalogues/dynamic/add-cedant/CedantContacts'

const AddCedantView = () => {
  const router = useRouter()
  const { id = '0' } = router.query

  const [idCedant, setIdCedant] = useState(0)

  useEffect(() => {
    setIdCedant(parseInt(id.toString()))
  }, [id])

  return (
    <Grid item xs={12}>
      <Card sx={{ marginBottom: '15px' }}>
        <CedantData idCedant={idCedant} setIdCedant={setIdCedant} />
      </Card>
      <Card>
        <CedantContacts idCedant={idCedant} />
      </Card>
    </Grid>
  )
}

export default AddCedantView
