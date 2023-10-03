import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import FormHeader from 'src/views/broker-tracker/Header/headerInstallment'
import HistoryPayments from 'src/views/broker-tracker/components/HistoryPayments'

// ** Next
import { useRouter } from 'next/router'

// ** Redux
import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'

// ** Custom hooks
import { useGetAccountById } from '@/hooks/accounts/forms'
import { useGetActualInstallment, useGetInstallmentsByIdAccount } from '@/hooks/accounts/installments'

const PaymentRecord = () => {
  // Custom Hooks
  const { account: accountDetails, setAccountId } = useGetAccountById()
  const { actualInstallment: installmentDetails, setAccountIdInstallment, setInstallmentId } = useGetActualInstallment()
  const { installmentsAccount: installmentHistory, setInstallmenIdAccount } = useGetInstallmentsByIdAccount()

  const router = useRouter()
  useEffect(() => {
    if (router.query.id) {
      setAccountId(Number(router.query.id))
      setAccountIdInstallment(Number(router.query.id))
      setInstallmenIdAccount(Number(router.query.id))
      setInstallmentId(Number(localStorage.getItem('idAccountInstallment')))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

  console.log(installmentHistory)

  const [, setEditInfo] = useState(true)

  return (
    <AccountsTableContextProvider>
      <Grid className='new-account' item xs={12}>
        <FormHeader
          isNewAccount
          setEditInfo={setEditInfo}
          accountDetails={accountDetails}
          installmentDetails={installmentDetails}
          setAccountId={setAccountId}
          isDataSheet={false}
        />

        <HistoryPayments installmentHistory={installmentHistory} />
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default PaymentRecord
