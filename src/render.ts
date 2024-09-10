/**
 * Что было плохо: Использование нестандартного StringBuffer усложняло код.
 * Что стало лучше: Заменён StringBuffer на стандартное использование строковых шаблонов и операций.
 *
 * Что было плохо: Отсутствовала проверка корректности значения size.
 * Что стало лучше: Добавлена проверка значения.
 */

const render = (size: number): string => {
  if (size < 0) {
    throw new Error('Invalid size. Must be a non-negative number.');
  }

  let html = '<hr';

  if (size > 0) {
    html += ` size="${size + 1}"`;
  }

  html += '>';

  return html;
};
