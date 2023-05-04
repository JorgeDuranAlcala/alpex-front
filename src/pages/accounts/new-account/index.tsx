import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CommentSection from 'src/views/accounts/new-account-steps/CommentSection'

// import Information from 'src/views/accounts/new-account-steps/information'

// import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'

// import TabAccount from 'src/views/pages/account-settings/TabAccount'

import Sublimits from 'src/views/accounts/new-account-steps/Sublimits'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const NewAccount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(true)

  return (
    <Grid className='new-account' item xs={12}>
      <Card>New Account header</Card>
      <Card>
        <div>Accoun Stepper</div>
        {/* <Information /> */}
        {/* <PaymentWarranty /> */}
        {/* <TabAccount /> */}

        <Sublimits />

        {/* <UserList /> */}

        {/* <InvoiceAdd /> */}
      </Card>
      <Card>
        <CommentSection disable={disableComments} />
      </Card>
    </Grid>
  )
}

export default NewAccount
