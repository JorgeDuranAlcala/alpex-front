import { InvestmentPerStateDto } from "./dtos/dashboard.dto"

/**
 *  service responsible of the dynamic data methods
 */
class DashboardServices {
  /**
   * Get the total investment
   * @returns
   */
  async getTotalInvestment(): Promise<string | number> {
    try {
      const data = "48.2"

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
        totalBuildings: '142,000',
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
  async getPriorityProperties() {
    try {
      const  data  = [
        {
          id: "06003_1",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        },
        {
          id: "06003_2",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        },
        {
          id: "06003_3",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        },
        {
          id: "06003_4",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        },
        {
          id: "06003_5",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        },
        {
          id: "06003_6",
          valfis: "000,000,000.00",
          cveEnt:"9",
          cveMun:"14",
          type:"Propiedad Federal",
          zonacresta: "10"
        }
      ]

      return data
    } catch (error) {
      const message = String(error)
      throw new Error(message)
    }
  }

}

export default new DashboardServices()

