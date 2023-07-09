
import { SecurityProps } from '@/services/accounts/dtos/security.dto'
import { LayoutSecurity } from './LayoutSecurity'
import { LayoutSecurityProvider } from './context/layoutSecurity/LayoutSecurityProvider'

export const SecurityView = ({ onStepChange }: SecurityProps) => {


  return (
    <LayoutSecurityProvider>

      <LayoutSecurity onStepChange={onStepChange} />

    </LayoutSecurityProvider>
  )
}
