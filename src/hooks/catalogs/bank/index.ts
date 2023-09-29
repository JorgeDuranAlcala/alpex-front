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


export const useGetAllBanks = () => {
    const getAllBanks = async () => {
        const banks = await BankService.getAll()
        return banks
    }

    return {
        getAllBanks
    }
}


export const useGetBankById = (id: number) => {
    const [bank, setBank] = useState<BankDto>()

    useEffect(() => {
        BankService.findById(id)
            .then(bank => {
                setBank(bank)
            })
            .catch(error => {
                throw new Error(error)
            })
    }, [id])

    return { bank }
}



export const useUpdateBank = () => {
    const updateBank = async (id: number, update: Partial<BankDto>) => {
        try {
            const resp = await BankService.update(id, update)
            return resp
        } catch (error) {
            throw error
        }
    }

    return { updateBank }
}

