import { useEffect, useState } from 'react'

// ** MUI Imports
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import FormHeader from 'src/views/installments/Header/headerInstallment'

// ** Next
import { useRouter } from 'next/router'

// ** Redux
import { AccountsTableContextProvider } from '@/context/accounts/Table/reducer'

// ** Custom hooks
import { useGetAccountById } from '@/hooks/accounts/forms'
import { useGetActualInstallment } from '@/hooks/accounts/installments'

import { ContainerPadd } from '@/styles/Payments/PaymnetsInstallments/paymentsInstallments'
import { FormHeaderMoneyData } from '@/styles/Payments/ReinsurerPayment/reinsurerPayment'
import DetailInstallment from '@/views/installments/components/DetailsInstallment'
import InstallmentInformation from '@/views/installments/components/InstallmentInformation'
import { NumericFormat } from 'react-number-format'

// import UserList from 'src/pages/apps/user/list'

// import InvoiceAdd from 'src/pages/apps/invoice/add'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({}) => ({
    border: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />}
    {...props}
  />
))(() => ({
  backgroundColor: '#FFFFFF',
  borderStyle: 'none',
  boxShadow: 'none',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '0'
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '0'
}))

const PaymentRecord = () => {
  // Custom Hooks
  const { account: accountDetails, setAccountId } = useGetAccountById()
  const { actualInstallment: installmentDetails, setAccountIdInstallment, setInstallmentId } = useGetActualInstallment()
  const router = useRouter()
  useEffect(() => {
    if (router.query.id) {
      setAccountId(Number(router.query.id))
      setAccountIdInstallment(Number(router.query.id))
      setInstallmentId(Number(localStorage.getItem('idAccountInstallment')))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

  console.log({ accountDetails })

  const [, setEditInfo] = useState(true)
  const [distributeB, setDistributeB] = useState(false)
  const [availableB, setAvailableB] = useState(0)
  const [availableBInit, setAvailableBInit] = useState(0)
  const [expanded, setExpanded] = useState<string | false>('')
  const [ammount1, setAmmount1] = useState(0)
  const [ammount2, setAmmount2] = useState(0)
  const [ammount3, setAmmount3] = useState(0)
  const [ammount4, setAmmount4] = useState(0)
  const [percent1, setPercent1] = useState(0)
  const [percent2, setPercent2] = useState(0)
  const [percent3, setPercent3] = useState(0)
  const [percent4, setPercent4] = useState(0)
  const currentInst = 1

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleTotalAmount = (e: any) => {
    if (accountDetails?.informations[0]?.netPremium) {
      if (
        Number(e.target.value.replace('$', '').replaceAll(',', '')) >
        Number(accountDetails?.informations[0]?.netPremium)
      ) {
        const available =
          Number(e.target.value.replace('$', '').replaceAll(',', '')) -
          Number(accountDetails?.informations[0]?.netPremium)
        setAvailableB(available)
        setAvailableBInit(available)
        setDistributeB(true)
      } else {
        setDistributeB(false)
      }
    }
  }

  const handlePercentBalance = (e: any, installment: string) => {
    const valueP = e.value
    const newBalance = (availableBInit * valueP) / 100
    if (installment === '1') setAmmount1(newBalance)
    if (installment === '2') setAmmount2(newBalance)
    if (installment === '3') setAmmount3(newBalance)
    if (installment === '4') setAmmount4(newBalance)
  }

  useEffect(() => {
    const ammountTotal = ammount1 + ammount2 + ammount3 + ammount4
    setAvailableB(availableBInit - ammountTotal)
  }, [ammount1, ammount2, ammount3, ammount4])

  const handleTotalBalance = (e: any, installment: string) => {
    const monto = e.value
    const newPercent = (monto * 100) / availableBInit
    if (installment === '1') setPercent1(newPercent)
    if (installment === '2') setPercent2(newPercent)
    if (installment === '3') setPercent3(newPercent)
    if (installment === '4') setPercent4(newPercent)
  }

  useEffect(() => {
    const ammountTotal = ammount1 + ammount2 + ammount3 + ammount4
    setAvailableB(availableBInit - ammountTotal)
  }, [percent1, percent2, percent3, percent4])

  const formaterAmount = (amount: number) => {
    const currency = accountDetails?.informations[0]?.currency
    if (amount && currency) {
      const convert = new Intl.NumberFormat('en', { style: 'currency', currency: currency })
      const formatTotalBalanceDue = convert.format(amount || 0)

      return formatTotalBalanceDue
    }
  }

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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <div className='container-padd'>
              <div className='title-installment'>Record Installment Payment</div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <NumericFormat
                        autoFocus
                        name='total'
                        allowLeadingZeros
                        thousandSeparator=','
                        customInput={TextField}
                        id='filled-multiline-flexible'
                        label='Amount'
                        multiline
                        prefix={'$'}
                        decimalScale={2}
                        variant='outlined'
                        onChange={e => handleTotalAmount(e)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        disabled
                        name='currentInstallment'
                        label='Current Installment'
                        defaultValue={currentInst}
                        value={currentInst}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <TextField fullWidth name='typeOfPayment' label='Type Of Payment' disabled />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className='wrapper-installments'>
                <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='controlled-select-label'>Bank Account</InputLabel>
                      <Select label='Currency'>
                        <MenuItem value=''>
                          <em>Bank Account</em>
                        </MenuItem>
                        <MenuItem value={10}>Value 1</MenuItem>
                        <MenuItem value={20}>Value 2</MenuItem>
                        <MenuItem value={30}>Value 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='controlled-select-label'>Currency</InputLabel>
                      <Select label='Currency'>
                        <MenuItem value=''>
                          <em>Currency</em>
                        </MenuItem>
                        <MenuItem value={10}>Value 1</MenuItem>
                        <MenuItem value={20}>Value 2</MenuItem>
                        <MenuItem value={30}>Value 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
                    <FormControl fullWidth>
                      <TextField fullWidth name='exchangeRate' label='Exchange Rate' value='Exchange Rate' />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              {distributeB ? (
                <>
                  <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className='title-installment'>Distribute balance</div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormHeaderMoneyData>
                        <span className='form-header-money-data-txt'>Available balance</span>
                        <span className='form-header-money-data-num'>{formaterAmount(availableB)}</span>
                      </FormHeaderMoneyData>
                    </Grid>
                  </Grid>
                  <div className='wrapper-installments' style={currentInst >= 1 ? { display: 'none' } : {}}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            name='installment1'
                            label='Installment'
                            defaultValue=''
                            value='1'
                            disabled
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balance1'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balancePercent1'
                            label='Balance %'
                            multiline
                            suffix='%'
                            variant='outlined'
                            value={percent1}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = 100

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handlePercentBalance(e, '1')}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balanceAmmountName1'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balanceAmmount1'
                            label='Balance ammount'
                            multiline
                            defaultValue={0}
                            min={1}
                            max={availableB}
                            minLength={1}
                            decimalScale={0}
                            variant='outlined'
                            value={ammount1}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = availableBInit

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handleTotalBalance(e, '1')}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className='wrapper-installments' style={currentInst >= 2 ? { display: 'none' } : {}}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                      <Grid item xs={12} md={4} sm={6}>
                        <div className='width-full'>
                          <TextField
                            fullWidth
                            name='installment2'
                            label='Installment'
                            defaultValue=''
                            value='2'
                            disabled
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balance2'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balancePercent2'
                            label='Balance %'
                            value={percent2}
                            multiline
                            suffix='%'
                            variant='outlined'
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = 100

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handlePercentBalance(e, '2')}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balanceAmmountName2'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balanceAmmount2'
                            label='Balance ammount'
                            multiline
                            defaultValue={0}
                            min={1}
                            max={availableB}
                            minLength={1}
                            decimalScale={0}
                            variant='outlined'
                            value={ammount2}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = availableBInit

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handleTotalBalance(e, '2')}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className='wrapper-installments' style={currentInst >= 3 ? { display: 'none' } : {}}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                      <Grid item xs={12} md={4} sm={6}>
                        <div className='width-full'>
                          <TextField
                            fullWidth
                            name='installment3'
                            label='Installment'
                            defaultValue=''
                            value='3'
                            disabled
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balance3'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balancePercent3'
                            label='Balance %'
                            multiline
                            suffix='%'
                            variant='outlined'
                            value={percent3}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = 100

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handlePercentBalance(e, '3')}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balanceAmmountName3'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balanceAmmount3'
                            label='Balance ammount'
                            multiline
                            defaultValue={0}
                            min={1}
                            max={availableB}
                            minLength={1}
                            decimalScale={0}
                            variant='outlined'
                            value={ammount3}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = availableBInit

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handleTotalBalance(e, '3')}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className='wrapper-installments' style={currentInst >= 4 ? { display: 'none' } : {}}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
                      <Grid item xs={12} md={4} sm={6}>
                        <div className='width-full'>
                          <TextField
                            fullWidth
                            name='installment1}4'
                            label='Installment'
                            defaultValue=''
                            value='4'
                            disabled
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balance4'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balancePercent4'
                            label='Balance %'
                            multiline
                            suffix='%'
                            variant='outlined'
                            value={percent4}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = 100

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handlePercentBalance(e, '4')}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} sm={6}>
                        <FormControl fullWidth>
                          <NumericFormat
                            name='balanceAmmountName4'
                            allowLeadingZeros
                            thousandSeparator=','
                            customInput={TextField}
                            id='balanceAmmount4'
                            label='Balance ammount'
                            multiline
                            defaultValue={0}
                            min={1}
                            max={availableB}
                            minLength={1}
                            decimalScale={0}
                            variant='outlined'
                            value={ammount4}
                            isAllowed={values => {
                              const { floatValue } = values
                              const upLimit = availableBInit

                              return (floatValue! >= 0 && floatValue! <= upLimit) || floatValue === undefined
                            }}
                            onValueChange={e => handleTotalBalance(e, '4')}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </>
              ) : null}
              <Stack spacing={2} direction={{ xs: 'column', sm: 'column', md: 'row-reverse' }}>
                <Button disabled={!distributeB || availableB === 0 ? false : true} variant='contained'>
                  Save Installments Payment
                </Button>
              </Stack>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <ContainerPadd>
              <div className='title-installment'>Installment 1</div>
              <InstallmentInformation st='Pending' id='1' />
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </ContainerPadd>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <ContainerPadd>
              <div className='title-installment'>Installment 2</div>
              <InstallmentInformation st='Paid' id='2' />
              <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel2d-content' id='panel2d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </ContainerPadd>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <ContainerPadd>
              <div className='title-installment'>Installment 3</div>
              <InstallmentInformation st='Extra' id='3' />
              <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel3d-content' id='panel3d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </ContainerPadd>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Card>
            <ContainerPadd>
              <div className='title-installment'>Installment 4</div>
              <InstallmentInformation st='Partially' id='4' />
              <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                style={{ boxShadow: 'none', borderTop: 'none' }}
              >
                <AccordionSummary aria-controls='panel4d-content' id='panel4d-header' style={{ padding: '0' }}>
                  <Typography style={{ marginLeft: '12px' }}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailInstallment />
                </AccordionDetails>
              </Accordion>
            </ContainerPadd>
          </Card>
        </div>
      </Grid>
    </AccountsTableContextProvider>
  )
}

export default PaymentRecord
