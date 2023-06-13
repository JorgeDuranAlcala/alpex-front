import { Box, Card, Typography, styled } from '@mui/material/';

const ContainerCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',

  // height: '393px',
  minWidth: '500px',

  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  }

})) as typeof Card;

const HeaderTitle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px 20px 0px',
  width: '100%',
  height: '73px'
})

const ContainerTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '53px'
})

const ContainerFrame = styled('div')({
  // backgroundColor: 'lightCoral',
  justifySelf: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  // height: '200px',
  // margin: '0 auto',
  paddingTop: '16px',
  paddingLeft: '20px',
  paddingRight: '25px',
  width: '100%',
  maxWidth: '500px',

  '@media (min-width: 470px)': {

    paddingTop: '24px',
  },
})

const ContainerRightFrame = styled(Box)(() => ({
  // backgroundColor: 'blue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media screen and (min-width: 580px)': {
    width: '100%',
    justifyContent: 'flex-start',
  }

}));

const ContainerCircularProgress = styled(Box)(() => ({
  // backgroundColor: 'lime',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  transform: 'scale(0.6)',

  '@media (min-width: 410px)': {

    width: '140px',
    height: '140px',
  },

  '@media (min-width: 470px)': {

    // width: '140px',
    // height: '140px',
    transform: 'scale(0.8)',
  },


  '@media (min-width: 520px)': {

    width: '100%',
    transform: 'scale(0.9)',
  },

  // '@media (max-width: 490px)': {
  //   width: '150px',
  //   transform: 'scale(0.6)',
  // },

  // '@media (min-width: 520px)': {

  //   width: '200px',
  //   height: '200px',
  //   transform: 'scale(0.6)',
  // },


}));

const ContainerPayments = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'flex-end',

  // justifyContent: 'space-between',
  gap: '16px',
  width: '100%',

  // height: '50%',

  '@media screen and (min-width: 580px)': {
    maxWidth: '50%',

    // backgroundColor: 'lightcoral'
  }
})

const ContainerAccounts = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '24px',
  maxWidth: '220px',


})

const ContentTextAccounts = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '75%',
  height: '100%',
  alignItems: 'center',
  gap: '10px',

  // marginRight: '10%'

  // border: '1px solid black'
})
const ContainerTotal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 'auto',
  marginTop: '12px',
  gap: '16px'
})


const AccountsDescription = styled(Typography)(() => ({
  color: '#56555A',
  fontFamily: 'lato',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '15px',
  letterSpacing: '0.4px',

})) as typeof Typography;

const AccountsNumber = styled(Typography)(() => ({

  color: '#535353',
  fontFamily: 'lato',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.15px',

})) as typeof Typography;

export {
  AccountsDescription, AccountsNumber, ContainerAccounts, ContainerCard, ContainerCircularProgress, ContainerFrame, ContainerPayments, ContainerRightFrame, ContainerTitle, ContainerTotal,
  ContentTextAccounts, HeaderTitle
};

