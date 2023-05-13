import TabPanel from './components/TabPanel'

export interface ITabsInfo {
  label: string
  active: boolean
  component: JSX.Element
  isDeleteable?: boolean
}

interface ITabMenu {
  value: number
  tabsInfo: ITabsInfo[]
}

const TabMenu = ({ value, tabsInfo }: ITabMenu) => {
  return (
    <>
      {tabsInfo.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </>
  )
}

export default TabMenu
