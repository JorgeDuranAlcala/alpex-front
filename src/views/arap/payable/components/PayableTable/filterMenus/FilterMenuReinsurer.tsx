import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';


import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany';
import { PayableContext } from '../../../context/PayableContext';
import { payableEFieldColumn } from '../payableEFieldColumn';


interface FilterMenuReinsurerProps {
  auxFilterText?: string;
  handleClose?: () => void;

}

const FilterMenuReinsurer = ({auxFilterText = 'Reinsurer',  handleClose }: FilterMenuReinsurerProps) => {

  const { handleChangeFilters } = useContext(PayableContext);
  const { reinsuranceCompany: reinsurers } = useGetAllReinsuranceCompanies();


  const handleSelectReinsurer = (name: string) => {

    if (!reinsurers) return;

    const selectedReinsurer = reinsurers.filter(reinsurer => reinsurer.name === name)[0];

    if (!selectedReinsurer) return;

    handleChangeFilters({
      type: payableEFieldColumn.CAPABILITY_ID,
      value: selectedReinsurer.id,
      text: `${auxFilterText}: ${	selectedReinsurer.name}`
    });

    if (handleClose) {
      handleClose();
    }

  }

  return (
    <>
      <Autocomplete

        id="combo-box-reinsurer"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Reinsurer" />}
        options={reinsurers ? reinsurers.map((reinsurer) => reinsurer.name) : []}

        onChange={(event: any, newValue: string | null) => {
          handleSelectReinsurer(newValue || '');
        }}
      />

    </>
  )
}

export default FilterMenuReinsurer
