// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// ** Custom Components Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const EarthquakesMap = () => {

  const mapSrc = "/images/pages/properties-map.png"
  const detailsData = {
    magnitud: '8.2',
    depht: '10 km',
    epicenter: '140 km al Suroeste de Pijijiapan Chis. ',
    coordinates: 'Lat 14.761  Long -94.103',
    dateTime: '2017/09/07 23:49'
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
                <div className='magnitude-icon'>
                  <Icon className='red-icons' icon='mdi:chart-line-variant' />
                </div>
                <div>
                  <div className='details-row title'>
                    MAGNITUDE
                  </div>
                  <div className='details-row'>
                    {detailsData.magnitud}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='red-icons' icon='mdi:arrow-down-thin-circle-outline' />
                <div>
                  <div className='details-row title'>
                    DEPTH
                  </div>
                  <div className='details-row'>
                    {detailsData.depht}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='red-icons' icon='mdi:map-marker' />
                <div>
                  <div className='details-row title'>
                    EPICENTER
                  </div>
                  <div className='details-row'>
                    {detailsData.epicenter}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='red-icons' icon='mdi:crosshairs' />
                <div>
                  <div className='details-row title'>
                    COORDINATES
                  </div>
                  <div className='details-row'>
                    {detailsData.coordinates}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <Icon className='red-icons' icon='mdi:calendar-range' />
                <div>
                  <div className='details-row title'>
                    DATE & TIME
                  </div>
                  <div className='details-row'>
                    {detailsData.dateTime}
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

export default EarthquakesMap
