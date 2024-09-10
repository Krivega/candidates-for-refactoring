/**
 * Что было плохо: Один интерфейс Stack<T> пытался покрыть как ограниченные, так и неограниченные стеки, что приводило к конфликтам в реализации.
 * Что стало лучше: Введено два интерфейса: Stack<T> для неограниченного стека и LimitedStack<T> для стека с ограниченной емкостью.
 *
 * Что было плохо: Методы интерфейса Stack<T> не были полностью реализованы в классе UnlimitedStack<T>.
 * Что стало лучше: Реализованы методы push и pop для стека.
 *
 * Что было плохо: Метод percentFull был добавлен в неограниченный стек, где он не имеет смысла.
 * Что стало лучше: Метод теперь присутствует только в стеке с ограниченной емкостью, что соответствует его назначению.
 */

interface Stack<T> {
  pop(): T | null;
  push(item: T): void;
}

interface LimitedStack<T> extends Stack<T> {
  percentFull(): number;
}

class UnlimitedStack<T> implements Stack<T> {
  private items: T[] = [];

  public push(item: T): void {
    this.items.push(item);
  }

  public pop(): T | null {
    return this.items.length === 0 ? null : this.items.pop() || null;
  }
}
