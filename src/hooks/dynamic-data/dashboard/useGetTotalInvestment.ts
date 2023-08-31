import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetTotalInvestment = () => {


  const getTotalInvestment = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getTotalInvestment()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getTotalInvestment
  }
}
