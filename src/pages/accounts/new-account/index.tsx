import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import CommentSection from 'src/views/components/new-accounts/CommentSection';

import Information from 'src/views/accounts/new-account-steps/information';

// import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty';


const NewAccount = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(false)

  return (
    <Grid className="new-account" item xs={12}>
      <Card>
        New Account header
      </Card>
      <Card>
        <Information/>
        {/* <PaymentWarranty /> */}
      </Card>
      <Card>
        <CommentSection disable={disableComments}/>
      </Card>
    </Grid>
  )
}

export default NewAccount
