import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetInvestmentPerState = () => {

  const getInvestmentPerState = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getInvestmentPerState()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getInvestmentPerState
  }
}
