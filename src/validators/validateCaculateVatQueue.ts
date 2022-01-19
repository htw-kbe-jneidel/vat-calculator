interface inputData {
  price?: number;
  category?: string;
}
interface outputResponse {
  error: boolean;
  errorMsg: string;
}

export function validateCaculateVatQueue( data: inputData|undefined ): outputResponse|null {
  if ( !data ) {
    return {
      error   : true,
      errorMsg: "invalid data object",
    };
  }
  if ( !data.price || isNaN( data.price ) ) {
    return {
      error   : true,
      errorMsg: "missing price",
    };
  }
  if ( !data.category || typeof data.category !== "string" ) {
    return {
      error   : true,
      errorMsg: "missing category",
    };
  }

  return null;
}
