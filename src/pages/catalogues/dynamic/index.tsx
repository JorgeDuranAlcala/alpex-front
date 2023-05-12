import { useState } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import ReinsurersTable from '@/views/catalogues/dynamic/reinsurers-table'
import BrokerTable from 'src/views/catalogues/dynamic/broker-table'
import CataloguesTabs from './CataloguesTabs'

const Catalogues = () => {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabChange = (tab: number) => {
    setActiveTab(tab)
    console.log(tab)
  }

  return (

    <Grid item xs={12}>
      <Card>
        <CataloguesTabs onTabChange={handleTabChange}/>
        {activeTab == 1 ? <BrokerTable /> : ''}
        {activeTab == 2 ? <ReinsurersTable /> : ''}
        {activeTab == 3 ? <div>Cedants</div> : ''}
        {activeTab == 4 ? <div>Retro cedants</div> : ''}
        {activeTab == 5 ? <div>Countries & Currencies</div> : ''}
        {activeTab == 6 ? <div>Types of limit</div> : ''}
      </Card>
    </Grid>

  )
}

export default Catalogues
