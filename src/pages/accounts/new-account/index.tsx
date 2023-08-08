import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Next Import
import { useAppDispatch } from '@/store'
import { useRouter } from 'next/router'

// ** Custom Components Imports
import Information from 'src/views/accounts/new-account-steps/Information/Information'

import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'
import Security from 'src/views/accounts/new-account-steps/Security/SecurityView'

import CommentSection from 'src/views/components/new-accounts/CommentSection'
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper'

// import TabAccount from 'src/views/pages/account-settings/TabAccount'

// import { useGetAccountById } from '@/hooks/accounts/forms'
import MenuForm from '@/pages/menuForm'
import { updateFormsData } from '@/store/apps/accounts'
import FormAddress from '@/views/accounts/new-account-steps/FormAddress'
import Sublimits from '@/views/accounts/new-account-steps/Sublimit/Sublimits'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'
import { useMultiTabButtons } from '@/layouts/components/multiTabButtons/hooks/useMultiTabButtons'
import { stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice'
import { Box, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const NewAccount = () => {
  // ** Hooks
  const router = useRouter()
  const dispatch = useAppDispatch()

  //hooks header
  const { account: accountDetails, getAccountById } = useGetAccountById()


  const { addNewTabButton, removeTabByText } = useMultiTabButtons()

  // const { account, setAccountId } = useGetAccountById()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableComments, setDisableComments] = useState(false)
  const [isNewAccount, setIsNewAccount] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState(1);
  const [isPushingToCreatedAccount, setIsPushingToCreatedAccount] = useState<boolean>(false)

  // const [sidebar, setSidebar] = useState<boolean>(false)
  // const handleSidebarMenu = () => {
  //   setSidebar(!sidebar)
  //   console.log('Hola')
  // }

  // console.log({ account })

  const pushToCreatedAccount = (step: number) => {
    const idAccount = localStorage.getItem('idAccount');
    if (idAccount) {
      setIsPushingToCreatedAccount(true);
      addNewTabButton({
        text: idAccount.toString(),
        link: `/accounts/created-account/?&idAccount=${idAccount}`,
        isActive: true
      });


      removeTabByText('New Account');

      dispatch(stepForms_updateStep({
        id: idAccount,
        data: step,
      }))

      router.push(`/accounts/created-account/?&idAccount=${idAccount}`);

    }
  }


  const handleStepChange = (step: number) => {

    if (step > 1) {
      pushToCreatedAccount(step);

      return;
    }
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
        return <Sublimits getAccountByIdHeader={getAccountById} />

      case 5:
        return <FormAddress />
      default:
        return <></>
    }
  }

  // useEffect(() => {
  //   const idAccount = router.query.id
  //   if (idAccount) {
  //     setIsNewAccount(false)
  //   }
  // }, [router])

  // useEffect(() => {
  //   const idAccount = router.query.id
  //   console.log({ idAccount })
  //   setAccountId(Number(idAccount))
  // }, [router, setAccountId])

  // useEffect(() => {
  //   const formInformation = account?.informations
  //   const formSecurity = account?.securities
  //   const formPayment = account?.installments
  //   const formSublimits = account?.sublimits
  //   if (activeStep == 1 && isNewAccount) {
  //     setActiveStep(1)
  //   } else if (
  //     formInformation?.length !== 0 &&
  //     formSecurity?.length === 0 &&
  //     formPayment?.length === 0 &&
  //     formSublimits?.length === 0
  //   ) {
  //     setActiveStep(1)
  //   } else if (
  //     formInformation?.length !== 0 &&
  //     formSecurity?.length !== 0 &&
  //     formPayment?.length === 0 &&
  //     formSublimits?.length === 0
  //   ) {
  //     setActiveStep(2)
  //   } else if (
  //     formInformation?.length !== 0 &&
  //     formSecurity?.length !== 0 &&
  //     formPayment?.length !== 0 &&
  //     formSublimits?.length === 0
  //   ) {
  //     setActiveStep(3)
  //   } else {
  //     setActiveStep(4)
  //   }
  // }, [])

  useEffect(() => {
    const handleExit = () => {
      localStorage.removeItem('idAccount')
      dispatch(updateFormsData({ form1: { id: null } }))
    }

    const handleRouteChange = (url: string) => {
      if (url !== '/accounts/new-account') {
        console.log('change')
        handleExit()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.events])

  if (isPushingToCreatedAccount) {

    return (
      <Box

      // sx={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '100%'
      // }}
      >
        <CircularProgress size={75} />
      </Box>
    )
  }


  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        {/* "ActionsHeader" component receives the initial status of the
          account and in order to use it as a "side header" (forms 2 to 4),
          it is necessary to send the boolean variable "sideHeader = true". */}
        {/* {activeStep == 1 && isNewAccount ? <ActionsHeader accountStatus='PENDING' sideHeader={false} /> : <FormHeader />} */}
        {activeStep == 1 && isNewAccount ? (
          <FormHeader isNewAccount accountDetails={accountDetails} />
        ) : (
          <FormHeader accountDetails={accountDetails} />
        )}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
            <StepForm step={activeStep} />
            {/* <TabAccount /> */}

            {/* <UserList /> */}

            {/* <InvoiceAdd /> */}
          </Card>
          <div style={{ display: 'none' }}>
            <MenuForm />
          </div>
        </div>
        <Card sx={{ '@media (min-width:809px)': { display: 'none' } }}>
          <div style={{ display: 'flex', height: '50px', padding: '14px', alignItems: 'center' }}>
            <Icon icon={'material-symbols:chat-bubble-outline'} fontSize={24} color='#4D5062' />
          </div>
          <CommentSection disable={disableComments} step={activeStep} />
        </Card>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default NewAccount
