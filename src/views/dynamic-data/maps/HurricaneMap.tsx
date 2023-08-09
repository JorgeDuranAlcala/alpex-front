// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

//** services imports
import MapsServices from '@/services/dynamic-data/maps-service';


const HurricaneMap = () => {

  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)
  const [detailsData, setDetailsData] = useState({
    hurricaneName: '',
    advisoryDate: '',
    sormId: '',
    stormNumber: '',
    cateogry: ''
  })
  const [showDetails, setShowDetails] = useState(false)

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

  const setDataInformation = async () => {
    const data = await MapsServices.getHurricaneDetails()


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
