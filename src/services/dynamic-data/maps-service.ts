import { DATA_MAPS_ROUTES } from 'src/configs/api';
import { PropertyPaginationDto } from 'src/services/dynamic-data/dtos/propertyListing.dto';
import { AppAlpexApiGateWay } from '../app.alpex.api-getway';
import { queryBuilder } from '../helper/queryBuilder';

//** Dto imports */
import { IProperty } from '@/services/dynamic-data/dtos/propertyListing.dto';

/**
 *  service responsible of the dynamic data methods
 */
class MapsServices {

  async getAllProperties(): Promise<IProperty[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get(DATA_MAPS_ROUTES.GET_ALL_PROPERTIES)

      return data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get priority properties list
   * @returns
   */
  async getPriorityProperties(propertyData: PropertyPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(propertyData.filters, `${DATA_MAPS_ROUTES.GET_ALL_PROPERTIES}`)
      const { data } = await AppAlpexApiGateWay.get(`${url}page=${propertyData.info.page}&itemsPerPage=${propertyData.info.take}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getHurricaneDetails() {
    try {
      const data = {
        hurricaneName: 'ADRIAN',
        advisoryDate: '300 PM MDT Tue Jun 27 2023',
        sormId: 'ep01',
        stormNumber: '1',
        cateogry: '2 - Wind 154-177 km/h'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getEarthquakesDetails() {
    try {
      const data = {
        magnitud: '8.2',
        depht: '10 km',
        epicenter: '140 km al Suroeste de Pijijiapan Chis. ',
        coordinates: 'Lat 14.761  Long -94.103',
        dateTime: '2017/09/07 23:49'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getZoneDetails() {
    try {
      const data = {
        totalValue: '19833668',
        zoneA: '$5M - $13M',
        zoneB: '$13M - $50M',
        zoneC: '$50M - '
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getValfisDetails() {
    try {
      const data = {
        totalValue: '19833668',
        state: 'Yucatán',
        numberAssets: '236,000',
        crestaZone: '1'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }
}

export default new MapsServices()

