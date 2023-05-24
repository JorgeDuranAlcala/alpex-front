// ** MUI Imports
import { handleSelectUser } from '@/store/apps/users'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TabHeader from 'src/views/custom/tabMenu/TabHeader'
import TabMenu, { ITabsInfo } from 'src/views/custom/tabMenu/TabMenu'
import AddUser from 'src/views/users/forms/AddUser'
import Table from 'src/views/users/table'

const Users = () => {
  const [selectUser, setSelectUser] = useState<number | null>(null)
  const [value, setValue] = useState(0)
  const [tabsInfo, setTabsInfo] = useState<ITabsInfo[]>([])
  const dispatch = useDispatch()

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleSelectUserFunc = (id: number | null) => {
    setSelectUser(id)
    setValue(2)
    dispatch(handleSelectUser(id))
  }

  useEffect(() => {
    console.log(selectUser)
  }, [selectUser])

  const tabsInfoMock: ITabsInfo[] = [
    {
      label: 'Users',
      active: true,
      component: (
        <>
          <Table setSelectUser={handleSelectUserFunc} handleView={setValue} />
        </>
      )
    },
    {
      label: 'New user',
      active: true,
      component: (
        <>
          <AddUser selectUser={false} title={'Add User'} subTitle={'add user'} />
        </>
      )
    },
    {
      label: 'Edit User',
      active: true,
      isDeleteable: true,
      component: (
        <>
          <AddUser selectUser={true} title={'User Details'} subTitle={'edit user'} />
        </>
      )
    }
  ]

  useEffect(() => {
    setTabsInfo(tabsInfoMock)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid item xs={12} sx={{ minHeight: '100%' }}>
        <TabHeader
          setTabsInfo={setTabsInfo}
          setValue={setValue}
          value={value}
          handleChange={handleChange}
          tabsInfo={tabsInfo}
        />

        <Card sx={{ minHeight: '100%' }}>
          <TabMenu value={value} tabsInfo={tabsInfo} />
        </Card>
      </Grid>
    </>
  )
}

export default Users
