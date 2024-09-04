// Волшебные числа должны оставаться в константах или конфигах
const MAGIC_NUMBER = 3.14;

function calculateArea2(radius: number): number {
  // Квадрат заменён на метод из Math
  return MAGIC_NUMBER * Math.pow(radius, 2); // "волшебное число" 3.14
}
