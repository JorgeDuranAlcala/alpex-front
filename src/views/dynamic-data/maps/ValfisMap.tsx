import { useEffect, useRef, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Loader } from '@googlemaps/js-api-loader';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

//** services imports
import MapsServices from '@/services/dynamic-data/maps-service';

const ValfisMap = () => {

  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)


  const [zoneData, setZoneData] = useState({
    totalValue: '',
    zoneA: '',
    zoneB: '',
    zoneC: ''
  })

  const [detailsData, setDetailsData] = useState({
    totalValue: '',
    state: '',
    numberAssets: '',
    crestaZone: ''
  })

  const [showDetails, setShowDetails] = useState(false)
  const [showZoneDescription, setShowZoneDescription] = useState(false)


  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

  const setZone = async () => {
    const data = await MapsServices.getZoneDetails()


    if (!data) return

    const newData = {
      totalValue: data.totalValue || '',
      zoneA: data.zoneA || '',
      zoneB: data.zoneB || '',
      zoneC: data.zoneC || '',
    }
    setZoneData(newData)
  }

  const setDetails = async () => {
    const data = await MapsServices.getValfisDetails()



    if (!data) return

    const newData = {
      totalValue: data.totalValue || '',
      state: data.state || '',
      numberAssets: data.numberAssets || '',
      crestaZone: data.crestaZone || ''
    }
    setDetailsData(newData)
  }

  useEffect(() => {
    setDetails()
    setZone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setShowDetails(true)
    setShowZoneDescription(true)
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
      {showZoneDescription &&
        <Grid item xs={12}>
          <Card>
            <div className='map-details-wrapper'>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                  <Icon icon='mdi:currency-usd' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    TOTAL REPL. VALUE SUM
                  </div>
                  <div className='details-row'>
                    ${zoneData.totalValue}MXN
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'success'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE A
                  </div>
                  <div className='details-row' style={{ color: '#2535A8' }}>
                    {zoneData.zoneA}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'warning'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE B
                  </div>
                  <div className='details-row'>
                    {zoneData.zoneB}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'error'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE C
                  </div>
                  <div className='details-row'>
                    {zoneData.zoneC}
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </Grid>
      }

      {showDetails && <Grid item xs={12}>
        <Card>
          <div className='map-details-wrapper'>
            <div className='details-col' style={{ gap: '10px' }}>
              <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <div>
                <div className='details-row title'>
                  TOTAL STATE REPL. VALUE
                </div>
                <div className='details-row'>
                  ${detailsData.totalValue}MXN
                </div>
              </div>
            </div>
            <div className="vertical-divider"></div>
            <div className='details-col'>
              <div>
                <div className='details-row title'>
                  STATE
                </div>
                <div className='details-row'>
                  {detailsData.state}
                </div>
              </div>
            </div>
            <div className="vertical-divider"></div>
            <div className='details-col'>
              <div>
                <div className='details-row title'>
                  NUMBER OF ASSETS
                </div>
                <div className='details-row'>
                  {detailsData.numberAssets}
                </div>
              </div>

            </div>
            <div className="vertical-divider"></div>
            <div className='details-col'>
              <div>
                <div className='details-row title'>
                  CRESTA ZONE
                </div>
                <div className='details-row'>
                  {detailsData.crestaZone}
                </div>
              </div>

            </div>
          </div>
        </Card>
      </Grid>}


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

export default ValfisMap
