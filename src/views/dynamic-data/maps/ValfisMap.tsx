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

type zoneMapProps = {
  coordinates: { [state: string]: Array<Array<{ lng: number, lat: number }>> },
  zoneStatesData: ZoneStatesData,
  handleStateClick: (coordinates: Array<Array<{ lng: number, lat: number }>>, zone: string) => void
}

type stateDetailMapProps = {
  stateCoordinates: Array<Array<{ lng: number, lat: number }>>,
  zone: string
}

const ZoneMap: React.FC<zoneMapProps> = ({ coordinates, zoneStatesData, handleStateClick }) => {
  const map1Ref = useRef<HTMLDivElement>(null);
  const map1 = useRef<google.maps.Map | null>(null);
  const polygon = useRef<google.maps.Polygon | null>(null);
  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBn3_Ng2UuezOHu5Pqz6c7l1CC9z3tdjFQ',
        version: 'weekly'
      })

      const google = await loader.load()

      if (map1Ref.current) {
        map1.current = new google.maps.Map(map1Ref.current, {
          center: { lat: 23.6345, lng: -102.5528 },
          zoom: 5
        })
        console.log("states")
        for (const state in coordinates) {

          const zone = zoneStatesData[state];
          let color = "#72E128"
          if (zone == 'b') {
            color = '#FFB446'
          } else if (zone == 'c') {
            color = '#FF4D49'
          }

          // const infoWindow = new google.maps.InfoWindow()
          const stateCoordinates = coordinates[state];
          polygon.current = new google.maps.Polygon({
            paths: stateCoordinates,
            strokeColor: color,
            strokeOpacity: 0.35,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
          });

          polygon.current.setMap(map1.current);
          polygon.current.addListener('click', () => handleStateClick(stateCoordinates, zone))
        }

        // const bcCoordinates = mapCoorService.getAguasCalientes()

        // map1.current.addListener('click', )
      }

      // geocoder.current = new google.maps.Geocoder()
    }

    loadMap()
  }, [coordinates, zoneStatesData])

  return <div ref={map1Ref} style={{ width: '100%', minHeight: '70vh' }} />
};


const StateDetailMap: React.FC<stateDetailMapProps> = ({ stateCoordinates, zone }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const polygon = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    console.log("inside map")
    console.log(zone)
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

        let color = "#72E128"
        if (zone == 'b') {
          color = '#FFB446'
        } else if (zone == 'c') {
          color = '#FF4D49'
        }

        polygon.current = new google.maps.Polygon({
          paths: stateCoordinates,
          strokeColor: color,
          strokeOpacity: 0.35,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
        });

        polygon.current.setMap(map.current);

      }

    }

    loadMap()
  }, [stateCoordinates, zone])

  return <div ref={mapRef} className='state-map' style={{ width: '100%', minHeight: '70vh' }} />
};



const ValfisMap = () => {

  // const mapRef = useRef<HTMLDivElement>(null);
  // const map = useRef<google.maps.Map | null>(null);
  // const polygon = useRef<google.maps.Polygon | null>(null);

  // const mapEnabledRef = useRef<boolean>(false)
  const mapCoorService = new MapCoorService()
  const allCoordinates = mapCoorService.getAllCoordinates();
  const [zoneData, setZoneData] = useState({
    totalValue: '',
    zoneA: '',
    zoneB: '',
    zoneC: ''
  })

  // const [zoneStatesData, setZoneStatesData] = useState([{ name: '', zone: '' }])
const [zoneStatesData, setZoneStatesData] = useState<ZoneStatesData>({ name: '', zone: '' })

  const [detailsData, setDetailsData] = useState({
    totalValue: '',
    state: '',
    numberAssets: '',
    crestaZone: ''
  })

  const [showStateDetails, setShowStateDetails] = useState(false)
  const [stateCoordinates, setStateCoordinates] = useState<Array<Array<{ lng: number, lat: number }>>>([
    [
      { lng: 0, lat: 0 }
    ]
  ])
  const [currentZone, setCurrentZone] = useState('')

  const handleStateClick = (coordinates: Array<Array<{ lng: number, lat: number }>>, zone: string) => {
    console.log(coordinates)
    setStateCoordinates(coordinates)
    console.log(zone)
    setCurrentZone(zone)
    setShowStateDetails(true)
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
    const zoneStates: ZoneStatesData = {};
    const data = await MapsServices.getValfisZoneStates()
    if (!data) return
    data.forEach(item => {
      zoneStates[item.name] = item.zone;
    });
    setZoneStatesData(zoneStates)
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {

  }, [stateCoordinates, currentZone])

  return (

    <Grid container spacing={6} className='match-height'>
      {!showStateDetails &&
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

      {showStateDetails && <Grid item xs={12}>
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
        {!showStateDetails &&
          <Card>
            <MapContainer>

              <div style={{ borderRadius: '8px', height: '70vh' }}>
                <ZoneMap
                  coordinates={allCoordinates}
                  zoneStatesData={zoneStatesData}
                  handleStateClick={handleStateClick}
                />
              </div>
            </MapContainer>
          </Card>
        }
        {showStateDetails &&
          <Card>
            <MapContainer style={{position: 'relative'}}>
              <div style={{ borderRadius: '8px', height: '70vh' }}>
                <StateDetailMap
                  stateCoordinates={stateCoordinates}
                  zone={currentZone}
                />
              </div>
              <div
                className='close-state-map'
                onClick={() => setShowStateDetails(false)}
              >
                x
              </div>
            </MapContainer>
          </Card>
        }
      </Grid>
    </Grid>
  )
}

export default ValfisMap
