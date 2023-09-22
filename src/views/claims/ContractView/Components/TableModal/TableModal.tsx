import ButtonFilter from '@components/button-filter'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Fragment, useState } from 'react'
import UserThemeOptions from 'src/layouts/UserThemeOptions'

const userThemeConfig: any = Object.assign({}, UserThemeOptions())

const inter = userThemeConfig.typography?.fontFamilyInter

function createData(name: string, calories: string, fat: number) {
  return {
    name,
    calories,
    fat
  }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='left'>{row.calories}</TableCell>
        <TableCell align='left'>{row.fat}</TableCell>
        <TableCell align='left'>
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              console.log('click')
            }}
          >
            <Button
              variant='outlined'
              sx={{
                width: 'auto',
                height: '30px',
                fontSize: '13px',
                color: userThemeConfig.palette?.buttonText.primary,
                fontFamily: inter
              }}
            >
              VIEW ENDORSEMENT
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ padding: 0 }} bgcolor={'#575A6F1F'}>
              <Typography
                fontSize={12}
                paddingLeft={4}
                paddingRight={4}
                paddingTop={4}
                fontWeight={'bold'}
                textTransform={'uppercase'}
                gutterBottom
                component='div'
              >
                Reason of endorsement
              </Typography>
              <Typography fontSize={14} paddingLeft={4} paddingRight={4} paddingBottom={4} gutterBottom component='p'>
                This is a very large note, This is a very large note This is a very large note, This is a very large
                note This is a very large note, This is a very large note This is a very large note This is a very large
                note This is a very large note This is a very large note This is a very large note This is a very large
                note This is a very large note, This is a very large note This is a very large note, This is a very
                large note, This is a very large note, This is a very large note, This is a ver...
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const rows = [
  createData('A-Increase', 'DD/MM/YY', 7),
  createData('B-Informative', 'DD/MM/YY', 4),
  createData('A-Increase', 'DD/MM/YY', 11)
]
const brokers = ['Broker name', 'Broker name', 'Broker name', 'Broker name']

export default function CollapsibleTable() {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead style={{ backgroundColor: '#4C4E640A' }}>
            <TableRow>
              <TableCell />
              <TableCell width={'auto'} align='left'>
                Type of endorsement
                <ButtonFilter dataFilter={brokers} insured endorsement />
              </TableCell>
              <TableCell align='left'>
                Date of Creation
                <ButtonFilter dataFilter={brokers} insured endorsement />
              </TableCell>
              <TableCell align='left'>
                Fields modified
                <ButtonFilter dataFilter={brokers} insured endorsement />
              </TableCell>
              <TableCell align='left'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
