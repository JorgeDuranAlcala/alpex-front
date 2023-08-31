import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Dto imports
 import { IEarthquakeDetailDto } from '@/services/dynamic-data/dtos/dashboard.dto'

//services imports
// import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

// Custom Hooks
// import { useGetTotalInvestment } from '@/hooks/dynamic-data/dashboard'

type EarthquakeDetailProps = {
  earthquakeData: IEarthquakeDetailDto,
  earthquakeDetected: boolean
}


const EarthquakeDetails: React.FC<EarthquakeDetailProps> = ({earthquakeData, earthquakeDetected}) => {
  // ** Props
  // const { getTotalInvestment } = useGetTotalInvestment()

  const [detailsData, setDetailsData] = useState({
    magnitude: ' ',
    depth: ' ',
    epicenter: ' ',
    coordinatesCenter: ' ',
    dateTime: ' '
  })

  // const setDataInformation = async () => {
  //   const data = await DashboardMockService.getEarthquakesDetails()


  //   if (!data) return

  //   const newData = {
  //     magnitud: data.magnitud || ' ',
  //     depht: data.depht || ' ',
  //     epicenter: data.epicenter || ' ',
  //     coordinates: data.coordinates || ' ',
  //     dateTime: data.dateTime || ' '
  //   }
  //   setDetailsData(newData)
  // }

  useEffect(() => {
    // setDataInformation()
    if(earthquakeDetected){
      setDetailsData(earthquakeData)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earthquakeData, earthquakeDetected])

  return (
    <Card className='earthquake-details'>
      <div className='map-details-wrapper'>
        <div className='details-col' style={{ gap: '10px' }}>
          <div>
            <div className='details-row title'>
              <div className='magnitude-icon'>
                <Icon className='red-icons' icon='mdi:chart-line-variant' />
              </div>
              MAGNITUDE
            </div>
            <div className='details-row'>
              {detailsData.magnitude}
            </div>
          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className='details-col'>

          <div>
            <div className='details-row title'>
              <Icon className='red-icons' icon='mdi:arrow-down-thin-circle-outline' />
              DEPTH
            </div>
            <div className='details-row'>
              {detailsData.depth}
            </div>
          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className='details-col'>

          <div>
            <div className='details-row title'>
              <Icon className='red-icons' icon='mdi:map-marker' />
              EPICENTER
            </div>
            <div className='details-row'>
              {detailsData.epicenter}
            </div>
          </div>

        </div>
        <div className="vertical-divider"></div>
        <div className='details-col'>

          <div>
            <div className='details-row title'>
              <Icon className='red-icons' icon='mdi:crosshairs' />
              COORDINATES
            </div>
            <div className='details-row'>
              {detailsData.coordinatesCenter}
            </div>
          </div>

        </div>
        <div className="vertical-divider"></div>
        <div className='details-col'>

          <div>
            <div className='details-row title'>
              <Icon className='red-icons' icon='mdi:calendar-range' />
              DATE & TIME
            </div>
            <div className='details-row'>
              {detailsData.dateTime}
            </div>
          </div>

        </div>

      </div>
    </Card>
  )
}

export default EarthquakeDetails
