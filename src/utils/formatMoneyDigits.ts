
export const formatMoneyDigits= (value: string) => {

  const [integerPart, decimalPart] = value.split('.');

  // Formatear la parte entera con comas cada tres dígitos
  const formattedIntegerPart = integerPart
    .split('')
    .reverse()
    .map((digit, index) => (index > 0 && index % 3 === 0 ? `${digit},` : digit))
    .reverse()
    .join('');

  // Unir la parte entera formateada con la parte decimal
  const formattedValue = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedValue;
};


