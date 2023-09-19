// ** MUI Imports
import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Chip from 'src/@core/components/mui/chip'
import { ContainerAmounts, ContainerTitle } from 'src/styles/Dashboard/Table/Header'

import installmentService from '@/services/accounts/installments.service'
import { useAppDispatch, useAppSelector } from 'src/store'
import { deleteInstallmentsFilter } from 'src/store/apps/installments'
import { IAccountFilters } from 'src/types/apps/installmentsTypes'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const HeaderTable = () => {
  // ** Custom Hooks
  const accountsReducer = useAppSelector(state => state.installments)
  const [detailsTotal, setDetailsTotal] = useState({
    totalInstallments: 0,
    totalPendings: ''
  })
  const dispatch = useAppDispatch()
  const handleDelete = (filter: IAccountFilters) => {
    dispatch(deleteInstallmentsFilter(filter.type))
  }
  const setTotals = async () => {
    const data = await installmentService.countInstallment()
    if (!data) return

    const currency = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' })
    const formatTotalBalanceDue = currency.format(data.totalBalanceDue || 0)
    const newData = {
      totalInstallments: data.totalInstallments || 0,
      totalPendings: formatTotalBalanceDue
    }
    setDetailsTotal(newData)
  }
  useEffect(() => {
    setTotals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ flexGrow: 1, padding: '20px 20px 16px 20px' }}>
      <Grid container spacing={{ xs: 1, sm: 1, md: 1 }} sx={{ alignItems: 'center' }}>
        <Grid item xs={12} sm={2} md={2}>
          <ContainerTitle>
            <Typography
              variant='h6'
              sx={{ fontFamily: 'Inter', color: 'rgba(68,72,84,0.87)', letterSpacing: '0.15px' }}
            >
              Installments
            </Typography>
          </ContainerTitle>
        </Grid>
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
        <Grid item xs={12} sm={4} md={4}>
          <ContainerAmounts>
            <div className='container-total-installments'>
              <span className='form-secondContainer-header-title'>Total Installments</span>
              <span className='form-secondContainer-header-subtitle'> {detailsTotal.totalInstallments}</span>
            </div>
            <div className='container-total-pending'>
              <span className='form-secondContainer-header-title'>Total Pending</span>
              <span className='form-secondContainer-header-subtitle'>{detailsTotal.totalPendings}</span>
            </div>
          </ContainerAmounts>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HeaderTable
