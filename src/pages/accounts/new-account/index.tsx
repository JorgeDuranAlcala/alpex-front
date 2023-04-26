import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CommentSection from 'src/views/accounts/new-account-steps/CommentSection'

// import Information from 'src/views/accounts/new-account-steps/information';
import Security from 'src/views/accounts/new-account-steps/Security'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

const NewAccount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(true)

  return (
    <Grid className='new-account' item xs={12}>
      <Card>
        <FormHeader />
      </Card>
      <Card>
        <div>Accoun Stepper</div>
        <Security />
        {/*<PaymentWarranty />*/}{' '}
      </Card>
      <Card>
        <CommentSection disable={disableComments} />
      </Card>
    </Grid>
  )
}

export default NewAccount
