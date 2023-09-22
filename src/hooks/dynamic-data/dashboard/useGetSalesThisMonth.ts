import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetSalesThisMonth = () => {

  const getSalesThisMonth = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getSalesThisMonth()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getSalesThisMonth
  }
}
