# vat-calculator

## Queues

**vat-calculator**

Calculate the VAT for the given price and product category.

Input:
```
{
  price:number
  category:string
}
```

Reponse sucess:
```
{
  vat:number
  error:boolean
}
```

Reponse error:
```
{
  error:boolean
  errorMsg:string
}
```

## Tests

Run with:

```sh
npm test
```

100% coverage for the business logic:

```
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |     100 |      100 |     100 |     100 |
 controller                  |     100 |      100 |     100 |     100 |
  index.ts                   |     100 |      100 |     100 |     100 |
  vatCalculatorController.ts |     100 |      100 |     100 |     100 |
 entity                      |     100 |      100 |     100 |     100 |
  VatCalculator.ts           |     100 |      100 |     100 |     100 |
 validator                   |     100 |      100 |     100 |     100 |
  index.ts                   |     100 |      100 |     100 |     100 |
  vatCalculatorValidator.ts  |     100 |      100 |     100 |     100 |
-----------------------------|---------|----------|---------|---------|-------------------
```
