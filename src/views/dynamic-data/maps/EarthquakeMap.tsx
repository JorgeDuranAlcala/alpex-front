// ** MUI Imports
import { Loader } from '@googlemaps/js-api-loader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';


// ** Custom Components Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const EarthquakesMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)

  const detailsData = {
    magnitud: '8.2',
    depht: '10 km',
    epicenter: '140 km al Suroeste de Pijijiapan Chis. ',
    coordinates: 'Lat 14.761  Long -94.103',
    dateTime: '2017/09/07 23:49'
  }
  const [showDetails, setShowDetails] = useState(false)


  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

  useEffect(() => {
    setShowDetails(true)
  }, [])

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBn3_Ng2UuezOHu5Pqz6c7l1CC9z3tdjFQ',
        version: 'weekly'
      })

      const google = await loader.load()

      if (mapRef.current) {
        map.current = new google.maps.Map(mapRef.current, {
          center: { lat: 23.6345, lng: -102.5528 },
          zoom: 5
        })

        map.current.addListener('click', handleMapClick)
      }

      // geocoder.current = new google.maps.Geocoder()
    }

    loadMap()
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
          <MapContainer>

            <div style={{ borderRadius: '8px', height: '70vh' }}>
              <div ref={mapRef} style={{ width: '100%', minHeight: '70vh' }} />
            </div>
          </MapContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EarthquakesMap
