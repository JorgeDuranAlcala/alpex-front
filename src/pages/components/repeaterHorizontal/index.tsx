// ** Types
import { Grid } from '@mui/material'
import { RepeaterProps } from 'src/@core/components/repeater/types'

const RepeaterHorizontal = (props: RepeaterProps) => {
  // ** Props
  const { count, children } = props

  // ** Custom Tag
  // const Tag = tag || 'div'

  // ** Default Items
  const items = []

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  console.log('Items--->', items)

  return (
    <div className='box-repeater'>
      <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} rowSpacing={7} columns={12}>
        {items}
      </Grid>
    </div>
  )
}

export default RepeaterHorizontal

// return (
//   <Tag
//     style={{
//       display: 'grid',
//       width: '100%',
//       maxHeight: '304px',
//       overflowY: 'scroll',
//       gridTemplateColumns: 'repeat(3,1fr)',
//       gridTemplateRows: 'repeat(3,1fr)',
//       gridColumnGap: '10px',
//       gridRowGap: '30px'
//     }}
//     {...props}
//   >
//     {items}
//   </Tag>
// )
