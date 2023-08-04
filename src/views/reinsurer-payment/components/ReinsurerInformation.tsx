import TextField from '@mui/material/TextField'

interface ReinsurerInfo {
  margin?: number
}

export default function ReinsurerInfo({}: any) {
  return (
    <div>
      <div className='wrapper-installments'>
        <div>
          <div className='width-full'>
            <TextField
              fullWidth
              autoFocus
              name='grossPremium'
              label='Gross Premium per Share'
              defaultValue=''
              value=''
            />
          </div>
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='sharePercent' label='Share %' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='shareMount' label='Share $' defaultValue='' value='' />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='netPremium' label='Net Premium' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField
            fullWidth
            autoFocus
            name='netPremiumTaxes'
            label='Net Premium with Taxes'
            defaultValue=''
            value=''
          />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField
            fullWidth
            autoFocus
            name='reinsurancePercent'
            label='Reinsurance Brokerage %'
            defaultValue=''
            value=''
          />
        </div>
        <div className='width-full'>
          <TextField
            fullWidth
            autoFocus
            name='reinsuranceBrokerage'
            label='Reinsurance Brokerage'
            defaultValue=''
            value=''
          />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='dynamicPercent' label='Dynamic Commission %' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='dynamicCommission' label='Dynamic Commission' defaultValue='' value='' />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='taxesPercent' label='Taxes %' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='taxes' label='Taxes' defaultValue='' value='' />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='frontingPercent' label='Fronting Fee %' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='frontingFee' label='Fronting Fee' defaultValue='' value='' />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='discountPercet' label='Discount %' defaultValue='' value='' />
        </div>
        <div className='width-full'>
          <TextField fullWidth autoFocus name='discount' label='Discount' defaultValue='' value='' />
        </div>
      </div>
      <div className='wrapper-installments'>
        <div className='width-full'>
          <TextField
            fullWidth
            autoFocus
            name='brokerFrontingFeePercent'
            label='Broker Fronting Fee %'
            defaultValue=''
            value=''
          />
        </div>
        <div className='width-full'>
          <TextField
            fullWidth
            autoFocus
            name='brokerFrontingFee'
            label='Broker Fronting Fee'
            defaultValue=''
            value=''
          />
        </div>
      </div>
    </div>
  )
}
