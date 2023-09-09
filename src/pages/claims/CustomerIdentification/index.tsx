import Claim from '@/views/claims/ClaimView/Claim'
import Contract from '@/views/claims/ContractView/Contract'

const CustomerId = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Contract />
      <Claim />
    </div>
  )
}

CustomerId.acl = {
  action: 'viewCustomerId',
  subject: 'claims'
}

export default CustomerId
