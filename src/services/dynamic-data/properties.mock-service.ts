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

  async getBasicInfo() {
    try {
      const data = {
        name: 'XEEP RADIO EDUCACION',
        insitution: 'RADIO EDUCACION',
        use: 'OFICINA',
        sector: 'COMUNICACIÓN',
        acronym: 'REDUC',
        administration: 'FEDERAL'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getConstructionDetails() {
    try {
      const data = {
        stories: '2',
        structure: 'MUROS DE MAMPOSTERIA',
        slab: 'LOSA DE CONCRETO',
        foundation: 'SUPERFICIAL',
        constructionSurface: '1.404,65',
        surfaceArea: '2.901,46',
        date: '-'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getLocationDetails() {
    try {
      const data = {
        address: 'ANGEL URRAZA 622',
        neighborhood: 'DEL VALLE',
        postalCode: '03100',
        state: 'CIUDAD DE MÉXICO',
        stateCode: '9',
        province: 'BENITO JUÁREZ',
        provinceCode: '14',
        latitude: '19,3837665',
        longitude: '-99,16911088'
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

}

export default new PropertiesServices()
