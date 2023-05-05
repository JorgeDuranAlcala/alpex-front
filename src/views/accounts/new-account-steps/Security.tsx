import { useEffect, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** MUI Imports
import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Components

// ** Third Party Imports

// ** Types

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/store'
import { updateFormsData } from 'src/store/apps/accounts'
import { ButtonClose, HeaderTitleModal } from 'src/styles/Dashboard/ModalReinsurers/modalReinsurers'
import SwitchAlpex from 'src/views/custom/switchs'

interface FormInfo extends PreviousFormInfo {
  NetPremium: string
  SharePercent: string
  DynamicComissionPercent: string
  FrontingFee: string
  ReinsuranceCompany: string
  PremiumPerShare: string
  DynamicComission: string
  FrontingFeePercent: string
  NetInsurancePremium: string
  RetroCedant: string
  RetroCedantContact: string
}

interface PreviousFormInfo {
  RecievedNetPremium?: string
  DistribuitedNetPremium?: string
  Diference?: string
}

const SecurityForm: FormInfo = {
  NetPremium: '',
  SharePercent: '',
  DynamicComissionPercent: '',
  FrontingFee: '',
  ReinsuranceCompany: '',
  PremiumPerShare: '',
  DynamicComission: '',
  FrontingFeePercent: '',
  NetInsurancePremium: '',
  RetroCedant: '',
  RetroCedantContact: '',
  RecievedNetPremium: '',
  DistribuitedNetPremium: '',
  Diference: ''
}

type SecurityProps = {
  onStepChange?: (step: number) => void
}

//Pending types
const FormSection = ({ index, formData, setFormData }: any) => {
  const [frontingFeeEnabled, setFrontingFeeEnabled] = useState(true)
  const handleFormChange = (field: keyof FormInfo, value: FormInfo[keyof FormInfo]) => {
    const data = [...formData]
    data[index][field] = value
    setFormData(data)
  }

  useEffect(() => {
    const data = [...formData]
    data[index]['RetroCedantContact'] = ''
    setFormData(data)
    //eslint-disable-next-line
  }, [formData[index].RetroCedant])

  return (
    <>
      <span className='switch-text'>Fronting fee </span>
      <SwitchAlpex
        onClick={() => {
          setFrontingFeeEnabled(!frontingFeeEnabled)
        }}
      />
      <div className='form-wrapper space-top'>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Net premium at 100%'
              value={formData.NetPremium}
              onChange={e => handleFormChange('NetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Share %'
              value={formData[index].SharePercent}
              onChange={e => handleFormChange('SharePercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission %'
              value={formData.DynamicComissionPercent}
              onChange={e => handleFormChange('DynamicComissionPercent', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee %'
                value={formData.FrontingFeePercent}
                onChange={e => handleFormChange('FrontingFeePercent', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>

        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Reinsurance companies</InputLabel>

            <Select
              label='Select a reinsurance company'
              value={formData.ReinsuranceCompany}
              onChange={e => handleFormChange('ReinsuranceCompany', e.target.value)}
              labelId='broker'
            >
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a reinsurance company
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Premium per share'
              value={formData.PremiumPerShare}
              onChange={e => handleFormChange('PremiumPerShare', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Dynamic comission'
              value={formData.DynamicComission}
              onChange={e => handleFormChange('DynamicComission', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          {frontingFeeEnabled && (
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <TextField
                autoFocus
                label='Fronting fee'
                value={formData.FrontingFee}
                onChange={e => handleFormChange('FrontingFee', e.target.value)}
              />

              {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
            </FormControl>
          )}
        </div>
        <div className='form-col'>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Net reinsurance premium'
              value={formData.NetInsurancePremium}
              onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro cedant</InputLabel>

            <Select
              label='Select Retro cedant'
              value={formData.RetroCedant}
              onChange={e => {
                handleFormChange('RetroCedant', e.target.value)
              }}
              labelId='broker'
            >
              <MenuItem value=''>Select Retro cedant</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select Retro cedant
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Select Retro Cedant contact</InputLabel>
            <Select
              label='Select Retro Cedant contact '
              value={formData[index].RetroCedantContact}
              onChange={e => handleFormChange('RetroCedantContact', e.target.value)}
              labelId='broker'
              disabled={formData[index].RetroCedant === ''}
            >
              <MenuItem value=''>Select Retro Cedant contact</MenuItem>
              <MenuItem value='br1'>Br1</MenuItem>
              <MenuItem value='br2'>Br2</MenuItem>
              <MenuItem value='br3'>Br3</MenuItem>
            </Select>
            {false && (
              <FormHelperText sx={{ color: 'error.main' }} id='broker-error'>
                Please select a Retro Cedant contact
              </FormHelperText>
            )}
          </FormControl>
          {formData[index].RetroCedantContact !== '' && (
            <>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Contact email'
                  size='small'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact phone'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                <TextField
                  autoFocus
                  fullWidth
                  size='small'
                  label='Contact country'
                  value={formData.NetInsurancePremium}
                  onChange={e => handleFormChange('NetInsurancePremium', e.target.value)}
                />

                {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
              </FormControl>
            </>
          )}
        </div>
        <div className='fullwidth'>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Recieved net premium'
              disabled
              fullWidth
              value={formData.RecievedNetPremium}
              onChange={e => handleFormChange('RecievedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label='Distribuited net premium'
              disabled
              value={formData.DistribuitedNetPremium}
              onChange={e => handleFormChange('DistribuitedNetPremium', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
          <FormControl className='form-col-input' sx={{ mb: 2, mt: 2 }}>
            <TextField
              autoFocus
              label='Diference'
              disabled
              value={formData.Diference}
              onChange={e => handleFormChange('Diference', e.target.value)}
            />

            {false && <FormHelperText sx={{ color: 'error.main' }}>Invalid field</FormHelperText>}
          </FormControl>
        </div>
      </div>
    </>
  )
}

const Security = ({ onStepChange }: SecurityProps) => {
  const [formData, setFormData] = useState<FormInfo[]>([{ ...SecurityForm }])
  const dispatch = useAppDispatch()
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [open, setOpen] = useState<boolean>(false)

  const addNewForm = () => {
    setFormData([...formData, { ...SecurityForm }])
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const onNextStep = () => {
    onStepChange!(3)
  }

  const handleNext = () => {
    setOpen(true)
  }

  const handleSubmit = () => {
    dispatch(updateFormsData({ form2: formData }))
  }

  return (
    <>
      <div className='information' style={{ fontFamily: inter }}>
        <div className='title'>Security</div>
        <form noValidate autoComplete='on' onSubmit={handleSubmit}>
          <div className='section'>
            {formData.map((_, index) => (
              <>
                {index > 0 && <hr style={{ margin: '40px 0px', backgroundColor: 'lightgray' }} />}
                <FormSection divider index={index} formData={formData} setFormData={setFormData} />
              </>
            ))}
          </div>
          <div className='add-reinsurer'>
            <Button
              type='button'
              onClick={addNewForm}
              variant='text'
              color='primary'
              size='large'
              fullWidth
              sx={{ justifyContent: 'start' }}
            >
              <Icon icon='material-symbols:add-circle-outline' fontSize={20} className='icon-btn' /> ADD REINSURER
            </Button>
          </div>
          <div className='section action-buttons' style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}>
            <Button className='btn-save' onClick={handleSubmit} variant='contained'>
              <div className='btn-icon'>
                <Icon icon='mdi:content-save' />
              </div>
              SAVE CHANGES
            </Button>
            <Button className='btn-next' onClick={handleNext}>
              Next Step
              <div className='btn-icon'>
                <Icon icon='material-symbols:arrow-right-alt' />
              </div>
            </Button>

            <Modal className='next-step-modal' open={open} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: 'absolute',
                  bgcolor: 'white',
                  top: '50%',
                  left: '50%',
                  boxShadow: 24,
                  pl: 5,
                  pr: 5,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '10px',
                  padding: '15px'
                }}
              >
                <HeaderTitleModal>
                  <div className='next-modal-title'>Ready to continue?</div>
                  <ButtonClose onClick={handleCloseModal}>
                    <CloseIcon />
                  </ButtonClose>
                </HeaderTitleModal>
                <div className='next-modal-text'>
                  You are about to advance to the next form. Make sure that all the fields have been completed with the
                  correct information.
                </div>
                <Button className='continue-modal-btn' variant='contained' onClick={onNextStep}>
                  CONTINUE
                </Button>
                <Button className='create-contact-modal' onClick={() => setOpen(false)}>
                  Keep editing information
                </Button>
              </Box>
            </Modal>
          </div>
        </form>
      </div>
    </>
  )
}

export default Security
