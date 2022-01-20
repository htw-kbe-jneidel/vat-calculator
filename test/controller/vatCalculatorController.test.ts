import { vatCalculatorController } from "../../src/controller";

test( "success", () => {
  const inputData = {
    price   : 187,
    category: "küchenzubehör",
  };
  const expected = {
    vat  : 35.53,
    error: false,
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );

test( "missing input", () => {
  const inputData: any = undefined;
  const expected = {
    error   : true,
    errorMsg: "invalid data object",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );

test( "missing price", () => {
  const inputData = {
    category: "küchenzubehör",
  };
  const expected = {
    error   : true,
    errorMsg: "missing price",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );
test( "invalid price type", () => {
  const inputData = {
    price   : NaN,
    category: "küchenzubehör",
  };
  const expected = {
    error   : true,
    errorMsg: "missing price",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );

test( "missing category", () => {
  const inputData = {
    price: 187,
  };
  const expected = {
    error   : true,
    errorMsg: "missing category",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );
test( "invalid category type", () => {
  const inputData: any = {
    price   : 187,
    category: [],
  };
  const expected = {
    error   : true,
    errorMsg: "missing category",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );

test( "invalid category", () => {
  const inputData = {
    price   : 187,
    category: "huh?",
  };
  const expected = {
    error   : true,
    errorMsg: "invalid product category",
  };

  const res = vatCalculatorController( inputData );
  expect( res ).toEqual( expected );
} );
