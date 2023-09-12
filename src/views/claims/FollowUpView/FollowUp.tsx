import AcordionCard from '../Components/AcordionCard'
import ButtonSave from '../Components/ButtonSave'
import ButtonHistory from './Components/ButtonHistory'
import FollowData from './Views/FollowData'

const FollowUp = () => {
  return (
    <>
      <AcordionCard title={'Follow Up'}>
        <ButtonHistory />
        <FollowData />
        <ButtonSave />
      </AcordionCard>
    </>
  )
}

export default FollowUp
