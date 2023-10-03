// ** MUI Imports
// import MenuItem from '@mui/material/MenuItem'



import { OverviewDetailsContext } from '@/views/arap/overview/context/overviewDetails/OverviewDetailsContext';
import { DetailsType } from '@/views/arap/overview/interfaces/overview/DetailsType';
import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';


import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker';


interface FilterMenuBrokerProps {
  auxFilterText?: string
  detailsType: DetailsType;
  handleClose?: () => void;

}

const FilterMenuBroker = ({ auxFilterText = 'Broker', detailsType, handleClose }: FilterMenuBrokerProps) => {

  const { handleChangeFilters } = useContext(OverviewDetailsContext);
  const { brokers } = useBrokerGetAll();


  const handleSelectBroker = (name: string) => {

    const selectedBroker = brokers.filter(broker => broker.name === name)[0];

    if (!selectedBroker) return;

    handleChangeFilters({
      type: 'broker',
      value: selectedBroker.id,
      text: `${auxFilterText}: ${selectedBroker.name}`
    }, detailsType);

    if (handleClose) {
      handleClose();
    }

  }

  return (
    <>
      <Autocomplete

        id="combo-box-broker"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Broker" />}
        options={brokers.map((broker) => broker.name)}

        onChange={(event: any, newValue: string | null) => {
          handleSelectBroker(newValue || '');
        }}
      />

    </>
  )
}

export default FilterMenuBroker
