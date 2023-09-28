// ** MUI Imports
import { Loader } from '@googlemaps/js-api-loader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';

//** services imports
import MapsServices from '@/services/dynamic-data/maps-service';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const EarthquakesMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)

  const [detailsData, setDetailsData] = useState({
    magnitud: ' ',
    depht: ' ',
    epicenter: ' ',
    coordinates: ' ',
    dateTime: ' '
  })
  const [showDetails, setShowDetails] = useState(false)


  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

  const setDataInformation = async () => {
    const data = await MapsServices.getEarthquakesDetails()


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
