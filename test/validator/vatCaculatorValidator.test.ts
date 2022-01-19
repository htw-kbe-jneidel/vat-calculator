import { vatCaculatorValidator } from "../../src/validator";

test( "success", () => {
  const data =  {
    price   : 10,
    category: "lebensmittel",
  };
  const expected = null;

  const res = vatCaculatorValidator( data );
  expect( res ).toBe( expected );
} );

test.each( [ undefined ] )
( "invalid data: %s", data => {
  const expected = {
    error   : true,
    errorMsg: "invalid data object",
  };

  const res = vatCaculatorValidator( data );
  expect( res ).toEqual( expected );
} );

test( "missing price", () => {
  const data = {
    category: "zeitung",
  };
  const expected = {
    error   : true,
    errorMsg: "missing price",
  };

  const res = vatCaculatorValidator( data );
  expect( res ).toEqual( expected );
} );
test.each( [ NaN, 0 ] )
( "missing price: %s", price => {
  const data = {
    price,
    category: "zeitung",
  };
  const expected = {
    error   : true,
    errorMsg: "missing price",
  };

  const res = vatCaculatorValidator( data );
  expect( res ).toEqual( expected );
} );

test( "missing category", () => {
  const data = {
    price: 10,
  };
  const expected = {
    error   : true,
    errorMsg: "missing category",
  };

  const res = vatCaculatorValidator( data );
  expect( res ).toEqual( expected );
} );
