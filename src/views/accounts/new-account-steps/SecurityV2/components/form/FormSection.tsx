import { useContext, useEffect } from 'react';
import { FormValidationsContext } from '../../context/formValidations/FormValidationsContext';
import { Security } from '../../store/securitySlice';

interface FormSectionProps {
  security: Security;
  index: number;

}


export const FormSection = ({ security, index }: FormSectionProps) => {

  const {
    // isActiveErrors,
    // errorsSecurity,
    allErrors,
    validateForm,
    updateAllErrors
  } = useContext(FormValidationsContext)

  const handleDeleteItem = () => {
    const tempAllErrors = [...allErrors];
    tempAllErrors.splice(index, 1);
    updateAllErrors(tempAllErrors);
  }

  useEffect(() => {
    validateForm({ securityParam: security, index })
  }, [index, security, validateForm])

  return (
    <div>

    </div>
  )
}
