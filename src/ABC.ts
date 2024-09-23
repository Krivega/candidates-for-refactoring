class A {
  // ...
  getB() {
    return new B();
  }
}

class B {
  // ...
  getC() {
    return new C();
  }
}

class C {
  // ...
  doSomething() {
    // Логика
  }
}

// Использование транзитивного обращения
const a = new A(); // Зачем объявлять эту переменную отдельно?
a.getB().getC().doSomething();
// Я бы сделал так:
new A().getB().getC().doSomething();
