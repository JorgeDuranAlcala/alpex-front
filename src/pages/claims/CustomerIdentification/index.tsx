import Contract from '@/views/claims/ContractView/Contract'

const CustomerId = () => {
  return (
    <>
      <Contract />
    </>
  )
}

CustomerId.acl = {
  action: 'viewCustomerId',
  subject: 'claims'
}

export default CustomerId
