// import { ReactNode } from 'react'

export interface RenderFormGeneric {
  title?: string
  type?: number
  components?: any
  state?: any
  setState?: (data: any) => {}
  deleteForm?: (data: any) => {}
  handleOnChangeForm?: (value: any, index: number) => void
  index?: number
  formInformation: any
  formErrors: any
}

const SublimitCard: React.FC<RenderFormGeneric> = ({ components }: RenderFormGeneric) => {
  return <>{components}</>
}

export default SublimitCard

{
  /* <RadioGroup row sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}>
<FormControlLabel value='None' label='Default' control={<Radio />} />
</RadioGroup> */
}

{
  /* <Input
                  placeholder='0.00'
                  disabled={false}
                  sx={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid rgba(87, 90, 111, 0.22)',
                    '&:before, &:after': { display: 'none' }
                  }}
                  startAdornment={
                    <FormControlLabel sx={{ ml: 0.3 }} value='male' control={<Radio sx={{ mr: -1 }} />} label='' />
                  }
                /> */
}
