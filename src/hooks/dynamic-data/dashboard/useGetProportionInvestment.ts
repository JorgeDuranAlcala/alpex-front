import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetProportionInvestment = () => {

  const getProportionInvestment = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getProportionInvestment()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getProportionInvestment
  }
}
