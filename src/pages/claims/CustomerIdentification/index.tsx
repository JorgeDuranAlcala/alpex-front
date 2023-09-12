import Claim from '@/views/claims/ClaimView/Claim'
import Contract from '@/views/claims/ContractView/Contract'
import FollowUp from '@/views/claims/FollowUpView/FollowUp'
import Movements from '@/views/claims/MovementsView/Movements'

const CustomerId = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Contract />
      <Claim />
      <Movements />
      <FollowUp />
    </div>
  )
}

CustomerId.acl = {
  action: 'viewCustomerId',
  subject: 'claims'
}

export default CustomerId
