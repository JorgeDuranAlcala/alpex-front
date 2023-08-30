import { FormHeaderMoneyData } from '@/styles/Payments/ReinsurerPayment/reinsurerPayment'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card'

interface CardDistributeBalance {
  setSelectedStatus: React.Dispatch<React.SetStateAction<any>>
  initialStatus: string
  margin?: number
}

export default function CardDistributeBalance() {
  return (
    <Card>
      <div style={{ padding: '20px 20px 0px 20px' }}>
        <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <div className='title-installment' style={{ float: 'left', fontSize: '24px' }}>
              Distribute balance
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormHeaderMoneyData>
              <span className='form-header-money-data-txt'>Available balance</span>
              <span className='form-header-money-data-num'>$100,000 USD</span>
            </FormHeaderMoneyData>
          </Grid>
        </Grid>
      </div>
      <div className='form-secondContainer-wrapper container-padd' style={{ width: '100%' }}>
        <div className='form-secondContainer-wrapper-first-side installments-wrapper' style={{ width: '100%' }}>
          <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
            <Grid item xs={12} sm={3} md={3}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Everest Re Group LTD</span>
                <span className='form-secondContainer-header-subtitle'>$50,000 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Reinsurer Name</span>
                <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Reinsurer Name</span>
                <span className='form-secondContainer-header-subtitle'>0</span>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Card>
  )
}
