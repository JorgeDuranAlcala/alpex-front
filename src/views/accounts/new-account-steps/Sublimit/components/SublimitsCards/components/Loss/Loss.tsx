import UserThemeOptions from '@/layouts/UserThemeOptions'
import { SublimitDto } from '@/services/accounts/dtos/sublimit.dto'
import { SubContainer } from '@/styles/Forms/Sublimits'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { FormHelperText, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { FormErrors } from '../../../../Sublimits'

export type LossProps = {
  onHandleChangeSubLimit: (deductibleDamage: SublimitDto) => void
  subLimit: SublimitDto
  errorCard: FormErrors
  showErrors: boolean
}

const Loss: React.FC<LossProps> = ({ subLimit, onHandleChangeSubLimit, errorCard, showErrors }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const size = userThemeConfig.typography?.size.px16
  const textColor = userThemeConfig.palette?.text.subTitle

  const handleChangeItem = (event: any, name: string) => {
    const subLimitTemp = { ...subLimit, [name]: event.target.value }

    onHandleChangeSubLimit(subLimitTemp)
  }

  return (
    <SubContainer sx={{ height: 'auto' }}>
      <Typography variant='body1' sx={{ fontSize: size, color: textColor, fontWeight: 600, letterSpacing: '0.15px' }}>
        Loss
      </Typography>
      <Select
        sx={{ width: '100%', height: '48px', outline: 'none' }}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        onChange={e => {
          handleChangeItem(e, 'test')
        }}
      >
        <MenuItem key={0} value={0}>
          {'No options available'}
        </MenuItem>
      </Select>
      <FormHelperText sx={{ color: 'error.main', marginTop: '-3px' }}>{showErrors && errorCard.amount}</FormHelperText>
    </SubContainer>
  )
}

export default Loss
