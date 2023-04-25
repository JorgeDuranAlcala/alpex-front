// ** Types
import { RepeaterProps } from 'src/@core/components/repeater/types'

const RepeaterHorizontal = (props: RepeaterProps) => {
  // ** Props
  const { count, tag, children } = props

  // ** Custom Tag
  const Tag = tag || 'div'

  // ** Default Items
  const items = []

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  return (
    <Tag
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '2%',
        height: '304px'
      }}
      {...props}
    >
      {items}
    </Tag>
  )
}

export default RepeaterHorizontal
