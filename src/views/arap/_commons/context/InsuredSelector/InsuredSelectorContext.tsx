import { createContext } from 'react'
import { InsuredBy } from '../../interfaces/InsuredBy.type'
import { InsuredOption } from '../../interfaces/InsuredOption'

interface InsuredSelectorContextProps {
  isLoading: boolean
  insuredOptions: InsuredOption[]
  selectedInsuredId: number | null
  loadInsureds: (by: InsuredBy) => void
  handleOnChangeInsured: (id: number) => void
}

export const InsuredSelectorContext = createContext<InsuredSelectorContextProps>({} as InsuredSelectorContextProps)
