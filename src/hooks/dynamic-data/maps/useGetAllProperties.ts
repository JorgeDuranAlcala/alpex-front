import MapService from '@/services/dynamic-data/maps-service'
import { SetStateAction, useEffect, useState } from 'react'
import { IProperty } from 'src/services/dynamic-data/dtos/propertyListing.dto'


export const useGetAllProperties = () => {


  const [properties, setProperties] = useState<IProperty[]>([])

  useEffect(() => {
    MapService.getAllProperties()
      .then((properties: SetStateAction<IProperty[]>) => {
        setProperties(properties)
      })
      .catch((error: string | undefined) => {
        throw new Error(error)
      })
  }, [])

  return {
    properties
  }
}
