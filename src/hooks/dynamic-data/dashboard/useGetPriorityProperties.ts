import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'
import { useEffect, useState } from 'react'
import { IProperty, PropertyInfoDto, PropertyPaginationDto } from 'src/services/dynamic-data/dtos/propertyListing.dto'


const initialState: PropertyPaginationDto = {
  filters: [],
  info: {
    count: 0,
    page: 1,
    take: 10, //temp
    pages: 0,
    next: '',
    prev: ''
  }
}

const initialStateInfo: PropertyInfoDto = {
  count: 0,
  page: 1,
  take: 5,
  pages: 0,
  next: '',
  prev: ''
}

export const useGetPriorityProperties = () => {

  const [propertyPagination, setPropertyPagination] = useState<PropertyPaginationDto>(initialState)
  const [properties, setProperties] = useState<IProperty[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [propertyInfoPage, setPropertyInfoPage] = useState<PropertyInfoDto>(initialStateInfo)

  const getPriorityProperties = async (propertyPagination: PropertyPaginationDto) => {
    const data = await DashboardMockService.getPriorityProperties(propertyPagination)
    setProperties(data)

    // setPropertyInfoPage(info)
  }

  useEffect(() => {
    propertyPagination && getPriorityProperties(propertyPagination)
  }, [propertyPagination])

  return {
    propertyPagination,
    setPropertyPagination,
    properties,
    getPriorityProperties,
    propertyInfoPage
  }
}
