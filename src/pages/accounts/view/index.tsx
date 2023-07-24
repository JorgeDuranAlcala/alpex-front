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

import FormHeader from 'src/views/accounts/new-account-steps/headers/formHeader'

import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'
import { useGetAccountById } from '@/hooks/accounts/forms'
import Sublimits from '@/views/accounts/new-account-steps/Sublimit/Sublimits'
import Icon from 'src/@core/components/icon'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

import { CheckStepForm } from '@/views/accounts/ChangeStepForm'

const NewAccount = () => {
  // ** Hooks
  const router = useRouter()
  const dispatch = useAppDispatch()

  // ** Hooks header
  const { account: accountDetails, setAccountId, getAccountById } = useGetAccountById()


  // const { account, setAccountId } = useGetAccountById()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [dataForEndorsement, setDataForEndorsement] = useState()
  const [disableComments] = useState(false)
  const [isNewAccount, setIsNewAccount] = useState<boolean>(true)
  const [activeStep, setActiveStep] = useState(1)

  //!: Este estado se encarga de activar el endorsement del componente
  const [activeEndorsement, setActiveEndorsement] = useState(false)

  //!:  Este estado se encarga de activar el editar info en los forms
  const [editInfo, setEditInfo] = useState(false)

  //Todo:  Une a los dos active inputs
  const [activeIntpus, setActiveInputs] = useState({ basic: false, allInfo: false })

  // Esta función se encarga de comunicar el header con el contenido de los forms
  const activeInputs = () => {
    // Para todos los tipos de cuenta excepto |BOUND|, en este caso siempre estarán activados
    if (accountDetails?.status.toLowerCase() !== 'bound') {
      setActiveInputs({ ...activeIntpus, allInfo: false, basic: false })
    }

    // Para las cuentas de tipo |BOUND|, esto es para cuando ingresas a tu cuenta |SIN ACTIVAR EL ENDORSEMENT|
    if (accountDetails?.status.toLowerCase() === 'bound' && !activeEndorsement) {
      setActiveInputs({ ...activeIntpus, allInfo: true, basic: true })
    }

    // Para las cuentas de tipo |BOUND| -> |ENDORSEMENT ACTIVADO|
    if (accountDetails?.status.toLowerCase() === 'bound' && activeEndorsement) {
      setActiveInputs({ ...activeIntpus, allInfo: true, basic: false })
    }
  }

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
        return (
          <Information
            editInfo={activeIntpus}
            activeEndorsement={activeEndorsement}
            onStepChange={handleStepChange}
            onIsNewAccountChange={handleIsNewAccountChange}
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

  useEffect(() => {
    const handleExit = () => {
      localStorage.removeItem('idAccount')
      dispatch(updateFormsData({ form1: { id: null } }))
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
    activeInputs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo, activeEndorsement, accountDetails?.status])

  // console.log('se cambió el account', dataForEndorsement)

  // ** Hook - Recuperar Step guardado en Redux
  // useFormStep_recuperateStep();

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        {activeStep == 1 && isNewAccount ? (
          <FormHeader
            isNewAccount
            setActiveEndorsement={setActiveEndorsement}
            setEditInfo={setEditInfo}
            accountDetails={accountDetails}
            setAccountId={setAccountId}
          />
        ) : (
          <FormHeader
            setActiveEndorsement={setActiveEndorsement}
            setEditInfo={setEditInfo}
            accountDetails={accountDetails}
            setAccountId={setAccountId}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <NewAccountStepper changeStep={activeStep} onStepChange={handleStepChange} />
            <CheckStepForm
              step={activeStep}
              changeStep={handleStepChange}
            >
              {({ step }) => (
                <StepForm step={step} />
              )}
            </CheckStepForm>
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

export default NewAccount;

