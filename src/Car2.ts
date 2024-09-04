// Set работает быстрее массива, а метод .includes() это перебор под капотом
class Car2 {
  public static readonly COLORS = new Set(['red', 'blue', 'green']);

  public static isColorAvailable(color: string): boolean {
    return this.COLORS.has(color);
  }
}
