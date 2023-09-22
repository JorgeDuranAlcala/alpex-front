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
  InputLabel, Select, MenuItem
} from '@mui/material';
import { DynamicContext } from 'src/context/dynamic/reducer';
import DynamicActionTypes from 'src/context/dynamic/actionTypes';

import { useRouter } from 'next/router'


const schema = yup.object().shape({
  capacity: yup.string().required('Este campo es obligatorio'),
  location: yup.string().required('Este campo es obligatorio'),
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
  currency: yup.string().required('Este campo es obligatorio'),
  intermediary: yup.string().required('Este campo es obligatorio'),
  furtherAccountInfo: yup.string().required('Este campo es obligatorio'),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { dispatch } = React.useContext(DynamicContext);
  const router = useRouter()


  const onSubmit = (data: any) => {
    dispatch({ type: DynamicActionTypes.SET_BANK, payload: data});
    router.push('/catalogues/dynamic')
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
                    defaultValue=""
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Controller
                    name="location"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="location-label" label="Location" {...field}>
                        <MenuItem value="MX">MX</MenuItem>
                        <MenuItem value="USA">USA</MenuItem>
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Controller
                    name="currency"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="currency-label" label="Currency" {...field}>
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="MXN">MXN</MenuItem>
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
                      defaultValue=""
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
                      defaultValue=""
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