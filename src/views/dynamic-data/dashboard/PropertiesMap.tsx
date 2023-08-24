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

type EarthquakePropertyProps = {
  earthquakeProperties: IProperty[],
  earthquakeDetected: boolean,
  earthquakeCenter: string,
  earthquakeDistance: number,
  urlKmz: string
}

const PropertiesMap: React.FC<EarthquakePropertyProps> = ({
  earthquakeProperties,
  earthquakeDetected,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  earthquakeCenter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  earthquakeDistance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  urlKmz
}) => {

  const { propertyPagination, setPropertyPagination, properties } = useGetPriorityProperties()
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useRef<google.maps.Map | null>(null)
  const mapEnabledRef = useRef<boolean>(false)

   const circle = useRef<google.maps.Circle | null>(null);

  // const kmlImg = useRef<google.maps.KmlLayer | null>(null);

  const [propertiesList, setPropertiesList] = useState<IProperty[]>([])

  // const [googleApi, setGoogleApi] = useState<typeof google | null>(null);

  // ** Hooks
  const router = useRouter()


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

      const googleInstance = await loader.load();

      if (mapRef.current) {
        map.current = new googleInstance.maps.Map(mapRef.current, {
          center: { lat: 23.6345, lng: -102.5528 },
          zoom: 5
        })

        map.current.addListener('click', handleMapClick)


        if (propertiesList.length > 0) {

          propertiesList.map((property) => {
            const latitude = parseFloat(property.latitude.replace(",", "."));
            const longitude = parseFloat(property.longitude.replace(",", "."));

            if (!isNaN(latitude) && !isNaN(longitude)) {
              const marker = new googleInstance.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map.current,
                title: property.institution,
              });

              marker.addListener("click", () => {
                console.log(property.keyDepe);
                router.push(`/dynamic-data/property-listing/property-details/?&idProperty=${property.keyDepe}`)
              });

              return marker
            }

            return null
          });


        }

        if (earthquakeDetected) {
          const [centerLatStr, centerLngStr] = earthquakeCenter.split(",");
          const centerLat = parseFloat(centerLatStr);
          const centerLng = parseFloat(centerLngStr);

          const circleCoords = {
            center: { lat: centerLat, lng: centerLng },
            distance: earthquakeDistance * 1000
          };

          circle.current = new googleInstance.maps.Circle({
            strokeColor: '#f00',
            strokeOpacity: 0.18,
            strokeWeight: 1,
            fillColor: '#f00',
            fillOpacity: 0.15,
            map: map.current,
            center: circleCoords.center,
            radius: circleCoords.distance,
          });
        }

        // if (earthquakeDetected) {
        //   kmlImg.current = new google.maps.KmlLayer({
        //     url: urlKmz,
        //     map: map.current,
        //   });
        // }


      }
    }

    loadMap()
  }, [propertiesList, earthquakeDetected])

  useEffect(() => {
    setPropertyPagination({ ...propertyPagination })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {

    if (earthquakeDetected) {
      setPropertiesList(earthquakeProperties || [])
    } else {
      setPropertiesList(properties || [])
    }
  }, [properties, earthquakeProperties, earthquakeDetected])

  //  useEffect(() => {
  //   console.log('properties list')
  //   console.log(propertiesList)
  //   if (propertiesList.length > 0 && !markersAdded && googleApi !== null) {

  //     propertiesList.map((property) => {
  //       const latitude = parseFloat(property.latitude.replace(",", "."));
  //       const longitude = parseFloat(property.longitude.replace(",", "."));

  //       if (!isNaN(latitude) && !isNaN(longitude)) {
  //         const marker = new googleApi.maps.Marker({
  //           position: { lat: latitude, lng: longitude },
  //           map: map.current,
  //           title: property.institution,
  //         });

  //         marker.addListener("click", () => {
  //           console.log(property.keyDepe);
  //           router.push(`/dynamic-data/property-listing/property-details/?&idProperty=${property.keyDepe}`)
  //         });

  //         return marker
  //       }

  //       return null
  //     });

  //     // Markers added true
  //     console.log("se va a setear el add markers")
  //     setMarkersAdded(true);
  //   }
  //   }, [propertiesList, markersAdded, earthquakeDetected]);

  return (

    <Card>
      <MapContainer>

        <div style={{ borderRadius: '8px', height: '500px' }}>
          <div ref={mapRef} style={{ width: '100%', minHeight: '500px' }} />
        </div>
      </MapContainer>

    </Card>

  )
}

export default PropertiesMap
