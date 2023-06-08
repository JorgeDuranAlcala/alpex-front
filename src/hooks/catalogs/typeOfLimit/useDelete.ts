import TypeOfLimitService from '@/services/catalogs/typeOfLimit.service'

export const useDeleteTypeOfLimit = () => {
  const deleteTypeOfLimit = async (id: number) => {
    const deleteTypeOfLimitById = await TypeOfLimitService.deleteById(id)

    return deleteTypeOfLimitById
  }

  return {
    deleteTypeOfLimit
  }
}
