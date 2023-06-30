import { Button } from '@mui/material'
import { useState } from 'react'

const MenuForm = () => {
  const [sidebar, setSidebar] = useState<boolean>(false)

  const handleSidebarMenu = () => {
    setSidebar(!sidebar)
    console.log('Hola')
  }

  return (
    <>
      <Button onClick={handleSidebarMenu}>Click</Button>
      <nav className={sidebar ? 'container' : 'containerHold'}></nav>
    </>
  )
}

export default MenuForm
