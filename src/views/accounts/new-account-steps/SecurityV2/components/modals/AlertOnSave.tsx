import { useAppSelector } from '@/store';

import CustomAlert from '@/views/custom/alerts';

export const AlertOnSave = () => {

  const alertBadgeSecurity = useAppSelector(state => state.alertBadgeSecuritySlice);

  return (

    <CustomAlert {...alertBadgeSecurity} />
  )
}
