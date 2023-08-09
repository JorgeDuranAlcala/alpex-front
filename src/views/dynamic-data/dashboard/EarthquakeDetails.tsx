import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Dto imports
// import { TotalInvestmentDto } from '@/services/dynamic-data/dtos/dashboard.dto'

//services imports
import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

// Custom Hooks
// import { useGetTotalInvestment } from '@/hooks/dynamic-data/dashboard'


const EarthquakeDetails = () => {
  // ** Props
  // const { getTotalInvestment } = useGetTotalInvestment()


  const [detailsData, setDetailsData] = useState({
    magnitud: ' ',
    depht: ' ',
    epicenter: ' ',
    coordinates: ' ',
    dateTime: ' '
  })

  const setDataInformation = async () => {
    const data = await DashboardMockService.getEarthquakesDetails()


    if (!data) return

    const newData = {
      magnitud: data.magnitud || ' ',
      depht: data.depht || ' ',
      epicenter: data.epicenter || ' ',
      coordinates: data.coordinates || ' ',
      dateTime: data.dateTime || ' '
    }
    setDetailsData(newData)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              {detailsData.magnitud}
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
              {detailsData.depht}
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
              {detailsData.coordinates}
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
