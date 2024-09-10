/**
 * Что было плохо: Длинные цепочки вызовов через несколько классов ухудшают читаемость и понимание кода.
 * Что стало лучше: Теперь вызов метода инкапсулирован внутри класса A, логика стала проще, а код - более читаемым.
 *
 * Что было плохо: Cильная связность между классами.
 * Что стало лучше: Объекты передаются через конструкторы. Классы слабо связаны.
 */

class A {
  private b: B;

  constructor(b: B) {
    this.b = b;
  }

  doSomethingWithC() {
    const c = this.b.getC();
    c.doSomething();
  }
}

class B {
  private c: C;

  constructor(c: C) {
    this.c = c;
  }

  getC() {
    return this.c;
  }
}

class C {
  doSomething() {
    // Логика
  }
}

// Использование
const c = new C();
const b = new B(c);
const a = new A(b);

a.doSomethingWithC();
