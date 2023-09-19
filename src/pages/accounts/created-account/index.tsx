import { useEffect, useState } from 'react'

// ** MUI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Next
import { useRouter } from 'next/router'

// ** Views
// Bound
import InformationBound, {
  InformationSectionsInt
} from '@/views/accounts/bound-account-steps/Information/InformationBound'
import FormAddressBound from 'src/views/accounts/bound-account-steps/FormAddressBound'
import PaymentWarrantyBound from 'src/views/accounts/bound-account-steps/PaymentWarrantyBound'
import SecurityBound from 'src/views/accounts/bound-account-steps/Security/SecurityViewBound'
import SublimitsBound from 'src/views/accounts/bound-account-steps/SublimitsBound'

// NewAccount
import FormAddress from '@/views/accounts/new-account-steps/FormAddress'
import Information from '@/views/accounts/new-account-steps/Information/Information'
import Sublimits from '@/views/accounts/new-account-steps/Sublimit/Sublimits'
import PaymentWarranty from 'src/views/accounts/new-account-steps/PaymentWarranty'
import Security from 'src/views/accounts/new-account-steps/Security/SecurityView'
import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

// import ChangeStepForm from 'src/views/accounts/ChangeStepForm'

// ** Components
import MenuForm from '@/pages/menuForm'
import BoundAccountStepper from '@/views/components/bound-account/BoundAccountStepper'
import CommentSection from 'src/views/components/new-accounts/CommentSection'
import NewAccountStepper from 'src/views/components/new-accounts/NewAccountStepper'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/store'
import { resetEndorsement } from 'src/store/apps/endorsement'

// ** Context
import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'

// ** Custom hooks
import { useGetAccountById } from '@/hooks/accounts/forms'

// ** Core
import { stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice'
import { Box, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'

export interface AllFormsInterface {
  information: InformationSectionsInt
  security: boolean
  paymentWarranty: boolean
  sublimits: boolean
  sov: boolean
}

const CreatedAccount = () => {
  // Hooks
  const router = useRouter()

  // Redux
  const dispatch = useAppDispatch()
  const endorsementData = useAppSelector(state => state.endorsement.data)

  // Custom Hooks
  const { account: accountDetails, setAccountId, getAccountById } = useGetAccountById()

  console.log({ accountDetails })

  // const { isLoading, account: accountDetails, setAccountId, getAccountById } = useGetAccountById()

  // console.log({ accountDetails })

  // States
  const [disableComments] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [editInfo, setEditInfo] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNewAccount, setIsNewAccount] = useState<boolean>(true)
  const [disableFormsSections, setDisableFormsSections] = useState<AllFormsInterface>({
    information: { basicInfo: false, placementStructure: false },
    security: false,
    paymentWarranty: false,
    sublimits: false,
    sov: false
  })
  const [canRender, setCanRender] = useState<boolean>(false)

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
    dispatch(
      stepForms_updateStep({
        id: accountDetails?.id || 'new account',
        data: step
      })
    )

    setActiveStep(step)
  }

  const handleIsNewAccountChange = (status: boolean) => {
    setIsNewAccount(status)
  }

  const selectAccountStepper = () => {
    if (accountDetails?.status.toLowerCase() === 'bound') {
      return <BoundAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
    } else {
      return <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
    }
  }

  const selectStepForm = () => {
    if (accountDetails?.status.toLowerCase() === 'bound') {
      return <StepFormBound step={activeStep} />
    } else {
      return <StepForm step={activeStep} />
    }
  }

  const StepForm = ({ step }: { step: number }) => {
    switch (step) {
      case 1:
        return (
          <Information
            onIsNewAccountChange={handleIsNewAccountChange}
            disableSectionCtrl={disableFormsSections.information}
            onStepChange={handleStepChange}
            getIdAccount={(idAccount: number) => getAccountById(idAccount)}
          />
        )
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

  const StepFormBound = ({ step }: { step: number }) => {
    switch (step) {
      case 1:
        return (
          <InformationBound disableSectionCtrl={disableFormsSections.information} onStepChange={handleStepChange} />
        )
      case 2:
        return <SecurityBound onStepChange={handleStepChange} disableSectionCtrl={disableFormsSections.security} />
      case 3:
        return (
          <PaymentWarrantyBound
            onStepChange={handleStepChange}
            disableSectionCtrl={disableFormsSections.paymentWarranty}
          />
        )
      case 4:
        return <SublimitsBound onStepChange={handleStepChange} disableSectionCtrl={disableFormsSections.sublimits} />
      case 5:
        return <FormAddressBound disableSectionCtrl={disableFormsSections.sov} />
      default:
        return <></>
    }
  }

  useEffect(() => {
    const handleExit = () => {
      localStorage.removeItem('idAccount')

      // Creo que ya no es necesario por el componente multi pestaña
      // dispatch(updateFormsData({ form1: { id: null } }))
      dispatch(resetEndorsement())
    }

    const handleRouteChange = (url: string) => {
      if (url !== '/accounts/new-account') {
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

  console.log('accountDetails', accountDetails)

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        <FormHeader setEditInfo={setEditInfo} accountDetails={accountDetails} />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          {/* <ChangeStepForm
            accountId={accountDetails?.id || null}
            changeAccountId={setAccountId}
            step={activeStep}
            changeStep={handleStepChange}
          > */}
          <Card>
            {selectAccountStepper()}
            {selectStepForm()}
          </Card>

          {/* </ChangeStepForm> */}
          <MenuForm />
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

CreatedAccount.acl = {
  action: 'create',
  subject: 'account'
}

export default CreatedAccount
