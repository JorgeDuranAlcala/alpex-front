import { Box, styled } from '@mui/material';
import { formInformationData } from './form_2_FormInformationData';

// import { accountData } from './form_2_ResponseGetAccount';

const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  gap: '8px',
  position: 'relative',
}));

const MockContainer = styled(Box)(() => ({
  padding: '10px',
  border: '1px solid #575757',
  width: '60%'
}));

const BoxMock = styled(Box)(() => ({
  backgroundColor: '#ccc',
  maxHeight: '600px',
  overflowY: 'auto',
}));

function formatJson(json: any) {
  return JSON.stringify(json, null, 2);
}

export const ViewMocks = () => {


  return (
    <Container>
      <MockContainer sx={{ width: '40%' }}>
        <h4>Form Information Data</h4>
        <BoxMock>
          <pre>{formatJson(formInformationData)}</pre>
        </BoxMock>
      </MockContainer>
      <MockContainer>
        <h4>Response Get Account</h4>
        <BoxMock>
          {/* <pre>{formatJson(accountData)}</pre> */}
        </BoxMock>
      </MockContainer>

    </Container>
  )
}
