
import { SecurityProps } from '@/services/accounts/dtos/security.dto'
import { LayoutSecurity } from './LayoutSecurity'
import { FormValidationsProvider } from './context/formValidations/FormValidationsProvider'
import { LayoutSecurityProvider } from './context/layoutSecurity/LayoutSecurityProvider'

const SecurityView = ({ onStepChange }: SecurityProps) => {


  return (
    <FormValidationsProvider>
      <LayoutSecurityProvider>

        <LayoutSecurity onStepChange={onStepChange} />

      </LayoutSecurityProvider>
    </FormValidationsProvider>
  )
}

export default SecurityView