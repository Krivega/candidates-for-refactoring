interface Stack<T> {
  // нет типа для пустого стэка
  pop(): T | null | undefined;
  // типы у аргументов не определяются при имплементации
  push(item: T): void;
  percentFull(): number;
}

// Класс не реализовывал интерфейс
class UnlimitedStack<T> implements Stack<T> {
  stack: T[] = [];

  pop() {
    return this.stack.pop();
  }

  // типы у аргументов не определяются при имплементации
  push(item: T) {
    this.stack.push(item);
  }

  percentFull(): number {
    return 0;
  }
}
