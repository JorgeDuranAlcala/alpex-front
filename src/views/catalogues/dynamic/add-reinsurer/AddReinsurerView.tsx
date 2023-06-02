// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import ReinsurerData from '@/views/catalogues/dynamic/add-reinsurer/ReinsurerData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReinsurerBinders from 'src/views/catalogues/dynamic/add-reinsurer/ReinsurerBinders'
import ReinsurerContacts from 'src/views/catalogues/dynamic/add-reinsurer/ReinsurerContacts'

const AddReinsurerView = () => {
  const router = useRouter()
  const { id = '0' } = router.query

  const [idReinsuranceCompany, setIdReinsuranceCompany] = useState(0)

  useEffect(() => {
    setIdReinsuranceCompany(parseInt(id.toString()))
  }, [id])

  return (
    <Grid item xs={12}>
      <Card sx={{ marginBottom: '15px' }}>
        <ReinsurerData idReinsuranceCompany={idReinsuranceCompany} setIdReinsuranceCompany={setIdReinsuranceCompany} />
      </Card>
      <Card sx={{ marginBottom: '15px' }}>
        <ReinsurerContacts idReinsuranceCompany={idReinsuranceCompany} />
      </Card>
      <Card>
        <ReinsurerBinders />
      </Card>
    </Grid>
  )
}

export default AddReinsurerView
