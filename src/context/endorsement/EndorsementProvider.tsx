import { ReactNode } from 'react'
import { EndorsementContext } from './EndorsementContext'

interface EndorsementProviderProps {
  children: ReactNode
}

export const EndorsementProvider = ({ children }: EndorsementProviderProps) => {
  return <EndorsementContext.Provider value={{}}>{children}</EndorsementContext.Provider>
}
