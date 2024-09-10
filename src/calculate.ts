/**
 * Что было плохо: Функция была жестко привязана к вычислению квадрата числа.
 * Что стало лучше: Функция теперь принимает дополнительный параметр operation, который позволяет выполнять любую математическую операцию.
 */

const calculate = (
  number: number,
  operation: (num: number) => number = (num) => Math.pow(num, 2),
): number => {
  return operation(number);
};

const square = (num: number) => Math.pow(num, 2);

calculate(5);
calculate(6, square);
