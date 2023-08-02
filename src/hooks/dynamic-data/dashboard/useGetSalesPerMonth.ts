import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetSalesPerMonth = () => {

  const getSalesPerMonth = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getSalesThisMonth()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getSalesPerMonth
  }
}
