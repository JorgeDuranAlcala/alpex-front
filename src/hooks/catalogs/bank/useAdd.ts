import BankService from 'src/services/catalogs/bank.service'
import { BankDto } from 'src/services/catalogs/dtos/bank.dto'

export const useAddBank = () => {
    const saveBank = async (data: Omit<BankDto, 'id'>) => {
        const bank = await BankService.add(data)
        return bank
    }

    return {
        saveBank
    }
}
