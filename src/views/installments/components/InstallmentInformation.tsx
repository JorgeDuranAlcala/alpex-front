import Grid from '@mui/material/Grid'
import StatusInstallment from './StatusInstallment'

interface InstallmentInformation {
  st?: any
  id?: string | undefined
}

export default function InstallmentInformation({ st, id }: InstallmentInformation) {
  return (
    <div id={id} className='form-secondContainer-wrapper'>
      <div
        className='form-secondContainer-wrapper-first-side installments-wrapper'
        style={{ width: '100%', height: 'auto' }}
      >
        <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
          <Grid item xs={12} md={1.3} sm={3}>
            <div className='form-secondContainer-first' style={{ width: 'auto' }}>
              <span className='form-secondContainer-header-title'>Status</span>
              <StatusInstallment status={st} />
            </div>
          </Grid>
          <Grid item xs={12} md={1.7} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Installment ID</span>
              <span className='form-secondContainer-header-subtitle'>#0</span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Due Date</span>
              <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Payment Date</span>
              <span className='form-secondContainer-header-subtitle'>NA</span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Balance Due</span>
              <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
            </div>
          </Grid>
          <Grid item xs={12} md={1.3} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Payment</span>
              <span className='form-secondContainer-header-subtitle'>NA</span>
            </div>
          </Grid>
          <Grid item xs={12} md={1.7} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Outstanding</span>
              <span className='form-secondContainer-header-subtitle'>0</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
