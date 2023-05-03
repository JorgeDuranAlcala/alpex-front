import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import Information from 'src/views/accounts/new-account-steps/Information/Information';
import CommentSection from 'src/views/components/new-accounts/CommentSection';
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper';

// import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty';

// import TabAccount from 'src/views/pages/account-settings/TabAccount'

// import InvoiceList from 'src/pages/apps/invoice/list'

const NewAccount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(false)
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    console.log(step)
  };

  return (
    <Grid className='new-account' item xs={12}>
      <Card>New Account header</Card>
      <Card>
       <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange}/>
       <Information onStepChange={handleStepChange}/>
        {/* <PaymentWarranty /> */}
        {/* <TabAccount /> */}
        {/* <InvoiceList /> */}
      </Card>
      <Card>
        <CommentSection disable={disableComments} />
      </Card>
    </Grid>
  )
}

export default NewAccount
