import { TitleH6 } from '@/views/arap/_commons/styles/TableHeader'
import { Icon } from '@iconify/react'
import { Box, Collapse, IconButton, IconButtonProps, styled } from '@mui/material'
import { ReactNode, useState } from 'react'

interface CollapsibleContentProps {
  title: string | ReactNode
  children: ReactNode
  isExpanded?: boolean
  color?: string
  fontSize?: string
}

export const CollapsibleContent = ({
  title,
  children,
  isExpanded,
  color = '#4d5062de',
  fontSize = '24px'
}: CollapsibleContentProps) => {
  const [expanded, setExpanded] = useState(isExpanded || false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', mb: '20px' }}>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
          <Icon icon='tabler:chevron-down' fontSize={fontSize} color={color} />
        </ExpandMore>

        <Box onClick={handleExpandClick} sx={{ cursor: 'pointer' }}>
          {typeof title === 'string' ? <TitleH6 sx={{ color }}>{title}</TitleH6> : title}
        </Box>
      </Box>
      <Collapse in={expanded} timeout='auto'>
        {children}
      </Collapse>
    </Box>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',

  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))
