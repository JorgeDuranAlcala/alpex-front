import { formatStatusToNumber } from '@/utils/formatStatus'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import useAccountTable from 'src/hooks/accounts/Table/useAccountTable'
import { useAuth } from 'src/hooks/useAuth'
import Status, { EStatus, EStatusString } from 'src/views/accounts/Table/Status'
import ModalAction from '../modal'

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

export default function StatusSelect({
  isNewAccount = false,
  accountDetails,
  setSelectedStatus,
  initialStatus,
  margin = 1
}: any) {
  const { changeStatusAccounts } = useAccountTable()
  //eslint-disable-next-line
  const [value, setValue] = useState<string | null>(null)
  const [status, setStatus] = useState(initialStatus)
  const [statusArrayTemp, setStatusArrayTemp] = useState(statusArray)
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false)
  const [textChangeStatusModal, setTextChangeStatusModal] = useState('')

  const auth = useAuth()
  const handleChange = (event: SelectChangeEvent) => {
    if (status !== event.target.value && !isNewAccount) {
      handleTextChangeStatusModal(event.target.value)
      setShowChangeStatusModal(true)
      setStatus(event.target.value)
      setSelectedStatus(statusArray.find(stat => stat.label === event.target.value))
    } else {
      setStatus(event.target.value)
      sessionStorage.setItem('accountStatus', event.target.value)
      setSelectedStatus(statusArray.find(stat => stat.label === event.target.value))
    }
  }
  const handleChangeStatusAction = async () => {
    if (status) {
      const changeStatusArray = [
        {
          idAccount: accountDetails.id,
          status: formatStatusToNumber(EStatus[status as keyof typeof EStatus])
        }
      ]
      await changeStatusAccounts({
        updateStatus: changeStatusArray
      })
    }
  }
  const handleClickCancel = () => {
    setStatus(initialStatus)
  }
  const handleTextChangeStatusModal = (newStatus: string) => {
    const msg = 'You are about to change'
    setTextChangeStatusModal(`${msg} #${accountDetails.id} to a ${EStatusString[newStatus as keyof typeof EStatus]}.`)
  }
  useEffect(() => {
    setSelectedStatus(statusArray.find(stat => stat.label === value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (accountDetails?.status == 'PENDING') {
      if (auth?.user?.role == 'Underwriter') {
        const statusArrayFilter = statusArray.filter(item => {
          if (item.label != 'Bound') {
            return item
          }
        }, [])
        setStatusArrayTemp(statusArrayFilter)
      }
    } else if (accountDetails?.status == 'BOUND') {
      if (auth?.user?.role == 'Underwriter') {
        const statusArrayFilter = statusArray.filter(item => {
          if (item.label == 'Bound') {
            return item
          }
        }, [])
        setStatusArrayTemp(statusArrayFilter)
      } else if (auth?.user?.role == 'Lead underwriter' || auth?.user?.role == 'Technical assistant') {
        if (accountDetails?.endorsements > 0) {
          const statusArrayFilter = statusArray.filter(item => {
            if (item.label == 'Bound') {
              return item
            }
          }, [])
          setStatusArrayTemp(statusArrayFilter)
        } else {
          const statusArrayFilter = statusArray.filter(item => {
            if (item.label == 'Bound' || item.label == 'Pending') {
              return item
            }
          }, [])
          setStatusArrayTemp(statusArrayFilter)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails])

  useEffect(() => {
    setStatus(initialStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStatus])

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
          {statusArrayTemp.map(stat => (
            <MenuItem key={stat.value} value={stat.value}>
              <Status status={statusArrayTemp.find(statObj => stat.value === statObj.value)!.status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ModalAction
        headingText={textChangeStatusModal}
        text='Do you want to proceed?'
        handleClickContinue={handleChangeStatusAction}
        setShow={showChangeStatusModal}
        onClose={() => {
          setShowChangeStatusModal(false)
        }}
        handleClickCancel={handleClickCancel}
      />
    </div>
  )
}
