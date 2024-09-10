/**
 * Что было плохо: Метод neverUsedMethod был объявлен, но не использовался.
 * Что стало лучше: Метод neverUsedMethod был удален.
 *
 * Что было плохо: Условие if (false) и вызов метода doSomethingThatNeverHappens не имели смысла и только загромождали код.
 * Что стало лучше: Эти фрагменты кода были удалены.
 *
 * Что было плохо: Использован некорректный синтаксис для блока catch.
 * Что стало лучше: Исправлен синтаксис на catch (e).
 *
 * Что было плохо: Использование e.printStackTrace() было некорректным.
 * Что стало лучше: Ошибки теперь выводятся с помощью console.error.
 */

class SomeClass {
  public someMethod() {
    try {
      this.doSomethingSafe();
    } catch (e) {
      console.error('An error occurred:', e);
    }
  }

  private doSomethingSafe() {
    console.log('Safe operation');
  }
}
