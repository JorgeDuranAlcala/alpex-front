import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Next Import
import { useRouter } from 'next/router'

// ** Custom Components Imports
import Information from 'src/views/accounts/new-account-steps/Information/Information'

import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'
import Security from 'src/views/accounts/new-account-steps/Security'
import ActionsHeader from 'src/views/accounts/new-account-steps/headers/ActionsHeader'
import CommentSection from 'src/views/components/new-accounts/CommentSection'
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper'

// import TabAccount from 'src/views/pages/account-settings/TabAccount'

import Sublimits from 'src/views/accounts/new-account-steps/Sublimits'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const NewAccount = () => {
  // ** Hooks
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(false)
  const [isNewAccount, setIsNewAccount] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState(1)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
    console.log(step)
  }

  const handleIsNewAccountChange = (status: boolean) => {
    setIsNewAccount(status)
  }

  const StepForm = ({ step }: { step: number }) => {
    switch (step) {
      case 1:
        return <Information onStepChange={handleStepChange} onIsNewAccountChange={handleIsNewAccountChange} />
      case 2:
        return <Security onStepChange={handleStepChange} />
      case 3:
        return <PaymentWarranty onStepChange={handleStepChange} />
      case 4:
        return <Sublimits />
      default:
        return <></>
    }
  }

  useEffect(() => {
    const idAccount = router.query.id
    if (idAccount) {
      setIsNewAccount(false)
    }
  }, [router])

  return (
    <Grid className='new-account' item xs={12}>
      {/* "ActionsHeader" component receives the initial status of the
      account and in order to use it as a "side header" (forms 2 to 4),
      it is necessary to send the boolean variable "sideHeader = true". */}
      {activeStep == 1 && isNewAccount ? <ActionsHeader accountStatus='PENDING' sideHeader={false} /> : <FormHeader />}

      <Card>
        <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
        <StepForm step={activeStep} />
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
