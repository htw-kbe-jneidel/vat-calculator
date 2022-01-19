import { VatCalculator } from "../src/VatCalculator";

const vc = new VatCalculator();

describe( "calc", () => {
  test( "success regelsteuersatz", () => {
    const price = 187;
    const category = "küchenzubehör";
    const expected = 35.53;

    const res = vc.calc(price, category);
    expect( res ).toBe( expected );
  } );

  test( "success ermäßigter satz", () => {
    const price = 187;
    const category = "zeitung";
    const expected = 13.09;

    const res = vc.calc(price, category);
    expect( res ).toBe( expected );
  } );

  test( "invalid category", () => {
    const price = 1;
    const category = "NOT_A_CATEGORY";
    const expected = new Error( "invalid product category" );

    expect(() => vc.calc(price, category) ).toThrow( expected );
  } );
} );
