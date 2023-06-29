import { Box, Button, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'

const MenuForm = () => {
  const theme = useTheme()
  const [sidebar, setSidebar] = useState<boolean>(false)
  const handleSidebarMenu = () => {
    setSidebar(!sidebar)
    console.log('Hola')
  }

  return (
    <>
      <Button onClick={handleSidebarMenu}>Click</Button>
      <nav className={sidebar ? 'container-sideBar' : 'containerHold-sideBar'}>
        <div className='container-arrow' onClick={handleSidebarMenu}>
          <Box
            width={22}
            fill='none'
            height={22}
            component='svg'
            viewBox='0 0 22 22'
            xmlns='http://www.w3.org/2000/svg'
            sx={{
              transition: 'transform .25s ease-in-out .35s'
            }}
          >
            <path
              fill={theme.palette.text.secondary}
              d='M11.4854 4.88844C11.0082 4.41121 10.2344 4.41121 9.75716 4.88844L4.51029 10.1353C4.03299 10.6126 4.03299 11.3865 4.51029 11.8638L9.75716 17.1107C10.2344 17.5879 11.0082 17.5879 11.4854 17.1107C11.9626 16.6334 11.9626 15.8597 11.4854 15.3824L7.96674 11.8638C7.48943 11.3865 7.48943 10.6126 7.96674 10.1353L11.4854 6.61667C11.9626 6.13943 11.9626 5.36568 11.4854 4.88844Z'
            />
            <path
              fill={theme.palette.text.disabled}
              d='M15.8683 4.88844L10.6214 10.1353C10.1441 10.6126 10.1441 11.3865 10.6214 11.8638L15.8683 17.1107C16.3455 17.5879 17.1193 17.5879 17.5965 17.1107C18.0737 16.6334 18.0737 15.8597 17.5965 15.3824L14.0779 11.8638C13.6005 11.3865 13.6005 10.6126 14.0779 10.1353L17.5965 6.61667C18.0737 6.13943 18.0737 5.36568 17.5965 4.88844C17.1193 4.41121 16.3455 4.41121 15.8683 4.88844Z'
            />
          </Box>
        </div>

        <div className='container-divider'>
          <Divider textAlign='center' variant='middle' sx={{ width: sidebar ? '11px' : '90%' }} />
        </div>

        <div className='container-docs'>
          <Icon icon={'mdi:folder-outline'} fontSize={24} color='#4D5062' />
        </div>
        <div className='container-divider'>
          <Divider textAlign='center' variant='middle' sx={{ width: sidebar ? '11px' : '90%' }} />
        </div>
        <div className='container-comments'>
          <Icon icon={'material-symbols:chat-bubble-outline'} fontSize={24} color='#4D5062' />
        </div>
      </nav>
    </>
  )
}

export default MenuForm
