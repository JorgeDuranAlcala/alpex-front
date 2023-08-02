import Card from '@mui/material/Card'

interface CardDistributeBalance {
  setSelectedStatus: React.Dispatch<React.SetStateAction<any>>
  initialStatus: string
  margin?: number
}

export default function CardDistributeBalance() {
  return (
    <Card>
      <div className='container-padd'>
        <div className='title-installment' style={{ float: 'left' }}>
          Distribute balance
        </div>
        <div className='form-header-money-data'>
          <span className='form-header-money-data-txt'>Available balance</span>
          <span className='form-header-money-data-num'>$100,000 USD</span>
        </div>
      </div>
      <div className='form-secondContainer-wrapper container-padd'>
        <div className='form-secondContainer-wrapper-first-side installments-wrapper'>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>Everest Re Group LTD</span>
            <span className='form-secondContainer-header-subtitle'>$50,000 USD</span>
          </div>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>Reinsurer Name</span>
            <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
          </div>
          <div className='form-secondContainer-second'>
            <span className='form-secondContainer-header-title'>Reinsurer Name</span>
            <span className='form-secondContainer-header-subtitle'>0</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
