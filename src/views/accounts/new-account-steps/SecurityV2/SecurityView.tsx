
import { SecurityProps } from '@/services/accounts/dtos/security.dto'
import { LayoutSecurity } from './LayoutSecurity'
import { FormValidationsProvider } from './context/formValidations/FormValidationsProvider'
import { LayoutSecurityProvider } from './context/layoutSecurity/LayoutSecurityProvider'
import { LoadAndSaveSecuritiesProvider } from './context/loadAndSaveSecurities/LoadAndSaveSecuritiesProvider'
import { SecondViewProvider } from './context/secondView/SecondViewProvider'

const SecurityView = ({ onStepChange }: SecurityProps) => {

  console.log('SecurityView Vol 2');

  return (
    <LoadAndSaveSecuritiesProvider>
      <FormValidationsProvider>
        <LayoutSecurityProvider>
          <SecondViewProvider>

            <LayoutSecurity onStepChange={onStepChange} />
          </SecondViewProvider>


        </LayoutSecurityProvider>
      </FormValidationsProvider>
    </LoadAndSaveSecuritiesProvider>
  )
}

export default SecurityView
