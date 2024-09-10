/**
 * Что было плохо: Функции не имели типов для параметров и возвращаемых значений.
 * Что стало лучше: Добавлены типы для параметров и возвращаемых значений
 *
 * Что было плохо: Отсутствовала проверка на корректность discountPercentage.
 * Что стало лучше: Добавлена проверка для discountPercentage
 *
 * Что было плохо: Метод forEach использовался для подсчета суммы
 * Что стало лучше: Использован метод reduce, что делает код более чистым и эффективным.
 */

interface Item {
  price: number;
}

function calculateTotalPrice(items: Item[]): number {
  return items.reduce((totalPrice, item) => totalPrice + item.price, 0);
}

function applyDiscount(totalPrice: number, discountPercentage: number): number {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100.');
  }

  return totalPrice * (1 - discountPercentage / 100);
}
