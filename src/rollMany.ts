/**
 * Что было плохо: Функция просто выводила значение pins, что не соответствовало явно определённой задаче.
 * Что стало лучше: Изменённое назначение функции теперь соответствует определённой задаче.
 *
 * Что было плохо: Отсутствовали проверки для параметров n и pins.
 * Что стало лучше: Добавлены проверки для обеспечения корректности входных данных.
 *
 * Что было плохо: Функция не возвращала результат.
 * Что стало лучше: Функция возвращает массив результатов, что позволяет использовать данные в дальнейшем.
 */

const rollMany = (n: number, pins: number): number[] => {
  if (n <= 0 || pins <= 0) {
    throw new Error('Both n and pins must be positive integers.');
  }

  const results: number[] = [];

  for (let rollCount = 0; rollCount < n; rollCount++) {
    const result = Math.floor(Math.random() * pins) + 1;
    results.push(result);
  }

  return results;
};
