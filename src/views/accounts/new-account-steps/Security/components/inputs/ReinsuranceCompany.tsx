import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';

// import * as yup from 'yup';

import { SecurityDto } from '@/services/accounts/dtos/security.dto';
import { ReinsuranceCompanyBinderDto } from '@/services/catalogs/dtos/ReinsuranceCompanyBinder.dto';
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto';
import ReinsuranceCompanyBinderService from 'src/services/catalogs/reinsuranceCompanyBinder.service';
import { SecurityContext } from '../../SecurityView';
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface';

interface ReinsuranceCompanyProps extends ISecurityInputProps {
  avaliableReinsurers: ReinsuranceCompanyDto[];
  companiesSelect: number[];
  security: SecurityDto | undefined;
  setIsGross: Dispatch<SetStateAction<boolean>>;
  setFrontingFeeEnabled: Dispatch<SetStateAction<boolean>>;
  setBinders: Dispatch<SetStateAction<ReinsuranceCompanyBinderDto[]>>;
}


export const ReinsuranceCompany = ({
  index,
  value,
  errorMessage,
  security,
  avaliableReinsurers,
  companiesSelect,
  validateForm,
  setIsGross,
  setFrontingFeeEnabled,
  setBinders
}: ReinsuranceCompanyProps) => {

  const {
    activeErros,
    information,
    securities,
    calculateSecurities,
  } = useContext(SecurityContext);

  // console.log(avaliableReinsurers)

  const updateBindersAsync = async (idCReinsuranceCompany: number) => {
    const binders = await ReinsuranceCompanyBinderService.findByIdReinsuranceCompany(idCReinsuranceCompany);
    setBinders(binders)
  }

  const handleChangeCompany = (e: SelectChangeEvent<string>): void => {
    const avaliableCompanies = avaliableReinsurers
      .filter(reinsure => !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id)
      .find(reinsurer => reinsurer.id === Number(e.target.value))

    const tempSecurities = [...securities]
    if (avaliableCompanies) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompany: avaliableCompanies,
        frontingFeeActive: false,
        isGross: avaliableCompanies.special,
        netPremiumAt100: avaliableCompanies.special ? information.grossPremium : information.netPremium
      }

      setIsGross(() => avaliableCompanies.special)
      setFrontingFeeEnabled(() => false)
      calculateSecurities(tempSecurities)
      validateForm(tempSecurities[index])
      updateBindersAsync(avaliableCompanies.id)
    }
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
      >
        {avaliableReinsurers
          .filter(
            reinsure =>
              !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id
          )
          .map(reinsurer => (
            <MenuItem key={reinsurer.id} value={reinsurer.id}>
              {reinsurer.name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>
        {activeErros && errorMessage}
      </FormHelperText>
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
