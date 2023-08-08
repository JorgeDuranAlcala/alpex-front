// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';


// ** Icon Imports
import Icon from 'src/@core/components/icon';

const HurricaneMap = () => {

  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)
  const detailsData = {
    hurricaneName: 'ADRIAN',
    advisoryDate: '300 PM MDT Tue Jun 27 2023',
    sormId: 'ep01',
    stormNumber: '1',
    cateogry: '2 - Wind 154-177 km/h'
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

export default HurricaneMap
