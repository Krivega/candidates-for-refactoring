enum ShapeType {
  Circle,
  Square,
}

// создать набор формул по типу фигуры
const formulas: Record<ShapeType, (ros: number) => number> = {
  [ShapeType.Circle]: (ros) => Math.PI * Math.pow(ros, 2),
  [ShapeType.Square]: (ros) => Math.pow(ros, 2),
};

function calculateArea(shape: ShapeType, radiusOrSide: number): number {
  // при вызове функции достается нужная формула, и ей передается аргумент
  // toFixed добавлен с учётом указанного Output
  return Number(formulas[shape](radiusOrSide).toFixed(2));
}

console.log(calculateArea(ShapeType.Circle, 5)); // Output: 78.54
