// [Глобально] В файле отсутствует типизация
// Модуль 1
function calculateTotalPrice<T extends { price: number }>(items: T[] = []): number {
  // Если отсутствие типизации это "так и задумывалось", тогда имеет смысл провести валидацию
  return items?.reduce((acc, item) => acc + (Number.isFinite(item?.price) ? item.price : 0), 0);
}

// Модуль 2
function applyDiscount(totalPrice?: number, discountPercentage?: number): number | undefined {
  // Если отсутствие типизации это "так и задумывалось",
  // тогда имеет смысл провести валидацию и приведение типов перед расчётом:
  if (!Number.isFinite(totalPrice) || !Number.isFinite(discountPercentage)) return;
  return Number(totalPrice) * (1 - Number(discountPercentage) / 100);
}
