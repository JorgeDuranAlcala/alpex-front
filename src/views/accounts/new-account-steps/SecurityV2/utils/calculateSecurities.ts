import { CalculateSecurity } from "../../Security/utils/calculates-securities";
import { Information, Security } from "../store/securitySlice";

interface CalculateSecuritiesProps {
  securities: Security[];
  information: Information;
}

export const calculateSecurities = ({ securities, information }: CalculateSecuritiesProps) => {
  const tempSecurities: Security[] = []
  const tempCompaniesSelected: number[] = [];

  for (const security of securities) {

    // * Se inicializan las operaciones de cálculos para cada security
    const operationSecurity: CalculateSecurity = new CalculateSecurity()
      .setInformation(information)
      .setSecurity(security)

    // * Si un security cuenta con un Resinsurance Company seleccionado
    // * se agregará a la lista de companiesSelected con el fin de que
    // * en los próximos security no se muestre en el select de companies
    if (security?.idCReinsuranceCompany?.id) tempCompaniesSelected.push(security.idCReinsuranceCompany.id)

    // * Cálculos para los discounts que se añaden manualmente para cada formulario
    // * se calcula el porcentaje y el monto de cada discount
    const tempDiscountList = []
    if (security?.discounts) {
      security.totalAmountOfDiscounts = 0
      for (const discount of security?.discounts) {
        discount.percentage = Number(discount.percentage)
        discount.amount = operationSecurity.getDiscountAmount(Number(discount.percentage))
        security.totalAmountOfDiscounts += discount.amount
        tempDiscountList.push(discount)
      }
    }
    security.discounts = tempDiscountList

    // * + + + + + + + INIT - VALIDACIÓN INPUT TAXES + + + + + + +

    // * Si no hay valor en el formulario 1 - Information
    // * o si el security es GrossPremium
    if (information.taxes === 0 || security.isGross) {
      // * se habilitará el botón toggle de taxes y se mostrará
      // * habilitado o deshabilitado según el valor de taxes
      security.isShowToggleTaxes = true;
      security.isTaxesEnabled = information.taxes > 0;

      // * Si NO se ha modificado el input taxes por el usuario
      // * y si taxes NO contiene un valor o es igual a 0
      // * tomará la información del formulario 1 - Information
      if (!security.isTouchedTaxes && security.taxes === 0) {
        security.taxes = information.taxes === 0 ? 0 : information.taxesP;
      }

      // * Si la condición anterior no pasa, taxes tomará el valor
      // * que viene de base de datos.

    } else {

      // * Para el caso contrario donde el valor de taxes
      // * en el formulario 1 - Information es mayor a 0
      // * y el security es NetPremium
      // * entonces NO se mostrará el botón de toggle de taxes
      // * y se deshabilitará el input taxes

      if (!security.isTouchedTaxes && security.taxes === 0) {
        security.isShowToggleTaxes = false;
        security.isTaxesEnabled = false;

      }

      // * Pero si el valor de taxes viene de base de datos
      // * es mayor a 0 y no ha sido modificado por el usuario,
      // * entonces se mostrará el botón de toggle de taxes
      // * y se habilitará el input taxes
      else if (!security.isTouchedTaxes && security.taxes > 0) {
        security.isShowToggleTaxes = true;
        security.isTaxesEnabled = true;
      }
    }

    // *  + + + + + + + END - VALIDACIÓN INPUT TAXES  + + + + + + +

    // * + + + + + + + INIT - VALIDACIÓN INPUT FRONTING FEE + + + + + + +

    // * Si no hay valor en el formulario 1 - Information
    // * o si el security es GrossPremium
    if (information.frontingFee === 0 || security.isGross) {
      // * se habilitará el botón toggle de frontingFee y se mostrará
      // * habilitado o deshabilitado según el valor de frontingFee
      // * además se mostrarán los inputs de retrocedant
      security.isShowToggleFrontingFee = true;
      security.isFrontingFeeEnabled = information.frontingFee > 0;
      security.isShowRetrocedant = true;

      // * Si NO se ha modificado el input frontingFee por el usuario
      // * y si frontingFee NO contiene un valor o es igual a 0
      // * tomará la información del formulario 1 - Information
      if (!security.isTouchedFrontingFee && security.frontingFee === 0) {
        security.frontingFee = information.frontingFee === 0 ? 0 : information.frontingFeeP;
      }

      // * Si la condición anterior no pasa, frontingFee tomará el valor
      // * que viene de base de datos.

    } else {

      // * Para el caso contrario donde el valor de frontingFee
      // * en el formulario 1 - Information es mayor a 0
      // * y el security es NetPremium
      // * entonces NO se mostrará el botón de toggle de frontingFee
      // * y se deshabilitará el input frontingFee
      // * además NO se mostrarán los inputs de retrocedant

      if (!security.isTouchedFrontingFee && security.frontingFee === 0) {
        security.isShowToggleFrontingFee = false;
        security.isFrontingFeeEnabled = false;
        security.isShowRetrocedant = false;

      }

      // * Pero si el valor de frontingFee viene de base de datos
      // * es mayor a 0 y no ha sido modificado por el usuario,
      // * entonces se mostrará el botón de toggle de frontingFee
      // * y se habilitará el input frontingFee
      // * además se mostrarán los inputs de retrocedant
      else if (!security.isTouchedFrontingFee && security.frontingFee > 0) {
        security.isShowToggleFrontingFee = true;
        security.isFrontingFeeEnabled = true;
        security.isShowRetrocedant = true;
      }
    }

    // *  + + + + + + + END - VALIDACIÓN INPUT FRONTING FEE  + + + + + + +


    security.frontingFee = Number(security.frontingFee) || 0
    security.taxes = Number(security.taxes) || 0


    security.netPremiumAt100 = Number(security.netPremiumAt100) || 0

    operationSecurity.setSecurity(security)

    security.premiumPerShareAmount = operationSecurity.getPremierPerShare() || 0
    security.grossPremiumPerShare = operationSecurity.getGrossPremierPerShare() || 0
    security.brokerAgeAmount = operationSecurity.getBrokerAge() || 0
    security.dynamicCommissionAmount = operationSecurity.getDynamicComissionAmount() || 0

    security.frontingFeeAmount = operationSecurity.getFrontingFeeAmount(security.frontingFee) || 0

    security.taxesAmount = operationSecurity.getTaxesAmount(security.taxes) || 0

    security.shareAmount = operationSecurity.getShareAmount() || 0
    security.netReinsurancePremium = operationSecurity.getNetReinsurancePremium() || 0

    tempSecurities.push({
      ...security,
      difference: Number(security.difference) || 0,
      distributedNetPremium: Number(security.distributedNetPremium) || 0,
      dynamicCommission: Number(security.dynamicCommission) || 0,

      netPremiumAt100: Number(security.netPremiumAt100) || 0,
      receivedNetPremium: Number(security.receivedNetPremium) || 0,
      reinsuranceBrokerage: Number(security.reinsuranceBrokerage) || 0,
      share: Number(security.share) || 0
    })
  }

  return {
    companiesSelected: tempCompaniesSelected,
    securities: tempSecurities,
    allFormData: {
      formData: tempSecurities,
      ...CalculateSecurity.getData(
        tempSecurities)
    }

  }
}
