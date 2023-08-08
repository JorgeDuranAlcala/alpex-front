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
        data:[12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25]

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
      const data = {
        totalValfis: '100',
        name: 'Sales',
        data: [14165, 12859, 10375, 8567, 6880],
        categories: ['CX','NL','YU','EM','PU']
      }


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
      // const  data  = [
      //   {
      //     id: "06003_1",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   },
      //   {
      //     id: "06003_2",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   },
      //   {
      //     id: "06003_3",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   },
      //   {
      //     id: "06003_4",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   },
      //   {
      //     id: "06003_5",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   },
      //   {
      //     id: "06003_6",
      //     valfis: "000,000,000.00",
      //     nomEnt:"9",
      //     nomMun:"14",
      //     type:"Propiedad Federal",
      //     zonacresta: "10"
      //   }
      // ]
      const url = urlQ ? urlQ : queryBuilder(propertyData.filters, `${DATA_DASHBOARD_ROUTES.GET_PRIORITY_PROPERTIES}`)
      const { data } = await AppAlpexApiGateWay.get(`${url}page=${propertyData.info.page}&itemsPerPage=${propertyData.info.take}`)

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

}

export default new DashboardMockServices()

