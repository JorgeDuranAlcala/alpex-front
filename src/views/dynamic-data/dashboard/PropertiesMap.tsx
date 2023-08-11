import { useEffect, useRef, useState } from 'react';

// ** MUI Imports

import { Loader } from '@googlemaps/js-api-loader';
import Card from '@mui/material/Card';

// ** Next Import
import { useRouter } from 'next/router';


//** Custom imports */
import {
  MapContainer
} from '@/styled-components/dynamic-data/maps.styled';

//** Dto imports */
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto';


//** Hooks imports */
import { useGetPriorityProperties } from '@/hooks/dynamic-data/dashboard';


const PropertiesMap = () => {

  const { propertyPagination, setPropertyPagination, properties } = useGetPriorityProperties()
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [markersAdded, setMarkersAdded] = useState<boolean>(false);

  const [propertiesList, setPropertiesList] = useState<IProperty[]>([])

  const [googleApi, setGoogleApi] = useState<typeof google | null>(null);

    // ** Hooks
    const router = useRouter()

  // const geocoder = useRef<google.maps.Geocoder | null>(null)

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

      // const google = await loader.load()

      const googleInstance = await loader.load();
      setGoogleApi(googleInstance);

      if (mapRef.current) {
        map.current = new googleInstance.maps.Map(mapRef.current, {
          center: { lat: 23.6345, lng: -102.5528 },
          zoom: 5
        })

        map.current.addListener('click', handleMapClick)
      }

    }

    loadMap()
  }, [])

  useEffect(() => {
    setPropertyPagination({ ...propertyPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setPropertiesList(properties || [])
  }, [properties])

 useEffect(() => {
  if (propertiesList.length > 0 && !markersAdded && googleApi !== null) {

    propertiesList.map((property) => {
      const latitude = parseFloat(property.latitude.replace(",", "."));
      const longitude = parseFloat(property.longitude.replace(",", "."));

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const marker = new googleApi.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map.current,
          title: property.institution,
        });

        marker.addListener("click", () => {
          console.log(property.keyDepe);
          router.push(`/dynamic-data/property-listing/property-details`)
        });

        return marker
      }

      return null
    });

    // Markers added true
    console.log("se va a setear el add markers")
    setMarkersAdded(true);
  }
  }, [propertiesList, markersAdded]);

  return (

    <Card>
     <MapContainer>

        <div style={{ borderRadius: '8px', height: '500px'}}>
          <div ref={mapRef} style={{ width: '100%', minHeight: '500px' }} />
        </div>
      </MapContainer>

   </Card>

  )
}

export default PropertiesMap
