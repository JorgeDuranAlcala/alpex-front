import BankService from 'src/services/catalogs/bank.service'
import { BankDto } from 'src/services/catalogs/dtos/bank.dto'

export const useUpdateBank = () => {
    const updateBank = async (update: Partial<BankDto>) => {
        try {
            const resp = await BankService.update(update)
            
            return resp
        } catch (error) {
            throw error
        }
    }

    return { updateBank }
}
