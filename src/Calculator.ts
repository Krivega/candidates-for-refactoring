// Лаконично написано, в целом всё ОК
// Разве что можно сделать немного компактнее запись, но не обязательно
type TCalcFn = (a: number, b: number) => number;

class Calculator {
  public add: TCalcFn = (a, b) => a + b;
  public subtract: TCalcFn = (a, b) => a - b;
  public multiply: TCalcFn = (a, b) => a * b;
  public divide: TCalcFn = (a, b) => a / b;
}
