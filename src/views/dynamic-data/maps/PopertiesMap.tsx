import { useEffect, useRef, useState } from 'react';

// ** MUI Imports
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Loader } from '@googlemaps/js-api-loader';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

//** Dto imports */
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto';


//** Hooks imports */
import { useGetAllProperties } from '@/hooks/dynamic-data/maps';


const PropertiesMap = () => {

  const { properties } = useGetAllProperties()
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)
  const [markersAdded, setMarkersAdded] = useState<boolean>(false)
  const [propertiesList, setPropertiesList] = useState<IProperty[]>([])
  const detailsData = {
    replacementValue: '19833668',
    assetId: '#06003_2',
    state: 'Ciudad de México',
    province: 'Benito Juárez',
    crestazone: '1'
  }
  const [showDetails, setShowDetails] = useState(false)


  const seeMore = () => {
    console.log("see more")

    // router.push(`/dynamic-data/property-listing/`)
  }
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

  useEffect(() => {
    console.log("maap prop")
    console.log(properties)
    setPropertiesList(properties || [])
  }, [properties])

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

  useEffect(() => {
    console.log(propertiesList)

    // Add markers  if propertiesList has elements and if no marker has been added
      if (propertiesList.length > 0 && !markersAdded) {
        propertiesList.forEach((property) => {
          const latitude = parseFloat(property.latitude.replace(",", "."));
          const longitude = parseFloat(property.longitude.replace(",", "."));

          if (!isNaN(latitude) && !isNaN(longitude)) {
            new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map.current,
              title: property.institution,
            });
          }
        });

        // Markers added true
        setMarkersAdded(true);
      }
    }, [propertiesList, markersAdded]);

  return (

    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        {showDetails &&
          <Card>
            <div className='map-details-wrapper'>
              <div className='details-col' style={{ gap: '10px' }}>
                <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                  <Icon icon='mdi:currency-usd' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    REPLACEMENT VALUE
                  </div>
                  <div className='details-row'>
                    ${detailsData.replacementValue}MXN
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <div>
                  <div className='details-row title'>
                    ASSET ID
                  </div>
                  <div className='details-row' style={{ color: '#2535A8' }}>
                    {detailsData.assetId}
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
                    PROVINCE
                  </div>
                  <div className='details-row'>
                    {detailsData.province}
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
                    {detailsData.crestazone}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col' style={{ justifyContent: 'center' }}>
                <Button className='add-btn' onClick={seeMore}>
                  See more
                </Button>
              </div>

            </div>
          </Card>
        }

      </Grid>
      <Grid className={showDetails  ? '' : 'full-map-grid'}item xs={12}>
        <Card>
          <MapContainer>
            <div style={{ borderRadius: '8px', height: showDetails  ? '70vh' : '85vh' }}>
              <div ref={mapRef} style={{ width: '100%', minHeight: showDetails  ? '70vh' : '85vh' }} />
            </div>
          </MapContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PropertiesMap
