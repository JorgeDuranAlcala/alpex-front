import Typography from '@mui/material/Typography'

interface DetailInstallment {
  margin?: number
}

export default function DetailInstallment({}: any) {
  return (
    <div>
      <Typography>History</Typography>
      <div className='mtop'>
        <Typography component='span' sx={{ fontWeight: 'bold' }}>
          Alejandro Hernández
        </Typography>
        <Typography component='span'> sent email to mail@mail.com</Typography>
        <br />
        <Typography component='p' sx={{ color: '#4D506261', fontSize: '13px' }}>
          Today 1:15PM
        </Typography>
        <hr className='lightgray' />
        <Typography>Documents</Typography>
        <hr className='lightgray' />
        <Typography>Comments</Typography>
      </div>
    </div>
  )
}
