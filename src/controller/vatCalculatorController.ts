import { VatCalculator } from "../VatCalculator";
import { vatCalculatorValidator } from "../validator";
import { VatCalculatorInputDataType, VatCalculatorOutputDataType } from "../type";

const vatCalculatorInstance = new VatCalculator();

export function vatCalculatorController( data:VatCalculatorInputDataType ):VatCalculatorOutputDataType {
  const response = vatCalculatorValidator( data );
  if ( response != null )
    return response;

  const vat = vatCalculatorInstance.calc( data.price, data.category );

  return {
    vat,
    error: false,
  };
}
