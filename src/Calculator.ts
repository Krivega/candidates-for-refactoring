/**
 * Что было плохо: Класс Calculator имел слишком примитивные методы, которые не требовали создания объекта класса.
 * Что стало лучше: Переведя методы в статические, мы избежали необходимости создавать объекты, что сделало код более легковесным и эффективным для использования.
 */

class Calculator {
  public static add(a: number, b: number): number {
    return a + b;
  }

  public static subtract(a: number, b: number): number {
    return a - b;
  }

  public static multiply(a: number, b: number): number {
    return a * b;
  }

  public static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }

    return a / b;
  }
}
