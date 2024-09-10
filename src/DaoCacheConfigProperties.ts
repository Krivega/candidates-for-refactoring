/**
 * Что было плохо: Имена полей alive и elements были неочевидными и не отражали их реальное назначение.
 * Что стало лучше: Теперь использованы более описательные имена cacheLifetimeDays и maxCacheElements.
 *
 * Что было плохо: Поля были публичными, что нарушало инкапсуляцию и позволяло изменять значения напрямую.
 * Что стало лучше: Поля сделаны приватными, а доступ к ним осуществляется через геттеры и сеттеры.
 *
 * Что было плохо: Не было никакой проверки значений при установке полей, что могло привести к некорректным значениям.
 * Что стало лучше: Добавлена валидация значений в сеттерах.
 */

class DaoCacheConfigProperties {
  private cacheLifetimeDays: number;
  private maxCacheElements: number;

  constructor(cacheLifetimeDays: number, maxCacheElements: number) {
    this.setCacheLifetimeDays(cacheLifetimeDays);
    this.setMaxCacheElements(maxCacheElements);
  }

  public getCacheLifetimeDays(): number {
    return this.cacheLifetimeDays;
  }

  public getMaxCacheElements(): number {
    return this.maxCacheElements;
  }

  public setCacheLifetimeDays(days: number): void {
    if (days < 0) {
      throw new Error('Cache lifetime cannot be negative');
    }
    this.cacheLifetimeDays = days;
  }

  public setMaxCacheElements(elements: number): void {
    if (elements <= 0) {
      throw new Error('Max cache elements must be greater than zero');
    }
    this.maxCacheElements = elements;
  }
}
