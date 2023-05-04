import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import ActionsHeader from 'src/views/accounts/new-account-steps/headers/ActionsHeader';
import Information from 'src/views/accounts/new-account-steps/Information/Information';
import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty';
import Security from 'src/views/accounts/new-account-steps/Security';
import CommentSection from 'src/views/components/new-accounts/CommentSection';
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper';

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
      {/* "ActionsHeader" component receives the initial status of the
      account and in order to use it as a "side header" (forms 2 to 4),
      it is necessary to send the boolean variable "sideHeader = true". */}
      <ActionsHeader accountStatus='PENDING' sideHeader={false} />
      <Card>
        <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
        {activeStep == 1 ? <Information onStepChange={handleStepChange} /> : ""}
        {activeStep == 2 ? <Security /> : ""}
        {activeStep == 3 ? <PaymentWarranty /> : ""}
        {/* <TabAccount /> */}
        {/* <InvoiceList /> */}
      </Card>
      <Card>
        <CommentSection disable={disableComments} />
      </Card>
    </Grid >
  )
}

export default NewAccount
