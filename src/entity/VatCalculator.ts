export class VatCalculator {
  private validCategories = [ "lebensmittel", "zeitung", "küchenzubehör" ];
  private isValidCategory( category: string ): boolean {
    return this.validCategories.includes( category );
  }

  // ref: https://de.wikipedia.org/wiki/Umsatzsteuergesetz_(Deutschland)#Umsatzsteuers%C3%A4tze
  static umsatzsteuersatz = {
    regelsatz     : 19,
    ermäßigterSatz: 7,
  }

  private transformCategoryIntoPercentage( category: string ): number {
    switch ( category ) {
      case "lebensmittel":
      case "zeitung":
        return VatCalculator.umsatzsteuersatz.ermäßigterSatz;
      default:
        return VatCalculator.umsatzsteuersatz.regelsatz;
    }
  }

  calc( price: number, productCategory: string ) {
    if ( !this.isValidCategory( productCategory ) )
      throw new Error( "invalid product category" );

    const percentage = this.transformCategoryIntoPercentage( productCategory );
    return parseFloat( ( 100 * price / ( 100 + percentage ) ).toFixed( 2 ) );
  }
}
