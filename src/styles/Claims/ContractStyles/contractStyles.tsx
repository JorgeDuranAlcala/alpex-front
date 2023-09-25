import TextareaAutosize from '@mui/base/TextareaAutosize'
import { Typography, styled } from '@mui/material'

const TitleContract = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '20px',
  letterSpacing: '0.15px',
  color: '#4D5062DE',
  marginLeft: '8px'
}))

const TitleInputs = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '0.15px',
  color: '#4D5062DE'
}))

const ContainerInputs = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  height: 'auto',
  width: '100%'

  // border: '1px solid black'
})

const ContainerInstallments = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  height: 'auto',
  width: '100%',
  alignItems: 'center'
})

const StyledTextarea = styled(TextareaAutosize)(
  () => `
  width: 100%;
  font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  color: #4D5062DE;

  &:hover {
    border-color: '#2535a8';
  }

  &:focus {
    outline: none;
border-color: #2535a8;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

export { ContainerInputs, ContainerInstallments, StyledTextarea, TitleContract, TitleInputs }
