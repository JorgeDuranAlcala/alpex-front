import { useAppDispatch, } from '@/store';
import { memo, useMemo, useState } from 'react';
import { Security, deleteSecurityByIndex } from '../../store/securitySlice';
import { FormButtonDelete } from './FormButtonDelete';
import { FormSection } from './FormSection';
import { ModalFormOnDelete } from './ModalFormOnDelete';

interface OnDeleteForm {
  isOpenModal: boolean;
  index: number | null;
  allErrors: boolean[];
  updateAllErrors: (allErrors: boolean[]) => void;
}

type HandleOpenModalProps = Omit<OnDeleteForm, 'isOpenModal'>;


const OnDeleteFormInitialState: OnDeleteForm = {
  isOpenModal: false,
  index: null,
  allErrors: [],
  updateAllErrors: () => null
}

interface FormSectionListProps {
  securities: Security[];
}

export function FormSectionList({ securities }: FormSectionListProps) {

  const dispatch = useAppDispatch();

  const memoizedSecurities = useMemo(() => securities, [securities]);

  const [onDeleteForm, setOnDeleteForm] = useState<OnDeleteForm>(OnDeleteFormInitialState)

  const handleCloseModal = () => {
    setOnDeleteForm(OnDeleteFormInitialState)
  }

  const handleOpenModal = ({ index, allErrors, updateAllErrors }: HandleOpenModalProps) => {
    setOnDeleteForm({
      isOpenModal: true,
      index,
      allErrors,
      updateAllErrors
    });
  }

  const handleResolve = () => {
    if (!onDeleteForm.index) return;
    dispatch(deleteSecurityByIndex({ index: onDeleteForm.index }));
    const tempAllErrors = [...onDeleteForm.allErrors];
    tempAllErrors.splice(onDeleteForm.index, 1);
    onDeleteForm.updateAllErrors(tempAllErrors);
  }

  return (
    <>

      {memoizedSecurities.map((security, index) => {
        return (
          <FormSection
            key={`${index}-${security?.id}`}
            security={security}
            index={index}
          >
            {({ allErrors, updateAllErrors }) => (

              <FormButtonDelete
                onClick={() => handleOpenModal({ index, allErrors, updateAllErrors })}
              />
            )}
          </FormSection>
        )
      })}

      <ModalFormOnDelete
        isOpen={onDeleteForm.isOpenModal}
        onResolve={handleResolve}
        onReject={handleCloseModal}
      />
    </>
  )
}

export const MemoizedFormSectionList = memo(FormSectionList);
