import { Icon } from '@iconify/react'
import { Box, Tab, Tabs } from '@mui/material'
import { useEffect, useRef } from 'react'
import { ITabsInfo } from './TabMenu'

interface ITabHeader {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
  tabsInfo: ITabsInfo[]
  setTabsInfo: React.Dispatch<React.SetStateAction<ITabsInfo[]>>
}

const TabHeader = ({ value, handleChange, setValue, tabsInfo, setTabsInfo }: ITabHeader) => {
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const findElementButton = (element: HTMLElement): HTMLElement | null => {
    const children = element.children[0]
    if (children === undefined || children === null) return null
    if (children.tagName === 'BUTTON') return element

    return findElementButton(children as HTMLElement)
  }

  useEffect(() => {
    if (tabsInfo.length === 0) return
    const data = tabsInfo
    data[value].active = true
    setTabsInfo(data)

    const Parent = findElementButton(tabs?.current as HTMLElement)
    const Tabs = Parent?.getElementsByTagName('button') as HTMLCollectionOf<HTMLElement>
    const Tab = Tabs[value] as HTMLElement
    Tab?.click()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (tabsInfo.length === 0) return

    const Parent = findElementButton(tabs?.current as HTMLElement)
    const Tabs = Parent?.getElementsByTagName('button') as HTMLCollectionOf<HTMLElement>
    const Dividers = Parent?.getElementsByTagName('section') as HTMLCollectionOf<HTMLElement>

    //Remove all dividers
    for (let index = 0; index < Dividers.length; index++) {
      const element = Dividers[index]
      element.remove()
    }

    //Insert icon after each button
    for (let index = 0; index < Tabs.length; index++) {
      if (index > 0) {
        const element = Tabs[index]
        const Icon = document.createElement('section')
        Icon.innerHTML = '/'
        Icon.style.marginLeft = '3px'
        Icon.style.marginRight = '3px'
        Icon.style.color = 'rgba(77, 80, 98, 0.68)'
        Icon.style.fontSize = '20px'
        Icon.style.fontWeight = '400'
        const parent = element?.parentNode?.querySelectorAll('section')?.length || 0

        parent < Tabs.length - 1 && element.parentNode?.insertBefore(Icon, element)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabsInfo])

  const tabs = useRef<HTMLDivElement>(null)

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: '20px',
        '@media (min-width: 780px)': {
          position: 'absolute',
          top: '10px'
        }
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <header ref={tabs}>
          <Tabs
            sx={{
              span: {
                display: 'none'
              }
            }}
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            {tabsInfo.map(
              (tab, index) =>
                tab.active && (
                  <Tab
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: '16px',
                      flex: 'none',
                      order: 0,
                      flexGrow: 0,
                      fontSize: '16px',
                      marginRight: '10px',
                      marginLeft: '10px',
                      textTransform: 'none',
                      minHeight: '0px',
                      height: 'fit-content',
                      padding: '5px 10px',

                      '&button': {
                        padding: '2px 0px',
                        minHeight: '0px',
                        height: 'fit-content'
                      },
                      '&.Mui-tab-root': {
                        padding: '2px 0px',
                        minHeight: '0px',
                        height: 'fit-content'
                      },
                      '&.Mui-selected': {
                        color: '#fff',
                        background: '#2535A8'
                      }
                    }}
                    icon={
                      <Icon
                        onClick={() => {
                          alert('close')
                        }}
                        style={{ marginLeft: '10px', display: tab.isDeleteable ? 'block' : 'none' }}
                        icon='mdi:close-circle-outline'
                        fontSize={20}
                      />
                    }
                    iconPosition='end'
                    onClick={() => {
                      setValue(index)
                    }}
                    key={index}
                    label={`${index !== value && index === 0 ? 'Back to' : ''} ${tab.label}`}
                    {...a11yProps(index)}
                  />
                )
            )}
          </Tabs>
        </header>
      </Box>
    </Box>
  )
}

export default TabHeader
