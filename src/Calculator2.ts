// Отсутствует типизация
// Две разрозненные записи, возможно имеет смысл привести к единому виду,
// был класс в Calculator.ts, тут можно функции тип утилит
type TCalcFn = (a: number, b: number) => number;

const add: TCalcFn = (a, b) => a + b;
const multiply: TCalcFn = (a, b) => a * b;
