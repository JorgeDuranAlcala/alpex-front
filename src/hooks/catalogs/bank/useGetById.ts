import { useEffect, useState } from 'react'
import BankService from 'src/services/catalogs/bank.service'
import { BankDto } from 'src/services/catalogs/dtos/bank.dto'

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
