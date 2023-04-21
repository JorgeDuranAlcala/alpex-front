import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import CommentSection from 'src/views/accounts/new-account-steps/CommentSection';
import Information from 'src/views/accounts/new-account-steps/information';


const NewAccount = () => {

  const [disableComments, setDisableComments] = useState(true)

  return (
    <Grid className="new-account" item xs={12}>
      <Card>
        New Account header
      </Card>
      <Card>
        <div>Accoun Stepper</div>
        <Information/>
      </Card>
      <Card>
        <CommentSection disable={disableComments}/>
      </Card>
    </Grid>
  )
}

export default NewAccount
