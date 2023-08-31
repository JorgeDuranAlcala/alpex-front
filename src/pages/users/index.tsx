// ** MUI Imports
import { useAppSelector } from '@/store'
import { setUIUserNotification } from '@/store/apps/user/uiUserSlice'
import { handleSelectUser } from '@/store/apps/users'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TabHeader from 'src/views/custom/tabMenu/TabHeader'
import TabMenu, { ITabsInfo } from 'src/views/custom/tabMenu/TabMenu'
import NotificationOnSubmitUser from 'src/views/users/NotificationOnSubmitUser'
import AddUser from 'src/views/users/forms/AddUser'
import Table from 'src/views/users/table'

const Users = () => {
  const [selectUser, setSelectUser] = useState<number | null>(null)
  const [value, setValue] = useState(0)
  const [tabsInfo, setTabsInfo] = useState<ITabsInfo[]>([])
  const { notification } = useAppSelector((state) => state.uiUserSlice)
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

  if (notification.isOpen) {
    setTimeout(() => {
      dispatch(setUIUserNotification({
        isOpen: false,
        type: null,
      }))
    }, 4000)
  }




  useEffect(() => {

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
            <AddUser selectUser={false} title={'Add User'} subTitle={'add user'} handleView={setValue} />
          </>
        )
      },
      {
        label: 'Edit User',
        active: true,
        isDeleteable: true,
        component: (
          <>
            <AddUser selectUser={true} title={'User Details'} subTitle={'edit user'} handleView={setValue} />
          </>
        )
      }
    ]
    setTabsInfo(tabsInfoMock)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Grid item xs={12} sx={{ minHeight: '100%', position: 'relative' }}>
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

        {/* <NotificationOnSubmitUser type='error' /> */}
        {
          notification.isOpen && notification.type ?
            <NotificationOnSubmitUser type={notification.type} message={notification.message} />
            : null}
      </Grid>
    </>
  )
}

Users.acl = {
  action: 'read',
  subject: 'users'
}

export default Users
