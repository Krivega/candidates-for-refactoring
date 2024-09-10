/**
 * Что было плохо: Высокоуровневый модуль зависел от конкретной реализации низкоуровневого модуля.
 * Что стало лучше: Теперь высокоуровневый модуль зависит от ILowLevelModule.
 *
 * Что было плохо: Класс HighLevelModule был жестко связан с конкретной реализацией LowLevelModule.
 * Что стало лучше: Зависимость теперь передается через конструктор, что значительно снижает связанность и улучшает расширяемость и тестируемость кода.
 */

interface ILowLevelModule {
  doSomething(): void;
}

class LowLevelModule implements ILowLevelModule {
  public doSomething(): void {
    console.log('LowLevelModule is doing something');
  }
}

class HighLevelModule {
  private lowLevelModule: ILowLevelModule;

  constructor(lowLevelModule: ILowLevelModule) {
    this.lowLevelModule = lowLevelModule;
  }

  public doSomethingElse(): void {
    this.lowLevelModule.doSomething();
  }
}

const lowLevelModule = new LowLevelModule();
const highLevelModule = new HighLevelModule(lowLevelModule);
highLevelModule.doSomethingElse();
