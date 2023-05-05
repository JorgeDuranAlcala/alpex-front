import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Information from 'src/views/accounts/new-account-steps/Information/Information'
import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'
import Security from 'src/views/accounts/new-account-steps/Security'
import ActionsHeader from 'src/views/accounts/new-account-steps/headers/ActionsHeader'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'
import CommentSection from 'src/views/components/new-accounts/CommentSection'
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper'

// import TabAccount from 'src/views/pages/account-settings/TabAccount'

import Sublimits from 'src/views/accounts/new-account-steps/Sublimits'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const NewAccount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(false)
  const [activeStep, setActiveStep] = useState(1)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
    console.log(step)
  }

  return (
    <Grid className='new-account' item xs={12}>
      {/* "ActionsHeader" component receives the initial status of the
      account and in order to use it as a "side header" (forms 2 to 4),
      it is necessary to send the boolean variable "sideHeader = true". */}
      {activeStep == 1 ? (
        <ActionsHeader accountStatus='PENDING' sideHeader={false} />
      ) : (
        <>
          {' '}
          <FormHeader />
        </>
      )}

      <Card>
        <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
        {activeStep == 1 ? <Information onStepChange={handleStepChange} /> : ''}
        {activeStep == 2 ? <Security onStepChange={handleStepChange} /> : ''}
        {activeStep == 3 ? <PaymentWarranty /> : ''}
        {activeStep == 4 ? <Sublimits /> : ''}

        {/* <TabAccount /> */}

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
