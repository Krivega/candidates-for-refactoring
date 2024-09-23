class Calculator {
  public add(a: number, b: number): number {
    return a + b;
  }
  public subtract(a: number, b: number): number {
    return a - b;
  }
  public multiply(a: number, b: number): number {
    return a * b;
  }
  public divide(a: number, b: number): number {
    return a / b;
  }
}
//сделал бы сразу "стрелочно", так код менее перегружен

class Calculator {
  public add: TCalcFn = (a, b) => a + b;
  public subtract: TCalcFn = (a, b) => a - b;
  public multiply: TCalcFn = (a, b) => a * b;
  public divide: TCalcFn = (a, b) => a / b;
  }
}

