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

}

export default new MapsServices()

