// import AlertAddUser from '@/views/users/AlertUserAdded'
import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <>
      {/* <AlertAddUser /> */}
      {value === index && (
        <div
          role='tabpanel'
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        </div>
      )}
    </>
  )
}
