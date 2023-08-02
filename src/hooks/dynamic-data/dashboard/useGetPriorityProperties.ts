import DashboardMockService from '@/services/dynamic-data/dashboard.mock-service'

export const useGetPriorityProperties = () => {

  const getPriorityProperties = async (): Promise<any> => {
    try {
      const res = await DashboardMockService.getPriorityProperties()

      return res

    } catch (error) {
      console.log('Get info error', error)

      throw new Error('error')
    }
  }

  return {
    getPriorityProperties
  }
}
