/**
 * Что было плохо: Использовались строки для определения доступных цветов.
 * Что стало лучше: Теперь используется перечисление enum, что гарантирует ограниченный набор допустимых значений.
 *
 * Что было плохо: Строковые значения были разбросаны по коду, что могло приводить к путанице.
 * Что стало лучше: Использование enum централизовало управление цветами.
 *
 * Что было плохо: Класс Car2 занимался не только управлением состоянием машины, но и проверкой доступных цветов.
 * Что стало лучше: Теперь управление цветами вынесено в отдельный класс ColorManager, что разгрузило класс Car2 и сделало его ответственным исключительно за состояние автомобиля.
 */

enum CarColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
}

class ColorManager {
  private static readonly AVAILABLE_COLORS = new Set(Object.values(CarColor));

  public static isColorAvailable(color: CarColor): boolean {
    return this.AVAILABLE_COLORS.has(color);
  }
}

class Car2 {
  private color: CarColor;

  constructor(color: CarColor) {
    if (ColorManager.isColorAvailable(color)) {
      this.color = color;
    } else {
      throw new Error('Color not available');
    }
  }

  public getColor(): CarColor {
    return this.color;
  }
}

const car = new Car2(CarColor.Green);
