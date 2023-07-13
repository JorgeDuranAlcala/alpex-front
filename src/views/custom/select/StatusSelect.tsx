import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import Status from 'src/views/accounts/Table/Status'

interface StatusSelect {
  setSelectedStatus: React.Dispatch<React.SetStateAction<any>>
  initialStatus: string
  margin?: number
}

const statusArray = [
  {
    label: 'Pending',
    value: 'PENDING',
    status: 'pending',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #FFB446;'
  },
  {
    label: 'Not Materialized',
    value: 'NOT_MATERIALIZED',
    status: 'notMaterialized',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #FFB446;'
  },
  {
    label: 'Not Taken Up',
    value: 'NOT_TAKEN_UP',
    status: 'notTakenUp',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #FFB446;'
  },
  {
    label: 'Declined',
    value: 'DECLINED',
    status: 'declined',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #FFB446;'
  },
  {
    label: 'Bound',
    value: 'BOUND',
    status: 'bound',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #fffff;'
  }
]

export default function StatusSelect({ setSelectedStatus, initialStatus, margin = 1 }: any) {
  //eslint-disable-next-line
  const [value, setValue] = useState<string | null>(null)
  const [status, setStatus] = useState(initialStatus)

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
    setSelectedStatus(statusArray.find(stat => stat.label === event.target.value))
  }
  useEffect(() => {
    setSelectedStatus(statusArray.find(stat => stat.label === value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  /**
   *
   * PENDING = 'pending',
  NOT_MATERIALIZED = 'not materialized',
  NOT_TAKEN_UP = 'not taken up',
  DECLINED = 'declined',
  BOUND = 'Bound',
  */

  return (
    <div className='status-select'>
      <FormControl sx={{ m: margin, width: '100%' }} size='small'>
        <Select
          className='status-select-input'
          labelId='demo-select-small-label'
          id='demo-select-small'
          sx={{ background: '#E6EDFD', borderRadius: '20px', border: '0px solid' }}
          value={status}
          onChange={handleChange}
        >
          {statusArray.map(stat => (
            <MenuItem key={stat.value} value={stat.value}>
              <Status status={statusArray.find(statObj => stat.value === statObj.value)!.status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
