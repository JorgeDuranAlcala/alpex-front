import Grid from '@mui/material/Grid'
import StatusInstallment from './StatusInstallment'

interface InstallmentInformation {
  st?: any
  id?: string | undefined
  dueDate?: string | undefined
  paymentDate?: string | undefined
  balanceDue?: string | '0'
  payment?: number | 0
  outstanding?: number | 0
}

export default function InstallmentInformation({
  st,
  id,
  dueDate,
  paymentDate,
  balanceDue,
  payment,
  outstanding
}: InstallmentInformation) {
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
              <span className='form-secondContainer-header-subtitle'>#{id} </span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Due Date</span>
              <span className='form-secondContainer-header-subtitle'>{dueDate}</span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Payment Date</span>
              <span className='form-secondContainer-header-subtitle'>{paymentDate}</span>
            </div>
          </Grid>
          <Grid item xs={12} md={2} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Balance Due</span>
              <span className='form-secondContainer-header-subtitle'>{balanceDue}</span>
            </div>
          </Grid>
          <Grid item xs={12} md={1.3} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Payment</span>
              <span className='form-secondContainer-header-subtitle'>{payment}</span>
            </div>
          </Grid>
          <Grid item xs={12} md={1.7} sm={3}>
            <div className='form-secondContainer-second'>
              <span className='form-secondContainer-header-title'>Outstanding</span>
              <span className='form-secondContainer-header-subtitle'>{outstanding}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
