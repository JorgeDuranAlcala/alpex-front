import { useAppSelector } from '@/store';
import {
  Button,
  Grid,
} from '@mui/material';
import Icon from 'src/@core/components/icon';


interface FormBottomButtonsProps {
  onClickAddReinsurer: () => void
  onClickSave: () => void
  onClickNextStep: () => void;
}

interface ButtonProps {
  isDisabled: boolean
  onClick: () => void
}

export const FormBottomButtons = ({ onClickAddReinsurer, onClickSave, onClickNextStep }: FormBottomButtonsProps) => {

  const { securities, } = useAppSelector(state => state.securitySlice)

  return (
    <>

      {/* ADD REINSURER */}
      <Grid item xs={12} sm={12} >
        <ButtonAddReinsurer
          isDisabled={securities.length > 0 && securities[0].view === 2}
          onClick={onClickAddReinsurer}
        />

      </Grid>


      <Grid item xs={12} sm={12}>
        <div
          className='section action-buttons'
          style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
        >
          {/* SAVE CHANGES */}
          <ButtonSaveData
            isDisabled={securities.length > 0 && securities[0].view === 2}
            onClick={onClickSave}
          />

          {/* NEXT STEP */}
          <ButtonNextStep
            isDisabled={securities.length > 0 && securities[0].view === 2}
            onClick={onClickNextStep}
          />
        </div>
      </Grid>
    </>
  )
}

function ButtonAddReinsurer({ isDisabled, onClick }: ButtonProps) {
  return (
    <div className='add-reinsurer'>
      { }
      <Button
        disabled={isDisabled}
        type='button'
        onClick={onClick}
        variant='text'
        color='primary'
        size='large'
        fullWidth
        sx={{ justifyContent: 'start' }}
      >
        <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD
        REINSURER
      </Button>
    </div>
  )
}

function ButtonSaveData({ isDisabled, onClick }: ButtonProps) {

  return (
    <Button
      disabled={isDisabled}
      className='btn-save'
      color='success'
      variant='contained'
      onClick={onClick}
    >
      <div className='btn-icon'>
        <Icon icon='mdi:content-save' />
      </div>
      SAVE CHANGES
    </Button>
  )
}

function ButtonNextStep({ isDisabled, onClick }: ButtonProps) {

  return (
    <Button
      disabled={isDisabled}
      className='btn-next'
      onClick={onClick}
    >
      Next Step
      <div className='btn-icon'>
        <Icon icon='material-symbols:arrow-right-alt' />
      </div>
    </Button>
  )
}
