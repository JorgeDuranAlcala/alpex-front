import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Grid,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel, Select, MenuItem,
  Typography
} from '@mui/material';
import { DynamicContext } from 'src/context/dynamic/reducer';
import DynamicActionTypes from 'src/context/dynamic/actionTypes';


//import { IBank} from 'src/views/dynamic/bank-table'

import { useUpdateBank } from 'src/hooks/catalogs/bank/useUpdate'
import { useGetAllCurrencies } from 'src/hooks/catalogs/currency/useGetAll'
import { useGetAllCountries } from 'src/hooks/catalogs/country/useGetAll'


import toast from 'react-hot-toast'

const schema = yup.object().shape({
  capacity: yup.string().required('Este campo es obligatorio'),
  idCLocation: yup.string(),
  bank: yup.string().required('Este campo es obligatorio'),
  beneficiary: yup.string().required('Este campo es obligatorio'),
  accountNumber: yup
    .string()
    .required('Este campo es obligatorio')
    .matches(/^\d+$/, 'El campo debe contener solo números'),
  swift: yup
    .string()
    .required('Este campo es obligatorio')
    .uppercase()
    .matches(/^[A-Z0-9]{1,9}$/, 'El campo debe contener hasta 9 caracteres alfanuméricos en mayúsculas'),
  aba: yup
    .string()
    .required('Este campo es obligatorio')
    .matches(/^\d+$/, 'El campo debe contener solo números'),
  clabe: yup
    .string()
    .required('Este campo es obligatorio')
    .matches(/^\d{1,18}$/, 'El campo debe contener hasta 18 caracteres numéricos'),
  idCCurrency: yup.string(),
  intermediary: yup.string().required('Este campo es obligatorio'),
  furtherAccountInfo: yup.string().required('Este campo es obligatorio'),
});

interface FormProps {
    id: string
}

const Form = ({
    id
}: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { dispatch, state } = React.useContext(DynamicContext);
  const { updateBank } = useUpdateBank();
  const { currencies } = useGetAllCurrencies()
  const { countries } =  useGetAllCountries()

  const bank = state.banks.find((b: any) => b.id === id);
  if(!bank) return (
    <>
      <Container>
          <Typography variant="h4">No Existe una Bank Account con ese ID</Typography>
      </Container>
    </>
  )
  const initialValues = {
    capacity: bank.capacity,
    bank: bank.bank,
    beneficiary: bank.beneficiary,
    accountNumber: Number(bank.accountNumber),
    swift: bank.swift,
    aba: Number(bank.aba),
    clabe:  Number(bank.clabe),
    intermediary: bank.intermediary,
    furtherAccountInfo: bank.furtherAccountInfo,
    idCCurrency: Number(bank.idCCurrency), 
    idCLocation: Number(bank.idCLocation),
  }

  const onSubmit = async (data: any) => {
    try {
      if(!bank) return;
      const result = await updateBank({
        id: bank.id,
        capacity: data.capacity,
        bank: data.bank,
        beneficiary: data.beneficiary,
        accountNumber: Number(data.accountNumber),
        swift: data.swift,
        aba: Number(data.aba),
        clabe:  Number(data.clabe),
        intermediary: data.intermediary,
        furtherAccountInfo: data.furtherAccountInfo,
        active: bank.active,
        createdAt: bank.createdAt,
        updatedAt: new Date().toISOString(),
      });

      if(result) {
        dispatch({ type: DynamicActionTypes.UPDATE_BANK, payload: {...result, id: bank.id}});
        toast.success('Bank Account updated Successfully')
        reset(result)
      }
    } catch(err) {
      toast.error('error: ' + err.message)
    }
  };



  return (
    <>
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <Controller
                    name="capacity"
                    control={control}
                    defaultValue={initialValues.capacity}
                    render={({ field }) => (
                      <TextField label="Capacity" error={Boolean(errors.capacity)} {...field} />
                    )}
                  />
                  {errors.capacity && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.capacity && typeof errors.capacity.message === 'string' && errors.capacity.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Controller
                    name="idCLocation"
                    control={control}
                    defaultValue={initialValues.idCLocation?.name}
                    render={({ field }) => (
                      <Select labelId="location-label" label="Location" {...field}>
                        {countries.map(country => (
                           <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.location && (
                                        <FormHelperText sx={{ color: 'error.main' }}>
                                        {errors.location && typeof errors.location.message === 'string' && errors.location.message}
                                      </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="bank"
                      control={control}
                      defaultValue={initialValues.bank}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="bank"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.bank)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.bank && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.bank && typeof errors.bank.message === 'string' && errors.bank.message}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="beneficiary"
                      control={control}
                      defaultValue={initialValues.beneficiary}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="beneficiary"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.beneficiary)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.beneficiary && (
                       <FormHelperText sx={{ color: 'error.main' }}>
                       {errors.beneficiary && typeof errors.beneficiary.message === 'string' && errors.beneficiary.message}
                     </FormHelperText>                     
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="accountNumber"
                      control={control}
                      defaultValue={initialValues.accountNumber}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Account #"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.accountNumber)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.accountNumber && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.accountNumber && typeof errors.accountNumber.message === 'string' && errors.accountNumber.message}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="swift"
                      control={control}
                      defaultValue={initialValues.swift}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="SWIFT" 
                          inputProps={{ maxLength: 9, style: { textTransform: 'uppercase' } }}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.swift)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.swift && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.swift && typeof errors.swift.message === 'string' && errors.swift.message}
                  </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                       name="aba"
                      control={control}
                      defaultValue={initialValues.aba}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="aba"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.aba)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.aba && (
                     <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.aba && typeof errors.aba.message === 'string' && errors.aba.message}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                       name="clabe"
                      control={control}
                      defaultValue={initialValues.clabe}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="clabe"
                          inputProps={{ maxLength: 18, type: 'number' }}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.clabe)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.clabe && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {errors.clabe && typeof errors.clabe.message === 'string' && errors.clabe.message}
                       </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Controller
                    name="idCCurrency"
                    control={control}
                    defaultValue={initialValues.idCCurrency?.code}
                    render={({ field }) => (
                      <Select labelId="currency-label" label="Currency" {...field}>
                        {currencies.map(currency => (
                          <MenuItem key={currency.id} value={currency.id}>{currency.code}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.currency && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.currency && typeof errors.currency.message === 'string' && errors.currency.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="intermediary"
                      control={control}
                      defaultValue={initialValues.intermediary}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Intermediary"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.intermediary)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.intermediary && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.intermediary && typeof errors.intermediary.message === 'string' && errors.intermediary.message}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="furtherAccountInfo"
                      control={control}
                      defaultValue={initialValues.furtherAccountInfo}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Further Account Info"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.furtherAccountInfo)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2535A8',
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' },
                          }}
                        />
                      )}
                    />
                    {errors.furtherAccountInfo && (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {errors.furtherAccountInfo && typeof errors.furtherAccountInfo.message === 'string' && errors.furtherAccountInfo.message}
                        </FormHelperText>
                    )}
                </FormControl>
              </Grid>
             
        </Grid>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                sx={{ float: 'right', my: 2 }}
              >
                SAVE BANK
              </Button>
      </form>
    </Container>
    </>
  );
};

export default Form;