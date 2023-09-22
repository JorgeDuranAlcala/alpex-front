import AcordionCard from '../Components/AcordionCard'
import ButtonSave from '../Components/ButtonSave'
import CustomerSelection from './Views/CustomerSelection'

const Contract = () => {
  return (
    <>
      <AcordionCard title={'Contract'}>
        <CustomerSelection />
        <ButtonSave />
      </AcordionCard>
    </>
  )
}

export default Contract
