import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useContext, useEffect } from 'react'

// import * as yup from 'yup';


import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { useAppDispatch, useAppSelector } from '@/store'
import ReinsuranceCompanyBinderService from 'src/services/catalogs/reinsuranceCompanyBinder.service'
import { FormSectionContext } from '../../../context/formSection/FormSectionContext'
import { ISecurityInputProps } from '../../../interfaces/ISecurityInputProps.interface'
import { Security, updateSecuritiesAtIndex } from '../../../store/securitySlice'

interface ReinsuranceCompanyProps extends ISecurityInputProps {
  security: SecurityDto,
}

// type ReinsuranceCompanyProps = ISecurityInputProps;

export const ReinsuranceCompany = ({
  index,
  value,
  errorMessage,
  isDisabled,
  isActiveErrors,
  security
}: ReinsuranceCompanyProps) => {


  // console.log(avaliableReinsurers)
  const dispatch = useAppDispatch()
  const { getDatas: { availableReinsurens }, companiesSelected, information } = useAppSelector(state => state.securitySlice);

  const { updateBinders } = useContext(FormSectionContext)

  const updateBindersAsync = async (idCReinsuranceCompany: number) => {
    const binders = await ReinsuranceCompanyBinderService.findByIdReinsuranceCompany(idCReinsuranceCompany)
    updateBinders(binders)
  }

  const handleChangeCompany = (e: SelectChangeEvent<string>): void => {
    const avaliableCompanies: ReinsuranceCompanyDto | undefined = availableReinsurens
      .filter(reinsure => !companiesSelected.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id)
      .find(reinsurer => reinsurer.id === Number(e.target.value))

    if (avaliableCompanies) {


      dispatch(updateSecuritiesAtIndex({
        index,
        security: {
          idCReinsuranceCompany: avaliableCompanies,
          isGross: avaliableCompanies.special,
          netPremiumAt100: avaliableCompanies.special ? information.grossPremium : information.netPremium,
          isFrontingFeeEnabled: false,
        } as Security
      }))

      updateBindersAsync(avaliableCompanies.id)
    }
  }
  useEffect(() => {
    if (value) {
      ReinsuranceCompanyBinderService.findByIdReinsuranceCompany(Number(value)).then(binders => updateBinders(binders))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (availableReinsurens.length === 0) {
    return null
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id='ReinsuranceCompany'>Reinsurance companies</InputLabel>
      <Select
        id='outlined-Name'
        value={value.toString()}
        onChange={handleChangeCompany}
        labelId='ReinsuranceCompany'
        label='Reinsurance companies'
        disabled={isDisabled}
      >
        {availableReinsurens
          .filter(
            reinsure => !companiesSelected.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id
          )
          .map(reinsurer => (
            <MenuItem key={reinsurer.id} value={reinsurer.id}>
              {reinsurer.name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{isActiveErrors && errorMessage}</FormHelperText>
    </FormControl>
  )
}

// export const reinsuranceCompany_validations = () => yup.object().shape({
//   idCReinsuranceCompany: yup
//     .object()
//     .shape({
//       id: yup.number().nullable().notRequired(),
//       name: yup.string().nullable().notRequired()
//     })
//     .test('', 'This field is required', value => {
//       if (frontingFeeEnabled && value && typeof value === 'object') {
//         return value.hasOwnProperty('id')
//       }

//       return true
//     }),
// });
