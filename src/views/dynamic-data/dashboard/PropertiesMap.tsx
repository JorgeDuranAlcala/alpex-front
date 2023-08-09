import { useEffect, useRef, useState } from 'react';

// ** MUI Imports

import { Loader } from '@googlemaps/js-api-loader';
import Card from '@mui/material/Card';

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
    setPropertyPagination({ ...propertyPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setPropertiesList(properties || [])
  }, [properties])

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
