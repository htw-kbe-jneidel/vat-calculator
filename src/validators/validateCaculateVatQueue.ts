interface inputData {
  price?: number;
  category?: string;
}
interface outputResponse {
  error: boolean;
  errorMsg: string;
}

export function validateCaculateVatQueue( data: inputData ): outputResponse|null {
  if ( !data ) {
    return {
      error   : true,
      errorMsg: "invalid data object",
    };
  }
  if ( !data.price ) {
    return {
      error   : true,
      errorMsg: "missing price",
    };
  }
  if ( !data.category ) {
    return {
      error   : true,
      errorMsg: "missing category",
    };
  }

  return null;
}
