// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import Table from 'src/views/users/Table'
import AddUser from 'src/views/users/forms/AddUser'

const Users = () => {
  const [view, setView] = useState('list')

  const handleView = (view: string) => {
    setView(view)
  }

  return (
    <Grid item xs={12} sx={{ minHeight: '100%' }}>
      <Card sx={{ padding: '16px', minHeight: '100%' }}>
        {view === 'add' && <AddUser handleView={handleView} />}
        {view === 'list' && <Table handleView={handleView} />}
      </Card>
    </Grid>
  )
}

export default Users
