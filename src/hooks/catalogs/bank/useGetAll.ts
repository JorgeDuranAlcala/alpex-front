import BankService from 'src/services/catalogs/bank.service'

export const useGetAllBanks = () => {
    const getAllBanks = async () => {
        const banks = await BankService.getAll()
        
        return banks
    }

    return {
        getAllBanks
    }
}
