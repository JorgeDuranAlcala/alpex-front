import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Next Import
import { useRouter } from 'next/router'

// NewAccountForms components
import FormAddress from '@/views/accounts/new-account-steps/FormAddress'
import Information, { InformationSectionsInt } from '@/views/accounts/new-account-steps/Information/Information'
import Sublimits from '@/views/accounts/new-account-steps/Sublimit/Sublimits'
import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'
import Security from 'src/views/accounts/new-account-steps/Security/SecurityView'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

//Compnents
import MenuForm from '@/pages/menuForm'
import CommentSection from 'src/views/components/new-accounts/CommentSection'
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper'

//Redux
// import { updateFormsData } from '@/store/apps/accounts'
import { useAppDispatch, useAppSelector } from 'src/store'
import { resetEndorsement } from 'src/store/apps/endorsement'

//Import Custom hooks
import { useGetAccountById } from '@/hooks/accounts/forms'

//Import Context
import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'

// ** Core
import { stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice'

// import FormAddressBound from '@/views/accounts/bound-account-steps/FormAddressBound'
import { Box, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'

export interface AllFormsInterface {
  information: InformationSectionsInt
  security: boolean
  paymentWarranty: boolean
  sublimits: boolean
  sov: boolean
}

const NewAccount = () => {
  // ** Hooks
  const router = useRouter()

  //Redux
  const dispatch = useAppDispatch()
  const endorsementData = useAppSelector(state => state.endorsement.data)

  //Custom Hooks
  const { account: accountDetails, setAccountId, getAccountById } = useGetAccountById()
  console.log({ accountDetails })

  // const { addNewTabButton, removeTabByText } = useMultiTabButtons()

  // const { account, setAccountId } = useGetAccountById()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  //States
  const [disableComments] = useState(false)
  const [isNewAccount, setIsNewAccount] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState(1)

  //States BoundAccount
  const [editInfo, setEditInfo] = useState(false)
  const [canRender, setCanRender] = useState<boolean>(false)
  const [disableFormsSections, setDisableFormsSections] = useState<AllFormsInterface>({
    information: { basicInfo: false, placementStructure: false },
    security: false,
    paymentWarranty: false,
    sublimits: false,
    sov: false
  })

  console.log({ isNewAccount })

  const enableInputsCtrl = () => {
    // Para todos los tipos de cuenta excepto |BOUND|, en este caso siempre estarán activados
    if (accountDetails?.status.toLowerCase() !== 'bound') {
      setDisableFormsSections({
        ...disableFormsSections,
        information: { basicInfo: false, placementStructure: false },
        security: false,
        paymentWarranty: false,
        sublimits: false,
        sov: false
      })
    }

    // Para las cuentas de tipo |BOUND|, esto es para cuando ingresas a tu cuenta |SIN ACTIVAR EL ENDORSEMENT|
    if (accountDetails?.status.toLowerCase() === 'bound' && !endorsementData.initialized) {
      setDisableFormsSections({
        ...disableFormsSections,
        information: { basicInfo: true, placementStructure: true },
        security: true,
        paymentWarranty: true,
        sublimits: true,
        sov: true
      })
    }

    // Para las cuentas de tipo |BOUND| -> |ENDORSEMENT ACTIVADO|
    if (accountDetails?.status.toLowerCase() === 'bound' && endorsementData.initialized && endorsementData.type) {
      const endorsementType = endorsementData.type.toLowerCase()
      if (endorsementType === 'informative') {
        setDisableFormsSections({
          ...disableFormsSections,
          information: { basicInfo: false, placementStructure: true },
          security: true,
          paymentWarranty: true,
          sublimits: true,
          sov: true
        })
      } else if (endorsementType === 'increase' || endorsementType === 'decrease') {
        setDisableFormsSections({
          ...disableFormsSections,
          information: { basicInfo: true, placementStructure: false },
          security: false,
          paymentWarranty: false,
          sublimits: false,
          sov: false
        })
      }
    }
  }

  const handleStepChange = (step: number) => {
    if (accountDetails) {
      dispatch(
        stepForms_updateStep({
          id: accountDetails?.id || 'new account',
          data: step
        })
      )
    }
    setActiveStep(step)
    console.log(step)
  }

  const handleIsNewAccountChange = (status: boolean) => {
    setIsNewAccount(status)
  }

  const selectAccountStepper = () => {
    if (accountDetails?.status.toLowerCase() === 'bound') {
      return <NewAccountStepper isBoundStepper changeStep={activeStep} onStepChange={handleStepChange} />
    } else {
      return <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
    }
  }

  const selectStepForm = () => {
    if (accountDetails?.status.toLowerCase() === 'bound') {
      return <StepForm step={activeStep} isBoundAccountStepper /> //Utilizartemos el mismo stepper para cauando es una cuenta bound
    } else {
      return <StepForm step={activeStep} />
    }
  }

  const StepForm = ({ step, isBoundAccountStepper }: { step: number; isBoundAccountStepper?: boolean }) => {
    switch (step) {
      case 1:
        if (isBoundAccountStepper) {
          return (
            <Information
              isBoundAccount
              disableSectionCtrl={disableFormsSections.information}
              onStepChange={handleStepChange}
            />
          )
        } else {
          return (
            <Information
              onIsNewAccountChange={handleIsNewAccountChange}
              disableSectionCtrl={disableFormsSections.information}
              onStepChange={handleStepChange}
              getIdAccount={(idAccount: number) => setAccountId(idAccount)}
            />
          )
        }
      case 2:
        if (isBoundAccountStepper) {
          return (
            <Security
              isBoundAccount
              onStepChange={handleStepChange}
              disableSectionCtrl={disableFormsSections.security}
            />
          )
        } else {
          return <Security onStepChange={handleStepChange} />
        }
      case 3:
        if (isBoundAccountStepper) {
          return (
            <PaymentWarranty
              isBoundAccount
              onStepChange={handleStepChange}
              disableSectionCtrl={disableFormsSections.paymentWarranty}
            />
          )
        } else {
          return <PaymentWarranty onStepChange={handleStepChange} />
        }
      case 4:
        if (isBoundAccountStepper) {
          return (
            <Sublimits
              isBoundAccount
              onStepChange={handleStepChange}
              disableSectionCtrl={disableFormsSections.sublimits}
            />
          )
        } else {
          return <Sublimits getAccountByIdHeader={getAccountById} />
        }
      case 5:
        if (isBoundAccountStepper) {
          return <FormAddress isBoundAccount disableSectionCtrl={disableFormsSections.sov} />
        } else {
          return <FormAddress />
        }
      default:
        return <></>
    }
  }

  // const StepFormBound = ({ step }: { step: number }) => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <InformationBound disableSectionCtrl={disableFormsSections.information} onStepChange={handleStepChange} />
  //       )
  //     case 2:
  //       return (
  //         <Security isBoundAccount onStepChange={handleStepChange} disableSectionCtrl={disableFormsSections.security} />
  //       )
  //     case 3:
  //       return (
  //         <PaymentWarranty
  //           isBoundAccount
  //           onStepChange={handleStepChange}
  //           disableSectionCtrl={disableFormsSections.paymentWarranty}
  //         />
  //       )
  //     case 4:
  //       return (
  //         <Sublimits
  //           isBoundAccount
  //           onStepChange={handleStepChange}
  //           disableSectionCtrl={disableFormsSections.sublimits}
  //         />
  //       )
  //     case 5:
  //       return <FormAddressBound disableSectionCtrl={disableFormsSections.sov} />
  //     default:
  //       return <></>
  //   }
  // }

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

      // dispatch(updateFormsData({ form1: { id: null } }))
      dispatch(resetEndorsement())
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

  useEffect(() => {
    enableInputsCtrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo, accountDetails?.status, endorsementData.type])

  useEffect(() => {
    if (router.query.idAccount) {
      setAccountId(Number(router.query.idAccount))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.idAccount])

  useEffect(() => {
    if (accountDetails) {
      setCanRender(true)
    }
  }, [accountDetails])

  if (!canRender) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%'
        }}
      >
        <CircularProgress size={75} />
      </Box>
    )
  }

  // if (isPushingToCreatedAccount) {

  //   return (
  //     <Box sx={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       height: '100%',
  //       width: '100%'
  //     }}>
  //       <CircularProgress size={75} />
  //     </Box>
  //   )
  // }

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        <FormHeader setEditInfo={setEditInfo} accountDetails={accountDetails} />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            {selectAccountStepper()}
            {selectStepForm()}
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

NewAccount.acl = {
  action: 'create',
  subject: 'account'
}

export default NewAccount
