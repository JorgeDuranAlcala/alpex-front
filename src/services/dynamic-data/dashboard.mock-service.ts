import { DATA_DASHBOARD_ROUTES } from 'src/configs/api'
import { PropertyPaginationDto } from 'src/services/dynamic-data/dtos/propertyListing.dto'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { queryBuilder } from '../helper/queryBuilder'
import { InvestmentPerStateDto } from "./dtos/dashboard.dto"

/**
 *  service responsible of the dynamic data methods
 */
class DashboardMockServices {
  /**
   * Get the total investment
   * @returns
   */
  async getTotalInvestment(): Promise<any> {
    try {
      const data = {
        trend: 'positive',
        total: 48.2,
        differencePercentage: 22.5,
      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * Get the Investments proportions
   * @returns
   */
  async getProportionInvestment() {
    try {
     const data = {
      invested: 84,
      avaliable: 22
     }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * Get Month Sales data
   */
  async getSalesThisMonth() {
    try {
      const data ={
        total: 28.450,
        data:[12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25],
        firstDate: '00/00/00',
        lastDate: '00/00/00'

      }

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * Get investment per state data
   */
   async getInvestmentPerState(): Promise<InvestmentPerStateDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get(DATA_DASHBOARD_ROUTES.GET_CAPACITY_PER_STATES)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * Get priority properties list
   * @returns
   */
  async getPriorityProperties(propertyData: PropertyPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(propertyData.filters, `${DATA_DASHBOARD_ROUTES.GET_PRIORITY_PROPERTIES}`)
      const { data } = await AppAlpexApiGateWay.get(`${url}page=${propertyData.info.page}&itemsPerPage=${propertyData.info.take}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  /**
   * Get the Investments proportions
   * @returns
   */
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

  async getEarthquakesData() {
    try {
      const { data } = await AppAlpexApiGateWay.get(DATA_DASHBOARD_ROUTES.GET_EARTHQUAKES_DATA)

      return data

    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

  async getEarthquakesMockData() {
    try {
      const data = {
        isDetected: true,
        buildings: [
            {
                id: 14,
                keyDepe: "01018_7_13",
                valfisValue: "9178000.00",
                latitude: "14,906961",
                longitude: "-92,26361",
                state: "Chiapas",
                province: "Tapachula",
                institution: "EDIFICACION",
                crestZone: ""
            },
            {
                id: 31,
                keyDepe: "01044_32",
                valfisValue: "10604120.00",
                latitude: "16,72726758",
                longitude: "-92,63937332",
                state: "Chiapas",
                province: "San Cristóbal de las Casas",
                institution: "EDIFICACION",
                crestZone: ""
            },
            {
                id: 34,
                keyDepe: "null",
                valfisValue: "10686396.00",
                latitude: "16,75452014",
                longitude: "-93,08108451",
                state: "Chiapas",
                province: "Tuxtla Gutiérrez",
                institution: "EDIFICACION",
                crestZone: ""
            },
            {
                id: 73,
                keyDepe: "03003_31367",
                valfisValue: "1453057.06",
                latitude: "16,653611",
                longitude: "-94,680833",
                state: "Oaxaca",
                province: "San Miguel Chimalapa",
                institution: "PRIMARIA",
                crestZone: ""
            },
            {
                id: 74,
                keyDepe: "03003_31367",
                valfisValue: "2418800.30",
                latitude: "15,877222",
                longitude: "-96,200278",
                state: "Oaxaca",
                province: "San Miguel del Puerto",
                institution: "PRIMARIA",
                crestZone: ""
            }
        ],
        earthquake: [
            {
                coordinatesCenter: "14.81,-94.15",
                depth: "16.1",
                magnitude: "6.5",
                epicenter: "140 km al SUROESTE de  PIJIJIAPAN, CHIS",
                dateTime: "2023-08-22",
                urlKmz: "http://www2.ssn.unam.mx:8080/recursos/imagenes/mapas-de-intensidades/2023/20230714092900A_1/20230714092900A_1.kmz",
                furthestStation: "16.281855,-92.136919",
                distance: 270.7197975672411
            }
        ]
    }

      return data

    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

}

export default new DashboardMockServices()

