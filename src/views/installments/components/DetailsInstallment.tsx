import DigitalCenter from './DigitalCenter'
import Table from './TableHistory'

interface DetailInstallment {
  margin?: number
}

export default function DetailInstallment({}: any) {
  return (
    <div>
      <Table />
      <DigitalCenter />
    </div>
  )
}
