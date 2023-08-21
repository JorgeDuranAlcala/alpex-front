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

import { MapCoorService } from '@/services/dynamic-data/map-coordinates.service';

interface ZoneStatesData {
  [stateName: string]: string;
}

const ValfisMap = () => {

  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const polygon = useRef<google.maps.Polygon | null>(null);
  const mapEnabledRef = useRef<boolean>(false)
  const mapCoorService = new MapCoorService()
  const allCoordinates = mapCoorService.getAllCoordinates();
  const [zoneData, setZoneData] = useState({
    totalValue: '',
    zoneA: '',
    zoneB: '',
    zoneC: ''
  })

  // const [zoneStatesData, setZoneStatesData] = useState([{ name: '', zone: '' }])

  const zoneStatesData: ZoneStatesData = {};


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

  const setZoneStates = async () => {
    const data = await MapsServices.getValfisZoneStates()
    if (!data) return
    data.forEach(item => {
      zoneStatesData[item.name] = item.zone;
    });

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
    setZoneStates()
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
        console.log("states")
        for (const state in allCoordinates) {

          const zone = zoneStatesData[state];
          let color= "#72E128"
          if(zone == 'b'){
            color='#FFB446'
          }else if(zone == 'c'){
            color= '#FF4D49'
          }
          const infoWindow = new google.maps.InfoWindow()
          const stateCoordinates = allCoordinates[state];
          polygon.current = new google.maps.Polygon({
            paths: stateCoordinates,
            strokeColor:color,
            strokeOpacity: 0.35,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
          });

          polygon.current.setMap(map.current);
          polygon.current.addListener('click', (event: { latLng: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined; }) => {
            console.log('Datos: ', polygon.current?.getPath())

            const contentString =
              '<b>Data info</b><br>' +
              'Clicked'

            infoWindow.setContent(contentString)
            infoWindow.setPosition(event.latLng)
            infoWindow.open(map.current)
          })
        }

        // const bcCoordinates = mapCoorService.getAguasCalientes()

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
