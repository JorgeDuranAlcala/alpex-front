import BankService from 'src/services/catalogs/bank.service'
import { BankDto } from 'src/services/catalogs/dtos/bank.dto'

export const useDeleteBank = () => {
    const deleteBank = async (id: number) => {
        try {
            const resp = await BankService.deleteById(id)
            return resp
        } catch (error) {
            throw error
        }
    }

    return { deleteBank }
}
