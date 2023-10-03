import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';

import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext';
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType';

import { useGetAllReinsuranceCompanies } from '@/hooks/catalogs/reinsuranceCompany';


interface FilterMenuReinsurerProps {
  auxFilterText?: string
  detailsType: DetailsType;
  handleClose?: () => void;

}

const FilterMenuReinsurer = ({auxFilterText = 'Reinsurer', detailsType, handleClose }: FilterMenuReinsurerProps) => {

  const { handleChangeFilters } = useContext(OverviewDetailsContext);
  const { reinsuranceCompany: reinsurers } = useGetAllReinsuranceCompanies();


  const handleSelectReinsurer = (name: string) => {

    if (!reinsurers) return;

    const selectedReinsurer = reinsurers.filter(reinsurer => reinsurer.name === name)[0];

    if (!selectedReinsurer) return;

    handleChangeFilters({
      type: 'reinsurer',
      value: selectedReinsurer.id,
      text: `${auxFilterText}: ${	selectedReinsurer.name}`
    }, detailsType);

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
