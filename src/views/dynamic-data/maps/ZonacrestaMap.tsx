import { useEffect, useRef } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import { Loader } from '@googlemaps/js-api-loader';

//** Styled components imports */
import { MapContainer } from '@/styled-components/dynamic-data/maps.styled';



const PropertiesMap = () => {

  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)


  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapEnabledRef.current) {
      console.log(event.latLng)
    }
  }

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
        <Card>

        </Card>
      </Grid>
      <Grid className='full-map-grid' item xs={12} sx={{paddingTop:'0'} }>
        <Card>
          <MapContainer>
            <div style={{ borderRadius: '8px', height: '85vh' }}>
              <div ref={mapRef} style={{ width: '100%', minHeight: '90vh' }} />
            </div>
          </MapContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PropertiesMap
