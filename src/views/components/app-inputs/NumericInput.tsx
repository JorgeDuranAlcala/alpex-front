import Cleave from 'cleave.js/react';
import CleaveWrapper from 'src/@core/styles/libs/react-cleave';

import 'cleave.js/dist/addons/cleave-phone.us';

interface Props{
  field: any,
  onValueChange: (arg0: any) => void,
  label: string,
  prefix?: string | " ",
}

const NumericInput: React.FC<Props> = ({
  field,
  onValueChange,
  label,
  prefix
}) => {
  const handleChange = (event: { target: { value: any; }; }) => {

    onValueChange(event.target.value);
  };

  return (
    <>
   <CleaveWrapper>


      <Cleave
        options={{
          prefix: prefix, numeral: true, numeralThousandsGroupStyle: 'thousand', numeralDecimalScale: 2,
          numeralDecimalMark: ','
        }}
        value={field}
        placeholder={label}
        onChange={handleChange}
      />
      </CleaveWrapper>

    </>

  );
};

export default NumericInput;
