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

import { CataloguesClaimsContext } from 'src/context/catalogues-claims/reducer';
import CataloguesClaimsActionTypes from 'src/context/catalogues-claims/actionTypes';

// ** Hooks
import { useRouter } from 'next/router'


// Schema
const schema = yup.object().shape({
  siglas: yup.string().required('Siglas is required'),
  razonSocial: yup.string().required('Razón Social is required'),
  rfc: yup
      .string()
      .required('RFC is required')
      .matches(/^([A-ZÑ&]{3,4})(\d{6})([A-V1-9])([A-Z\d]{2})$/)
    ,
  calle: yup.string().required('Calle is required'),
  noExterior: yup.number().required('No. Exterior is required'),
  noInterior: yup.number().required('No. Interior is required'),
  colonia: yup.string().required('Colonia is required'),
  municipio: yup.string().required('Municipio is required'),
  estado: yup.string().required('Estado is required'),
  cp: yup.number().required('C.P is required'),
  telefono: yup
          .string()
          .required('Teléfono is required')
          .matches(/^(\+?52)?(1)?\d{10}$/, "Ingrese un telefono valido")
    ,
  correoContacto: yup
                  .string()
                  .required('Correo Contacto Principal is required')
                  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'Ingrese un correo valido')
  ,
  nombreContacto: yup.string().required('Nombre del Contacto is required'),
  contactoReporte: yup.string().required('Contacto Reporte de Siniestros is required'),
  fechaContrato: yup.date().required('Fecha de Contrato is required'),
  observaciones: yup.string().required('Observaciones is required'),
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

  const router = useRouter();
  const { dispatch } = React.useContext(CataloguesClaimsContext);


  const onSubmit = (data: any) => {
    dispatch({ type: CataloguesClaimsActionTypes.SET_ADJUSTER, payload: data});
    router.push('/catalogues/claims')
  };

  return (
    <>
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                        <Controller
                          name='siglas'
                          control={control}
                          defaultValue={''}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              label='Siglas'
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              error={Boolean(errors.siglas)}
                              sx={{
                                '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-ntchedOutline': {
                                  borderColor: '#2535A8'
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                              }}
                            />
                          )}
                        />
                        {errors.siglas && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.siglas.message}</FormHelperText>
                        )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                        <Controller
                          name='razonSocial'
                          control={control}
                          defaultValue={''}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              label='Razon social'
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              error={Boolean(errors.razonSocial)}
                              sx={{
                                '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-ntchedOutline': {
                                  borderColor: '#2535A8'
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#2535A8' }
                              }}
                            />
                          )}
                        />
                        {errors.razonSocial && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.razonSocial.message}</FormHelperText>
                        )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="proveedor"
                      control={control}
                      defaultValue="System assigned"
                      render={({ field: { value } }) => (
                        <TextField
                          label="Proveedor"
                          value={value}
                          InputProps={{ readOnly: true }}
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
                    {errors.proveedor && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.proveedor.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="rfc"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="RFC"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.rfc)}
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
                    {errors.rfc && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.rfc.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="calle"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Calle"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.calle)}
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
                    {errors.calle && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.calle.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="noExterior"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="No. Exterior"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.noExterior)}
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
                    {errors.noExterior && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.noExterior.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="noInterior"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                        label="No. Interior"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.noInterior)}
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
                    {errors.noInterior && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.noInterior.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                       name="colonia"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Colonia"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.colonia)}
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
                    {errors.colonia && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.colonia.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                       name="municipio"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Municipio"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.municipio)}
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
                    {errors.municipio && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.municipio.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="estado-label">Estado</InputLabel>
                  <Controller
                    name="estado"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="estado-label" label="Estado" {...field}>
                        <MenuItem value="ESTADO1">ESTADO 1</MenuItem>
                        <MenuItem value="ESTADO2">ESTADO 2</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.estado && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.estado.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="cp"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="C.P"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.cp)}
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
                    {errors.cp && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.cp.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="telefono"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Teléfono"
                          type="tel"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.telefono)}
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
                    {errors.telefono && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.telefono.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="correoContacto"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Correo Contacto Principal"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.correoContacto)}
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
                    {errors.correoContacto && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.correoContacto.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                       name="nombreContacto"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Nombre del Contacto"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.nombreContacto)}
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
                    {errors.nombreContacto && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.nombreContacto.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                        name="contactoReporte"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Contacto Reporte de Siniestros"                          
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.contactoReporte)}
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
                    {errors.contactoReporte && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.contactoReporte.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>        
              <Grid item xs={12} md={4}>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                    <Controller
                      name="fechaContrato"
                      control={control}
                      defaultValue=""
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label="Fecha de Contrato"
                          value={value}
                          type="date"                          
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.fechaContrato)}
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                    {errors.fechaContrato && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.fechaContrato.message}</FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8} >
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <Controller
                    name="observaciones"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label="Observaciones"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors?.observaciones)}
                        helperText={errors?.observaciones?.message}
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
                  {errors?.observaciones && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors?.observaciones.message}</FormHelperText>
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
                SAVE ADJUSTER
              </Button>
      </form>
    </Container>
    </>
  );
};

export default Form;