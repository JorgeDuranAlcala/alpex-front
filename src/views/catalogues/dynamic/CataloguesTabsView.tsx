import { useState } from 'react'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import ReinsurersTable from '@/views/catalogues/dynamic/reinsurers-table'
import BrokerTable from 'src/views/catalogues/dynamic/broker-table'
import CedantsTable from 'src/views/catalogues/dynamic/cedants-table'
import CountriesCurrencies from 'src/views/catalogues/dynamic/countries-currencies'
import RetroCedantsTable from 'src/views/catalogues/dynamic/retrocedants-table'
import TypesOfLimit from 'src/views/catalogues/dynamic/types-of-limit'
import CataloguesTabs from '../../../views/catalogues/dynamic/CataloguesTabs'

const CataloguesTabView = () => {
  const [activeTab, setActiveTab] = useState(1)

  const handleTabChange = (tab: number) => {
    setActiveTab(tab)
    console.log(tab)
  }

  return (
    <>
      <CataloguesTabs onTabChange={handleTabChange} />
      {activeTab == 1 ? <BrokerTable /> : ''}
      {activeTab == 2 ? <ReinsurersTable /> : ''}
      {activeTab == 3 ? <CedantsTable /> : ''}
      {activeTab == 4 ? <RetroCedantsTable /> : ''}
      {activeTab == 5 ? <CountriesCurrencies /> : ''}
      {activeTab == 6 ? <TypesOfLimit /> : ''}

    </>

  )
}

export default CataloguesTabView
