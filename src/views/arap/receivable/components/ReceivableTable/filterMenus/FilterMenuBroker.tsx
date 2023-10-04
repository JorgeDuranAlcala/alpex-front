// ** MUI Imports
// import MenuItem from '@mui/material/MenuItem'



import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';


import { payableEFieldColumn } from '@/views/arap/payable/components/PayableTable/payableEFieldColumn';
import { useGetAll as useBrokerGetAll } from 'src/hooks/catalogs/broker';
import { ReceivableContext } from '../../../context/ReceivableContext';


interface FilterMenuBrokerProps {
  auxFilterText?: string
  handleClose?: () => void;

}

const FilterMenuBroker = ({ auxFilterText = 'Broker',  handleClose }: FilterMenuBrokerProps) => {

  const { handleChangeFilters } = useContext(ReceivableContext);
  const { brokers } = useBrokerGetAll();


  const handleSelectBroker = (name: string) => {

    const selectedBroker = brokers.filter(broker => broker.name === name)[0];

    if (!selectedBroker) return;

    handleChangeFilters({
      type: payableEFieldColumn.CAPABILITY_ID,
      value: selectedBroker.id,
      text: `${auxFilterText}: ${selectedBroker.name}`
    });

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
