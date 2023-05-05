// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import AddUser from 'src/views/users/forms/AddUser'

import Table from 'src/views/users/table'

const Users = () => {
  const [view, setView] = useState('list')
  const [selectUser, setSelectUser] = useState<number | null>(null)
  const [modalShow, setModalShow] = useState<boolean>(false)

  const handleView = (view: string) => {
    setView(view)
  }

  const handleSelectUser = (id: number | null) => {
    setSelectUser(id)
    setView('add')
  }

  return (
    <Grid item xs={12} sx={{ minHeight: '100%' }}>
      <Card sx={{ minHeight: '100%', padding: '16px' }}>
        {view === 'add' && <AddUser selectUser={selectUser} handleView={handleView} />}
        {view === 'list' && (
          <Table
            modalShow={modalShow}
            setModalShow={setModalShow}
            setSelectUser={handleSelectUser}
            handleView={handleView}
          />
        )}
      </Card>
    </Grid>
  )
}

export default Users
