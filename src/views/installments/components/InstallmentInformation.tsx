import StatusInstallment from './StatusInstallment'

interface InstallmentInformation {
  st?: any
  id?: string | undefined
}

export default function InstallmentInformation({ st, id }: InstallmentInformation) {
  return (
    <div id={id} className='form-secondContainer-wrapper'>
      <div className='form-secondContainer-wrapper-first-side installments-wrapper'>
        <div className='form-secondContainer-first' style={{ marginRight: '20px' }}>
          <span className='form-secondContainer-header-title'>Status</span>
          <StatusInstallment status={st} />
        </div>

        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Installment ID</span>
          <span className='form-secondContainer-header-subtitle'>#0</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Due Date</span>
          <span className='form-secondContainer-header-subtitle'>10 / 01 / 2023</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Payment Date</span>
          <span className='form-secondContainer-header-subtitle'>NA</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Balance Due</span>
          <span className='form-secondContainer-header-subtitle'>$100,000 USD</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Payment</span>
          <span className='form-secondContainer-header-subtitle'>NA</span>
        </div>
        <div className='form-secondContainer-second'>
          <span className='form-secondContainer-header-title'>Balance</span>
          <span className='form-secondContainer-header-subtitle'>0</span>
        </div>
      </div>
    </div>
  )
}
