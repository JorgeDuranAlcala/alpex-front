// import { ReactNode } from 'react'

import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'

interface FormErrors {
  sublimit: string
  at100: string
  deductible: string
  amount: string
  min: string
  coinsurance: string
  yes: string
  luc: string
  typeBi: string
  typeDeductible: string
  daysBi: string
  idCCoverage: string
  amountBi: string
  idCDeductiblePer: string
}

export interface RenderFormGeneric {
  title?: string
  type?: number
  components?: any
  state?: any
  setState?: (data: any) => {}
  handleOnDeleteForm: (index: number) => void
  handleOnChangeByInputForm: (index: number, { name, value }: { name: keyof SublimitDto; value: any }) => void
  index?: number
  formInformation?: any
  formErrors: FormErrors
  data?: Partial<SublimitDto>
}

const SublimitCard = ({ components }: { components?: any }) => {
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
