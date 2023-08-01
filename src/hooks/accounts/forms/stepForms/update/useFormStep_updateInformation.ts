import type { DiscountDto } from '@/services/accounts/dtos/discount.dto';
import { useAppDispatch, useAppSelector } from '@/store';
import { stepForms_updateInformationBasicInfo, stepForms_updateInformationDiscounts, stepForms_updateInformationPlacementStructure, stepForms_updateStep } from '@/store/apps/accounts/stepFormsSlice';
import { useEffect, useRef } from 'react';
import type { BasicInfoInterface, PlacementStructure } from '../../../../../views/accounts/new-account-steps/Information/Information';

interface UseStepUpdateInformationProps {
  idAccount: number | null;
  basicInfo: BasicInfoInterface;
  placementStructure: PlacementStructure;
  discounts: DiscountDto[];

}

const useFormStep_updateInformation = ({ idAccount, basicInfo, placementStructure, discounts }: UseStepUpdateInformationProps) => {

  const dispatch = useAppDispatch();
  const { tabButtons } = useAppSelector(state => state.multiTabButtonsSlice);

  const basicInfoRef = useRef<BasicInfoInterface | null>(null);
  const placementStructureRef = useRef<PlacementStructure | null>(null);
  const discountsRef = useRef<DiscountDto[] | null>(null);
  const isStepUpdatedRef = useRef<boolean>(false);
  const canUpdateBasicInfoDataRef = useRef<boolean>(false);
  const canUpdatePlacementStructureDataRef = useRef<boolean>(false);


  const handleCanUpdateBasicInfoData = () => {
    canUpdateBasicInfoDataRef.current = true;
  }

  const handleCanUpdatePlacementStructureData = () => {
    canUpdatePlacementStructureDataRef.current = true;
  }


  // * Actualizar el step del account actual en Redux
  useEffect(() => {
    if (!idAccount) return;
    if (isStepUpdatedRef.current) return;

    const activeTab = tabButtons.find(tab => tab.isActive);
    if (!activeTab) return;

    if (Number(activeTab.text) !== idAccount) return;

    dispatch(stepForms_updateStep({ id: idAccount, data: 1 }))

    isStepUpdatedRef.current = true;


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idAccount])

  // * Actualiza la información de basicInfo del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(basicInfoRef.current) !== JSON.stringify(basicInfo)) {
      if (basicInfoRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdateBasicInfoDataRef.current) {
          //canUpdateBasicInfoDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateInformationBasicInfo({
          id: idAccount,
          data: basicInfo,
        }));
      }
    }

    return () => {
      basicInfoRef.current = basicInfo;
    };
  }, [dispatch, idAccount, basicInfo]);


  // * Actualiza la información de placementStructure del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(placementStructureRef.current) !== JSON.stringify(placementStructure)) {
      if (placementStructureRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        if (!canUpdatePlacementStructureDataRef.current) {
          //canUpdatePlacementStructureDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateInformationPlacementStructure({
          id: idAccount,
          data: placementStructure,
        }));
      }
    }

    return () => {
      placementStructureRef.current = placementStructure;
    };
  }, [dispatch, idAccount, placementStructure]);

  // * Actualiza la información de discounts del account actual en Redux
  // * cada vez que se modifique esta sección del formulario
  useEffect(() => {
    if (!idAccount) return;

    if (JSON.stringify(discountsRef.current) !== JSON.stringify(discounts)) {
      if (placementStructureRef.current) {

        // * Previene actualizar Redux cuando se monta el componente
        // ! para este caso se usa el mismo ref de placementStructure
        // ! porque discounts pertenece a la sección a la misma sección
        if (!canUpdatePlacementStructureDataRef.current) {
          //canUpdatePlacementStructureDataRef.current = true;

          return;
        };

        dispatch(stepForms_updateInformationDiscounts({
          id: idAccount,
          data: discounts,
        }));
      }
    }

    return () => {
      discountsRef.current = discounts;
    };
  }, [dispatch, idAccount, discounts]);


  return {
    handleCanUpdateBasicInfoData,
    handleCanUpdatePlacementStructureData,
  }
};

export default useFormStep_updateInformation;
