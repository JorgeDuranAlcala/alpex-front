
import { useContext, useEffect, useRef } from "react";
import { SecurityContext } from "../SecurityView";
import { CalculateSecurity } from "../utils/calculates-securities";

type TVariant = 'taxes' | 'frontingFee';

export interface IForField {
  isTouched: boolean;
  percent: number;
}

interface UseDataFirstTimeProps {
  formIndex: number;
  operationSecurity: CalculateSecurity
}

export const useDataFirstTime = ({ formIndex, operationSecurity }: UseDataFirstTimeProps) => {

  const { firstTimeSecurities, securities, calculateSecurities } = useContext(SecurityContext);

  const forTaxes = useRef<IForField>({
    isTouched: false,
    percent: 0,
  });

  const forFrontingFee = useRef<IForField>({
    isTouched: false,
    percent: 0,
  });

  const updateTouchedFor = (variant: TVariant) => {
    if (variant === 'taxes') {
      forTaxes.current.isTouched = true;
    } else if (variant === 'frontingFee') {
      forFrontingFee.current.isTouched = true;
    }
  }


  const backToFirstTimeFor = (variant: TVariant) => {

    if (!validateRecalculate(variant)) return;

    const tempSecurities = [...securities];

    // console.log('tempSecurities', tempSecurities);

    if (variant === 'taxes') {
      tempSecurities[formIndex].taxes = forTaxes.current.percent;
      tempSecurities[formIndex].taxesAmount = operationSecurity.getTaxesAmount(forTaxes.current.percent);
    }
    else if (variant === 'frontingFee') {
      tempSecurities[formIndex].frontingFee = forFrontingFee.current.percent;
    }

    calculateSecurities(tempSecurities);

  }

  const validateRecalculate = (variant: TVariant) => {
    if (variant === 'taxes') {
      if (forTaxes.current.percent === 0) return false;
      if (forTaxes.current.isTouched === true) return false;
      if (forTaxes.current.percent === firstTimeSecurities[formIndex].taxes) return false;

    } else if (variant === 'frontingFee') {
      if (forFrontingFee.current.percent === 0) return false;
      if (forFrontingFee.current.isTouched === true) return false;
      if (forFrontingFee.current.percent === firstTimeSecurities[formIndex].frontingFee) return false;
    }
    console.log('return true recalucluate', forTaxes.current.isTouched, variant, forTaxes.current.percent, forFrontingFee.current.percent)

    return true;
  }

  // * Si el valor de taxes o frontingFee es 0, puede que se haya modificado
  // * desde otro flujo, con esta función comprobamos si ya tenía un valor
  // * original desde la base de datos, si es así, lo volvemos a poner.
  const checkValues = ({
    taxes, frontingFee,
  }: { taxes: number, frontingFee: number }) => {
    if (securities.length === 0) return;
    if (formIndex > securities.length - 1) return;

    if (taxes === 0) {
      backToFirstTimeFor('taxes');
    }

    if (frontingFee === 0) {
      backToFirstTimeFor('frontingFee');
    }
  }



  useEffect(() => {

    if (forTaxes.current.percent > 0 && forFrontingFee.current.percent > 0) return;
    if (forTaxes.current.isTouched && forFrontingFee.current.isTouched) return;
    if (firstTimeSecurities.length === 0) return;
    if (formIndex > firstTimeSecurities.length - 1) return;

    forTaxes.current.percent = Number(firstTimeSecurities[formIndex].taxes);
    forFrontingFee.current.percent = Number(firstTimeSecurities[formIndex].frontingFee);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTimeSecurities]);



  return {
    forTaxes,
    forFrontingFee,
    updateTouchedFor,
    backToFirstTimeFor,
    checkValues,
  }




}

