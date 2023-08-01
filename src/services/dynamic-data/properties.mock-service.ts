import { AppAlpexApiGateWay } from '../app.alpex.api-getway';

//Routes

import { queryBuilder } from '@/services/helper/queryBuilder';
import { IPropertiesState } from '@/types/apps/propertiesTypes';
import { getPropertiesMockFunc } from './properties.mock-func';

/**
 *  service responsible of the  account methods
 */
class PropertiesServices {
  /**
   * brings the account with the your id
   * @param id
   * @returns
   */
  async getAllProperties() {
    try {
      const { data } = await getPropertiesMockFunc();

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * get the all accounts actives
   * @returns
   */
  async getProperties(propertiesData: IPropertiesState, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(propertiesData.filters, 'property/all')
      const { data } = await AppAlpexApiGateWay.get(
        `${url}&take=${propertiesData.info.take}&page=${propertiesData.info.page}`
      )
      console.log('theData')
      console.log(data)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

}

export default new PropertiesServices()
