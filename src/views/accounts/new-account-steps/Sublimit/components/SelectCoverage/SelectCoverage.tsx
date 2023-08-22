
import { useGetAllCoverage } from '@/hooks/catalogs/coverage'
import UserThemeOptions from '@/layouts/UserThemeOptions'
import { CoverageDto } from '@/services/catalogs/dtos/coverage.dto'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Checkbox, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { FormAddNewCoverage, ModalAddNewCoverage, OptionAddNewCoverage } from './addNewCoverage'

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
const SelectCoverage: FC<SelectCoverageProps> = ({ onChangeSelected, coverageSelected, onClickToggle }) => {
  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const { coverages, getAllCoverages } = useGetAllCoverage();

  const texButtonColor = userThemeConfig.palette?.buttonText.primary

  // console.log({ coverages });


  const [isOpenModalAddNewCoverage, setIsOpenModalAddNewCoverage] = useState<boolean>(false);
  const [unselectedCoverages, setUnselectedCoverages] = useState<CoverageDto[]>([])

  const handleChangeSelect = (event: SelectChangeEvent<string> | any) => {
    // setDisableBoundBtn(true)
    // console.log("Entra data", event);

    const selectedValue = event.target.value

    // console.log('handleChange', event.target.value);

    if (selectedValue === 'new_coverage') {
      setIsOpenModalAddNewCoverage(true);
    } else {

      const coverageSelect = coverages.find(cov => cov.coverage === selectedValue)
      coverageSelect && onChangeSelected(coverageSelect)
    }

    // console.log('coverageSelect: ', coverageSelect, 'selectedValue: ', selectedValue);
  }

  // console.log('Seleccionados: ', coverageSelected);

  const handleOnCreatedNewCoverage = () => {
    handleCloseModalAddNewCoverage();


    getAllCoverages();
  }

  const handleCloseModalAddNewCoverage = () => {
    setIsOpenModalAddNewCoverage(false);
  }

  useEffect(() => {

    const selectedCoveragesIds = coverageSelected.map(selectedCoverage => selectedCoverage.id);

    // console.log("has seleccionado las siguientes: -->  ", selectedCoveragesIds);
    setUnselectedCoverages(coverages.filter(coverage => !selectedCoveragesIds.includes(coverage.id)))

  }, [coverages, coverageSelected])


  // console.log("has seleccionado las siguientes: ", coverageSelected);


  return (
    <>
      <ModalAddNewCoverage
        isOpen={isOpenModalAddNewCoverage}
        onClose={handleCloseModalAddNewCoverage}
      >
        <FormAddNewCoverage
          onCreated={handleOnCreatedNewCoverage}
          onCancel={handleCloseModalAddNewCoverage}
        />
      </ModalAddNewCoverage>

      <Grid item xs={12} sm={6} md={4}>
        <Select
          fullWidth
          sx={{ outline: 'none', borderColor: texButtonColor }}
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={MenuProps}
          value={''}
          displayEmpty

          // onChange={handleChangeSelect}
          renderValue={(selected) => {
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
          <OptionAddNewCoverage onChange={handleChangeSelect} />
          {unselectedCoverages
            .map((item, index) => (
              <MenuItem
                role={undefined}
                key={index}
                sx={{
                  height: '50px',
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '4px 20px',
                }}
              >
                <Checkbox
                  value={item.coverage}
                  onClick={() => {
                    onClickToggle(item.id, item.coverage)
                  }}
                  onChange={handleChangeSelect}
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: '#2535A8',
                    '&.Mui-checked': {
                      color: '#2535A8'
                    },
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
    </>
  )
}

export default SelectCoverage
