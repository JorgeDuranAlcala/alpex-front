import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Dto imports
// import { TotalInvestmentDto } from '@/services/dynamic-data/dtos/dashboard.dto'

//services imports
import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'


const HurricaneDetails = () => {
  // ** Props
  // const { getTotalInvestment } = useGetTotalInvestment()
  const [detailsData, setDetailsData] = useState({
    hurricaneName: '',
    advisoryDate: '',
    sormId: '',
    stormNumber: '',
    cateogry: ''
  })

  const setDataInformation = async () => {
    const data = await DashboardMockService.getHurricaneDetails()


    if (!data) return

    const newData = {
      hurricaneName: data.hurricaneName || '',
      advisoryDate: data.advisoryDate || '',
      sormId: data.sormId || '',
      stormNumber: data.stormNumber || '',
      cateogry: data.cateogry || ''
    }
    setDetailsData(newData)
  }

  useEffect(() => {
    setDataInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className='hurricane-details'>
      <div className='map-details-wrapper'>
              <div className='details-col' style={{ gap: '10px' }}>

                <div>
                  <div className='details-row title'>
                  <Icon className='blue-icons' icon='mdi:waves' />
                    HURRICANE
                  </div>
                  <div className='details-row'>
                    {detailsData.hurricaneName}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>

                <div>
                  <div className='details-row title'>
                  <Icon className='blue-icons' icon='mdi:calendar-range' />
                    ADVISORY DATE
                  </div>
                  <div className='details-row'>
                    {detailsData.advisoryDate}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>

                <div>
                  <div className='details-row title'>
                  <Icon className='blue-icons' icon='mdi:information-outline' />
                    STORM ID
                  </div>
                  <div className='details-row'>
                    {detailsData.sormId}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>

                <div>
                  <div className='details-row title'>
                  <Icon className='blue-icons' icon='mdi:format-list-numbered' />
                    STORM NUMBER
                  </div>
                  <div className='details-row'>
                    {detailsData.stormNumber}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>

                <div>
                  <div className='details-row title'>
                  <Icon className='blue-icons' icon='mdi:alert-outline' />
                    CATEGORY
                  </div>
                  <div className='details-row'>
                    {detailsData.cateogry}
                  </div>
                </div>

              </div>

            </div>
    </Card>
  )
}

export default HurricaneDetails
