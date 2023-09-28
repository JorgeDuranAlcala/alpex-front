import AcordionCard from '../Components/AcordionCard'
import ButtonSave from '../Components/ButtonSave'
import ClaimRegister from './Views/ClaimRegister'

const Claim = () => {
  return (
    <>
      <AcordionCard title={'Claim'}>
        <ClaimRegister />
        <ButtonSave />
      </AcordionCard>
    </>
  )
}

export default Claim
