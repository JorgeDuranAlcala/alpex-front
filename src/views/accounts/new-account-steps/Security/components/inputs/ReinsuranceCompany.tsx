import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Dispatch, SetStateAction, useContext } from 'react'

// import * as yup from 'yup';

import { SecurityDto } from '@/services/accounts/dtos/security.dto'
import { ReinsuranceCompanyDto } from '@/services/catalogs/dtos/ReinsuranceCompanyDto'
import { SecurityContext } from '../../SecurityView'
import { ISecurityInputProps } from '../../interfaces/ISecurityInputProps.interface'

interface ReinsuranceCompanyProps extends ISecurityInputProps {
  avaliableReinsurers: ReinsuranceCompanyDto[]
  companiesSelect: number[]
  security: SecurityDto | undefined
  setIsGross: Dispatch<SetStateAction<boolean>>
  setFrontingFeeEnabled: Dispatch<SetStateAction<boolean>>
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
  view
}: ReinsuranceCompanyProps) => {
  const { activeErros, information, securities, calculateSecurities } = useContext(SecurityContext)

  const handleChangeCompany = (e: SelectChangeEvent<string>): void => {
    const avaliableCompanies: ReinsuranceCompanyDto | undefined = avaliableReinsurers
      .filter(reinsure => !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id)
      .find(reinsurer => reinsurer.id === Number(e.target.value))

    const tempSecurities = [...securities]
    if (avaliableCompanies) {
      tempSecurities[index] = {
        ...tempSecurities[index],
        idCReinsuranceCompany: avaliableCompanies,
        frontingFee: 0,
        taxes: 0,
        isGross: avaliableCompanies.special,
        frontingFeeActive: false,
        taxesActive: false,
        netPremiumAt100: avaliableCompanies.special ? information.grossPremium : information.netPremium,
        isChangeBrokerAgeAmount: false,
        isChangeFrontingFeeAmount: false,
        isChangeTaxesAmount: false,
        isChangeDynamicCommissionAmount: false
      }

      calculateSecurities(tempSecurities)
      validateForm(tempSecurities[index])
      setIsGross(() => avaliableCompanies.special)
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
        disabled={view === 2}
      >
        {avaliableReinsurers
          .filter(
            reinsure => !companiesSelect.includes(reinsure.id) || security?.idCReinsuranceCompany?.id === reinsure.id
          )
          .map(reinsurer => (
            <MenuItem key={reinsurer.id} value={reinsurer.id}>
              {reinsurer.name}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText sx={{ color: 'error.main', minHeight: '15px' }}>{activeErros && errorMessage}</FormHelperText>
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
