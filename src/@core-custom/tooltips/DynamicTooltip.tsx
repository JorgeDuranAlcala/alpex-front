import { SxProps, Tooltip, TooltipProps, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface DynamicTooltipProps {
  name: string
  sx?: SxProps
  placement?: TooltipProps['placement']
}

export const DynamicTooltip = ({ name, placement = 'top', sx }: DynamicTooltipProps) => {
  const [hoverStatus, setHover] = useState(false)
  const textElementRef = useRef<HTMLDivElement | null>(null)

  const compareSize = () => {
    if (!textElementRef.current) return

    const compare = textElementRef.current.scrollWidth > textElementRef.current.clientWidth

    setHover(compare)
  }
  useEffect(() => {
    compareSize()
  }, [])

  return (
    <Tooltip title={name} disableHoverListener={!hoverStatus} placement={placement} arrow>
      <Typography component='span' ref={textElementRef} noWrap sx={sx}>
        {name}
      </Typography>
    </Tooltip>
  )
}
