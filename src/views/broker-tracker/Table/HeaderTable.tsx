import React, { useEffect, useRef, useState } from 'react'

// ** MUI Imports

import { useGetAll } from '@/hooks/catalogs/broker/useGetAll'
import installmentService from '@/services/accounts/installments.service'
import {
  ContainerSelectNameBroker,
  SubContainerAccountBalanceData,
  SubContainerInstallments
} from '@/styles/Payments/BrokerTracer/brokerTracer'
import { Box, Grid, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from 'src/@core/components/mui/chip'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteInstallmentsFilter, handleInstallmentsFilter } from 'src/store/apps/installments/brokerTracker'
import { ContainerHeader, ContainerTitle } from 'src/styles/Dashboard/Table/Header'
import { IAccountFilters } from 'src/types/apps/installmentsTypes'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const HeaderTable = () => {
  const [broker, setBrocker] = React.useState('')
  const { brokers } = useGetAll()
  const searchTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dispatch = useAppDispatch()
  const handleDelete = (filter: IAccountFilters) => {
    if (filter.type == 'idBroker') {
      setBrocker('0')
      setTotals(0)
    }
    dispatch(deleteInstallmentsFilter(filter.type))
  }
  const accountsReducer = useAppSelector(state => state.brokerTracker)
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    setBrocker(value)
    if (searchTimeOutRef.current) {
      clearTimeout(searchTimeOutRef.current)
    }
    searchTimeOutRef.current = setTimeout(() => {
      if (value === '') dispatch(deleteInstallmentsFilter('idBroker'))
      else
        dispatch(
          handleInstallmentsFilter({
            type: 'idBroker',
            value: `${value}`,
            text: 'Broker'
          })
        )
    }, 500)
    setTotals(parseInt(value))
  }
  const [detailsTotal, setDetailsTotal] = useState({
    totalInstallments: 0,
    totalPaid: 0,
    totalDebt: '',
    currency: ''
  })
  const setTotals = async (selectBrocker: number) => {
    const query = selectBrocker > 0 ? 'idBroker=' + selectBrocker : ''
    const data = await installmentService.countInstallmentByBroker(query)
    if (!data) return

    const currency = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' })
    const formatTotalBalanceDue = currency.format(data.totalDebt || 0)
    const newData = {
      totalInstallments: data.pending || 0,
      totalPaid: data.paid,
      totalDebt: formatTotalBalanceDue,
      currency: data.currency
    }
    setDetailsTotal(newData)
  }
  useEffect(() => {
    setTotals(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ContainerHeader>
        <ContainerTitle>
          <Typography variant='h6' sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}>
            Account balance
          </Typography>
        </ContainerTitle>
      </ContainerHeader>
      <SubContainerAccountBalanceData>
        <ContainerSelectNameBroker>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Name of Brocker</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={broker}
              label='Name of Brocker'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {brokers.length > 0 ? (
                brokers.map(broker => {
                  return (
                    <MenuItem key={broker.id} value={broker.id}>
                      {broker.name}
                    </MenuItem>
                  )
                })
              ) : (
                <MenuItem key={null} value={''}>
                  No options available
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </ContainerSelectNameBroker>
        <Grid item xs={12} sm={6} md={6}>
          {' '}
          <Box>
            {accountsReducer.filters.map((filter, index) =>
              filter.unDeleteable ? (
                <Chip
                  key={index}
                  label={filter.text}
                  sx={{
                    backgroundColor: '#174BC125',
                    marginRight: '6px',
                    color: '#2535A8',
                    fontWeight: 500,
                    fontFamily: 'Inter'
                  }}
                />
              ) : (
                <Chip
                  key={index}
                  label={filter.text}
                  sx={{
                    backgroundColor: '#174BC125',
                    marginRight: '6px',
                    color: '#2535A8',
                    fontWeight: 500,
                    fontFamily: 'Inter',
                    textTransform: 'capitalize'
                  }}
                  onDelete={() => {
                    handleDelete(filter)
                  }}
                  deleteIcon={<Icon icon='mdi:close-circle' style={{ color: '2535A8' }} />}
                />
              )
            )}
          </Box>
        </Grid>

        <SubContainerInstallments>
          <Grid
            container
            spacing={{ xs: 5, sm: 5, md: 5 }}
            sx={{ display: 'flex', flexDirection: 'row', alingItems: 'center' }}
          >
            <Grid item xs={12} sm={4} md={4}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>All Pending Installments</span>
                <span className='form-secondContainer-header-subtitle'>{detailsTotal.totalInstallments}</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>All Paid Installments</span>
                <span className='form-secondContainer-header-subtitle'>{detailsTotal.totalPaid}</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <div className='form-secondContainer-second'>
                <span className='form-secondContainer-header-title'>Total Debt</span>
                <span className='form-secondContainer-header-subtitle'>
                  {detailsTotal.totalDebt} {detailsTotal.currency}
                </span>
              </div>
            </Grid>
          </Grid>
        </SubContainerInstallments>
      </SubContainerAccountBalanceData>
    </>
  )
}

export default HeaderTable
