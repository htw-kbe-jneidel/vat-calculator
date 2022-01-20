import { VatCalculator } from "../entity/VatCalculator";
import { vatCalculatorValidator } from "../validator";
import { VatCalculatorInputDataType, VatCalculatorOutputDataType } from "../type";

const vatCalculatorInstance = new VatCalculator();

export function vatCalculatorController( data: VatCalculatorInputDataType ): VatCalculatorOutputDataType {
  const response = vatCalculatorValidator( data );
  if ( response != null )
    return response;

  try { // @ts-ignore
    var vat = vatCalculatorInstance.calc( data.price, data.category );
  } catch ( err: any ) {
    return {
      error   : true,
      errorMsg: err.message,
    };
  }

  return {
    vat,
    error: false,
  };
}
