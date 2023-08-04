// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Custom Components Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const HurricaneMap = () => {

  const mapSrc = "/images/pages/properties-map.png"
  const detailsData = {
    hurricaneName: 'ADRIAN',
    advisoryDate: '300 PM MDT Tue Jun 27 2023',
    sormId: 'ep01',
    stormNumber: '1',
    cateogry: '2 - Wind 154-177 km/h'
  }
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setShowDetails(true)
  }, [])

  return (

    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        {showDetails &&
          <Card>
            <div className='map-details-wrapper'>
              <div className='details-col' style={{ gap: '10px' }}>
                  <Icon className='blue-icons' icon='mdi:waves' />
                <div>
                  <div className='details-row title'>
                  HURRICANE
                  </div>
                  <div className='details-row'>
                    {detailsData.hurricaneName}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='blue-icons' icon='mdi:calendar-range' />
                <div>
                  <div className='details-row title'>
                  ADVISORY DATE
                  </div>
                  <div className='details-row'>
                    {detailsData.advisoryDate}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='blue-icons' icon='mdi:information-outline' />
                <div>
                  <div className='details-row title'>
                  STORM ID
                  </div>
                  <div className='details-row'>
                    {detailsData.sormId}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='blue-icons' icon='mdi:format-list-numbered' />
                <div>
                  <div className='details-row title'>
                  STORM NUMBER
                  </div>
                  <div className='details-row'>
                    {detailsData.stormNumber}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='blue-icons' icon='mdi:alert-outline' />
                <div>
                  <div className='details-row title'>
                  CATEGORY
                  </div>
                  <div className='details-row'>
                    {detailsData.cateogry}
                  </div>
                </div>

              </div>

            </div>
          </Card>
        }

      </Grid>
      <Grid item xs={12}>
        <Card>
          <img
            src={mapSrc}
            alt="properties map"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

        </Card>
      </Grid>
    </Grid>
  )
}

export default HurricaneMap
