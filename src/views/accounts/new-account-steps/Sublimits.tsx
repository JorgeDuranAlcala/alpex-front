import GenericCard from '@/layouts/components/SublimitsCards/GenericCard'
import CheckIcon from '@mui/icons-material/Check'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'
import SublimitCard, { RenderFormGeneric } from 'src/layouts/components/CardSublimit'
import {
  ContainerTitleSublimits,
  GeneralContainerSublimits,
  InputsContainerSublimits,
  NextContainer
} from 'src/styles/Forms/Sublimits'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: 8
    }
  }
}
const coverage = [
  { id: 0, label: 'Wind' },
  { id: 1, label: 'Earthquake' },
  { id: 2, label: 'Flood' },
  { id: 3, label: 'Business interruption' },
  { id: 4, label: 'Fire' },
  { id: 5, label: 'Terrorism' },
  { id: 6, label: 'Machinery breakdown' },
  { id: 7, label: 'AMIT & SRCC' },
  { id: 8, label: 'Electronic Equipment' },
  { id: 9, label: 'Business Interruption Machinery Breakdown' }
]

const Sublimits = () => {
  const forms = GenericCard
  console.log(forms)
  const [checked, setChecked] = useState<number[]>([])
  const [coverageSelect, setCoverageSelect] = useState<any>('')
  const [availableOptions, setAvailableOptions] = useState<any[]>(coverage)
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  console.log('Selected', availableOptions)
  console.log('Pusheados', filteredOptions)
  const [formsCheck] = useState<RenderFormGeneric[]>([])
  console.log('arrayForms--->', formsCheck)
  const handleToggle = (value: number, label: string) => () => {
    console.log(label)
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
      formsCheck.push({
        type: value,
        components: forms,
        title: label
      })
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleChangeSelect = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value
    console.log(selectedValue)
    setCoverageSelect(selectedValue)
    setAvailableOptions(availableOptions.filter(option => option.label !== selectedValue))
    const filter = availableOptions.filter(option => option.label === selectedValue)
    if (!filteredOptions.some(item => item.label === filter[0]?.label)) {
      setFilteredOptions(current => current.concat(filter))
    } else return
  }

  const addOption = (name: string) => {
    const add = filteredOptions.filter(obj => obj.label === name)
    if (!availableOptions.some(item => item.label === add[0].label)) {
      setAvailableOptions(availableOptions.concat(add))
    } else {
      return
    }
  }
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())

  const inter = userThemeConfig.typography?.fontFamilyInter
  const size = userThemeConfig.typography?.size.px14
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  return (
    <>
      <GeneralContainerSublimits>
        <ContainerTitleSublimits>
          <Typography variant='h5'>Sublimits</Typography>
          <InputsContainerSublimits>
            <TextField
              sx={{ width: '48.5%' }}
              value={'Limit'}
              InputProps={{
                disabled: true
              }}
            />
            <FormControl fullWidth>
              <Select
                sx={{ width: '48.5%', outline: 'none' }}
                IconComponent={KeyboardArrowDownIcon}
                MenuProps={MenuProps}
                value={coverageSelect}
                displayEmpty
                onChange={handleChangeSelect}
                renderValue={selected => {
                  if ((selected as unknown as string[]).length === 0) {
                    return (
                      <Typography
                        sx={{
                          color: texButtonColor,
                          fontSize: userThemeConfig.typography?.size.px15,
                          fontWeight: 500,
                          letterSpacing: '0.46px'
                        }}
                      >
                        ADD COVERAGE
                      </Typography>
                    )
                  }

                  return selected as unknown as string[]
                }}
              >
                {availableOptions &&
                  availableOptions.map((item, index) => (
                    <MenuItem
                      value={item.label}
                      role={undefined}
                      onClick={handleToggle(item.id, item.label)}
                      key={index}
                      sx={{
                        height: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '4px 20px'
                      }}
                    >
                      <Checkbox
                        sx={{
                          width: '24px',
                          height: '24px',
                          color: '#2535A8',
                          '&.Mui-checked': {
                            color: '#2535A8'
                          }
                        }}
                        checked={checked.indexOf(item.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                      <Typography sx={{ ml: 5 }}>{item.label}</Typography>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </InputsContainerSublimits>
        </ContainerTitleSublimits>
        <Box sx={{ flexGrow: 1, mt: 6, width: '100%' }}>
          <Grid container spacing={{ xs: 2, sm: 5.3, md: 5.3 }} rowSpacing={12} columns={{ xs: 4, sm: 8, md: 12 }}>
            {formsCheck.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <SublimitCard
                  components={
                    <item.components
                      state={item.state}
                      setState={item.setState}
                      title={item.title}
                      deleteForm={() => addOption(item.title ?? '')}
                    />
                  }
                  state={item.state}
                  setState={item.setState}
                  type={item.type}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </GeneralContainerSublimits>
      <NextContainer>
        <Button
          variant='contained'
          color='success'
          sx={{ mr: 2, fontFamily: inter, fontSize: size, letterSpacing: '0.4px' }}
        >
          <SaveIcon /> &nbsp; Save changes
        </Button>
        <Button
          sx={{
            fontFamily: inter,
            letterSpacing: '0.4px',
            fontSize: userThemeConfig.typography?.size.px15,
            color: texButtonColor
          }}
          disabled
        >
          <CheckIcon /> &nbsp; Add bound
        </Button>
      </NextContainer>
    </>
  )
}

export default Sublimits

{
  /* <Grid>
{Array.from(Array(6)).map((_, index) => (
  <Item key={index}>xs=2</Item>
))}
</Grid> */
}

{
  /* <Select sx={{ width: '35.5%', outline: 'none' }} IconComponent={KeyboardArrowDownIcon} defaultValue={'Add'}>
{coverage &&
  coverage.map((item, index) => (
    <MenuItem
      role={undefined}
      onClick={handleToggle(item.id)}
      key={index}
      sx={{
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        padding: '4px 20px'
      }}
    >
      <Checkbox
        sx={{
          width: '24px',
          height: '24px',
          color: '#2535A8',
          '&.Mui-checked': {
            color: '#2535A8'
          }
        }}
        checked={checked.indexOf(item.id) !== -1}
        tabIndex={-1}
        disableRipple
      />
      <Typography sx={{ ml: 5 }}>{item.label}</Typography>
    </MenuItem>
  ))}
</Select> */
}

{
  /* <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
            <Select
              IconComponent={KeyboardArrowDownIcon}
              label='Tag'
              value={'Hola'}

              // value={personName}
              // MenuProps={MenuProps}
              // onChange={handleChange}
              id='demo-multiple-checkbox'
              labelId='demo-multiple-checkbox-label'

              // renderValue={selected => (selected as unknown as string[]).join(', ')}
            >
              {coverage.map((name, index) => (
                <MenuItem key={index} value={name.id}>
                  <Checkbox

                  // checked={personName.indexOf(name) > -1}
                  />
                  <ListItemText primary={name.label} />
                </MenuItem>
              ))}
            </Select> */
}
