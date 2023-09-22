import { useState } from 'react'

// ** Context
// import { AccountsTableContextProvider } from 'src/context/accounts/Table/reducer'

// ** Custom Components Imports
import AdjusterTable from 'src/views/catalogues/claims/adjuster/adjuster-table'
import ExpertTable from 'src/views/catalogues/claims/expert/expert-table'
import CataloguesTabs from '@/views/catalogues/claims/CataloguesTabs'

const CataloguesTabView = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handleTabChange = (tab: number) => {
        setActiveTab(tab)
        console.log(tab)
    }

    return (
        <>
            <CataloguesTabs onTabChange={handleTabChange} />
            {activeTab == 1 ? <AdjusterTable /> : ''}
            {activeTab == 2 ? <ExpertTable /> : ''}
        </>

    )
}

export default CataloguesTabView
