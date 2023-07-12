


import DialogCustomAlpex from '@/views/components/dialogs/DialogCustomAlpex';


interface ModalFormOnDeleteProps {
  isOpen: boolean;
  onResolve: () => void;
  onReject: () => void;
}


export const ModalFormOnDelete = ({ isOpen, onResolve, onReject }: ModalFormOnDeleteProps) => {
  return (
    <DialogCustomAlpex
      openDialog={isOpen}
      body={`This action will not delete the Reinsurer from Catalogs,
only for this section.`}
      title={'Remove Reinsurer from this account'}
      resolve={onResolve}
      reject={onReject}
    ></DialogCustomAlpex>
  )
}
