import { useGetAllCoverage } from '@/hooks/catalogs/coverage'
import UserThemeOptions from '@/layouts/UserThemeOptions'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Checkbox, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'

export type SelectCoverageProps = {
  onChangeSelected: (converageSelected: CoverageDto) => void
  coverageSelected: CoverageDto[]
  onClickToggle: (value: number, label: string) => void
}
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
const SelectCoverage: React.FC<SelectCoverageProps> = ({ onChangeSelected, coverageSelected, onClickToggle }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const { coverages } = useGetAllCoverage()
  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    // setDisableBoundBtn(true)
    const selectedValue = event.target.value
    const coverageSelect = coverages.find(cov => cov.coverage === selectedValue)
    coverageSelect && onChangeSelected(coverageSelect)
  }

  // console.log('Seleccionados: ', coverages)

  return (
    <Grid item xs={12} sm={4}>
      <Select
        fullWidth
        sx={{ outline: 'none', borderColor: texButtonColor }}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={MenuProps}
        value={''}
        displayEmpty
        onChange={handleChangeSelect}
        renderValue={selected => {
          if (selected.length === 0) {
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
        {coverages
          .filter(coverage => !coverageSelected.includes(coverage))
          .map((item, index) => (
            <MenuItem
              value={item.coverage}
              role={undefined}
              onClick={() => {
                onClickToggle(item.id, item.coverage)
              }}
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
                checked={false}
                tabIndex={-1}
                disableRipple
              />
              <Typography sx={{ ml: 5 }}>{item.coverage}</Typography>
            </MenuItem>
          ))}
      </Select>
    </Grid>
  )
}

export default SelectCoverage
